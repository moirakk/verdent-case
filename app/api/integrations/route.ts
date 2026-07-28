import { env } from "cloudflare:workers";
import { getChatGPTUser } from "@/app/chatgpt-auth";

type IntegrationPlatform =
  | "x"
  | "discord"
  | "linkedin"
  | "reddit"
  | "instagram"
  | "tiktok"
  | "feishu";

type ExternalPost = {
  id: string;
  title: string;
  text: string;
  url: string;
  publishedAt: string;
  mediaType: string;
  source: "official-api" | "public-rss";
};

type IntegrationDefinition = {
  platform: IntegrationPlatform;
  name: string;
  requiredSecrets: string[];
  optionalSecrets?: string[];
  docsUrl: string;
  billing: string;
};

type SnapshotRow = {
  platform: IntegrationPlatform;
  posts: string;
  status: string;
  message: string | null;
  synced_at: string | null;
};

const definitions: IntegrationDefinition[] = [
  {
    platform: "x",
    name: "X / Twitter",
    requiredSecrets: ["X_BEARER_TOKEN", "X_USER_ID"],
    docsUrl: "https://docs.x.com/x-api/users/get-posts",
    billing: "官方 API 按使用量计费",
  },
  {
    platform: "discord",
    name: "Discord",
    requiredSecrets: ["DISCORD_BOT_TOKEN", "DISCORD_CHANNEL_ID", "DISCORD_AUTHOR_ID"],
    docsUrl: "https://docs.discord.com/developers/resources/message#get-channel-messages",
    billing: "机器人 API 通常无额外调用费",
  },
  {
    platform: "linkedin",
    name: "LinkedIn",
    requiredSecrets: ["LINKEDIN_ACCESS_TOKEN", "LINKEDIN_ORGANIZATION_ID"],
    docsUrl: "https://learn.microsoft.com/en-us/linkedin/marketing/community-management/shares/posts-api",
    billing: "需要组织管理员授权和对应 API 权限",
  },
  {
    platform: "reddit",
    name: "Reddit",
    requiredSecrets: [],
    optionalSecrets: ["REDDIT_CLIENT_ID", "REDDIT_CLIENT_SECRET"],
    docsUrl: "https://www.reddit.com/wiki/api/",
    billing: "OAuth API 免费但有速率限制；无凭证时使用公开 RSS（数据中心 IP 可能被限流）",
  },
  {
    platform: "instagram",
    name: "Instagram",
    requiredSecrets: ["INSTAGRAM_ACCESS_TOKEN", "INSTAGRAM_USER_ID", "INSTAGRAM_GRAPH_VERSION"],
    docsUrl: "https://developers.facebook.com/docs/instagram-platform/instagram-api-with-instagram-login",
    billing: "需要 Meta 开发者应用及专业账号授权",
  },
  {
    platform: "tiktok",
    name: "TikTok",
    requiredSecrets: ["TIKTOK_ACCESS_TOKEN"],
    docsUrl: "https://developers.tiktok.com/doc/display-api-overview/",
    billing: "需要 TikTok 开发者应用和 video.list 权限",
  },
  {
    platform: "feishu",
    name: "飞书",
    requiredSecrets: ["FEISHU_APP_ID", "FEISHU_APP_SECRET"],
    docsUrl: "https://open.feishu.cn/document/home/develop-a-self-built-app",
    billing: "自建应用授权；文档权限按飞书开放平台配置",
  },
];

/** Minimum interval between syncs for most platforms (5 minutes). */
const SYNC_COOLDOWN_MS = 5 * 60 * 1_000;

/** Reddit uses a longer cooldown to reduce 429 risk when using RSS fallback (30 minutes). */
const REDDIT_COOLDOWN_MS = 30 * 60 * 1_000;

function secret(name: string) {
  const value = (env as unknown as Record<string, unknown>)[name];
  return typeof value === "string" ? value.trim() : "";
}

function configured(definition: IntegrationDefinition) {
  return definition.requiredSecrets.every((name) => Boolean(secret(name)));
}

function hasOptionalSecrets(definition: IntegrationDefinition) {
  return (definition.optionalSecrets ?? []).every((name) => Boolean(secret(name)));
}

function compactText(value: unknown, max = 4_000) {
  return String(value ?? "")
    .replace(/\u0000/g, "")
    .replace(/\r\n/g, "\n")
    .trim()
    .slice(0, max);
}

function decodeXml(value: string) {
  return value
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'");
}

function stripHtml(value: string) {
  return compactText(
    decodeXml(value)
      .replace(/<br\s*\/?>/gi, "\n")
      .replace(/<\/p>/gi, "\n")
      .replace(/<[^>]+>/g, " ")
      .replace(/[ \t]+/g, " ")
      .replace(/\n{3,}/g, "\n\n"),
  );
}

function xmlTag(entry: string, tag: string) {
  return decodeXml(entry.match(new RegExp(`<${tag}(?:\\s[^>]*)?>([\\s\\S]*?)<\\/${tag}>`, "i"))?.[1] ?? "").trim();
}

async function fetchJson<T>(url: string, init: RequestInit = {}) {
  const response = await fetch(url, {
    ...init,
    signal: AbortSignal.timeout(12_000),
  });
  if (!response.ok) throw new Error(`官方接口返回 ${response.status}`);
  return response.json() as Promise<T>;
}

async function fetchX(): Promise<ExternalPost[]> {
  const userId = secret("X_USER_ID");
  const result = await fetchJson<{
    data?: Array<{ id: string; text: string; created_at?: string; attachments?: unknown }>;
  }>(
    `https://api.x.com/2/users/${encodeURIComponent(userId)}/tweets?max_results=5&exclude=replies,retweets&tweet.fields=created_at,attachments`,
    { headers: { authorization: `Bearer ${secret("X_BEARER_TOKEN")}` } },
  );
  return (result.data ?? []).slice(0, 2).map((post) => ({
    id: post.id,
    title: compactText(post.text, 120),
    text: compactText(post.text),
    url: `https://x.com/verdent_ai/status/${post.id}`,
    publishedAt: post.created_at ?? "",
    mediaType: post.attachments ? "media" : "text",
    source: "official-api",
  }));
}

async function fetchDiscord(): Promise<ExternalPost[]> {
  const channelId = secret("DISCORD_CHANNEL_ID");
  const authorId = secret("DISCORD_AUTHOR_ID");
  const guildId = secret("DISCORD_GUILD_ID");

  if (!authorId) {
    throw new Error("DISCORD_AUTHOR_ID 未配置，无法确定官方作者身份，拒绝同步");
  }

  const messages = await fetchJson<Array<{
    id: string;
    content?: string;
    timestamp?: string;
    author?: { id?: string };
    attachments?: unknown[];
    embeds?: Array<{ title?: string; description?: string }>;
  }>>(`https://discord.com/api/v10/channels/${encodeURIComponent(channelId)}/messages?limit=20`, {
    headers: { authorization: `Bot ${secret("DISCORD_BOT_TOKEN")}` },
  });

  if (messages.length === 0) {
    throw new Error("频道返回空消息列表——请确认 Bot 具有 VIEW_CHANNEL 和 READ_MESSAGE_HISTORY 权限");
  }

  return messages
    .filter((message) => message.author?.id === authorId)
    .slice(0, 2)
    .map((message) => {
      const embedText = (message.embeds ?? []).map((embed) => [embed.title, embed.description].filter(Boolean).join("\n")).join("\n");
      const text = compactText([message.content, embedText].filter(Boolean).join("\n\n"));
      return {
        id: message.id,
        title: compactText(text, 120),
        text,
        url: guildId ? `https://discord.com/channels/${guildId}/${channelId}/${message.id}` : "",
        publishedAt: message.timestamp ?? "",
        mediaType: message.attachments?.length || message.embeds?.length ? "media" : "text",
        source: "official-api" as const,
      };
    });
}

async function fetchLinkedIn(): Promise<ExternalPost[]> {
  const organizationUrn = `urn:li:organization:${secret("LINKEDIN_ORGANIZATION_ID")}`;
  const version = secret("LINKEDIN_API_VERSION") || "202603";
  const result = await fetchJson<{
    elements?: Array<{
      id?: string;
      commentary?: string;
      publishedAt?: number;
      createdAt?: number;
      content?: unknown;
    }>;
  }>(
    `https://api.linkedin.com/rest/posts?q=author&author=${encodeURIComponent(organizationUrn)}&count=2&sortBy=LAST_MODIFIED`,
    {
      headers: {
        authorization: `Bearer ${secret("LINKEDIN_ACCESS_TOKEN")}`,
        "Linkedin-Version": version,
        "X-Restli-Protocol-Version": "2.0.0",
      },
    },
  );
  return (result.elements ?? []).slice(0, 2).map((post, index) => {
    const id = post.id ?? `linkedin-${index}`;
    const text = compactText(post.commentary);
    const timestamp = post.publishedAt ?? post.createdAt;
    return {
      id,
      title: compactText(text, 120),
      text,
      url: id.startsWith("urn:") ? `https://www.linkedin.com/feed/update/${encodeURIComponent(id)}` : "https://www.linkedin.com/company/verdent-ai/posts/",
      publishedAt: timestamp ? new Date(timestamp).toISOString() : "",
      mediaType: post.content ? "media" : "text",
      source: "official-api",
    };
  });
}

async function fetchRedditOAuth(): Promise<ExternalPost[]> {
  const clientId = secret("REDDIT_CLIENT_ID");
  const clientSecret = secret("REDDIT_CLIENT_SECRET");

  const tokenResponse = await fetch("https://www.reddit.com/api/v1/access_token", {
    method: "POST",
    headers: {
      authorization: `Basic ${btoa(`${clientId}:${clientSecret}`)}`,
      "content-type": "application/x-www-form-urlencoded",
      "user-agent": "VerdentGrowthOS/0.5 (+https://www.verdent.ai/)",
    },
    body: "grant_type=client_credentials",
    signal: AbortSignal.timeout(12_000),
  });
  if (!tokenResponse.ok) throw new Error(`Reddit OAuth 认证失败: ${tokenResponse.status}`);
  const tokenData = await tokenResponse.json() as { access_token?: string };
  if (!tokenData.access_token) throw new Error("Reddit OAuth 未返回有效 token");

  const response = await fetch("https://oauth.reddit.com/r/Verdent/new?limit=5&raw_json=1", {
    headers: {
      authorization: `Bearer ${tokenData.access_token}`,
      "user-agent": "VerdentGrowthOS/0.5 (+https://www.verdent.ai/)",
    },
    signal: AbortSignal.timeout(12_000),
  });
  if (!response.ok) throw new Error(`Reddit API 返回 ${response.status}`);
  const listing = await response.json() as {
    data?: {
      children?: Array<{
        data: {
          id: string;
          title: string;
          selftext?: string;
          author: string;
          permalink: string;
          created_utc: number;
          post_hint?: string;
          thumbnail?: string;
        };
      }>;
    };
  };

  return (listing.data?.children ?? [])
    .filter((child) => child.data.author.toLowerCase() === "verdent_ai")
    .slice(0, 2)
    .map((child) => {
      const post = child.data;
      return {
        id: `t3_${post.id}`,
        title: compactText(post.title, 200),
        text: compactText(post.selftext || post.title),
        url: `https://www.reddit.com${post.permalink}`,
        publishedAt: new Date(post.created_utc * 1_000).toISOString(),
        mediaType: post.post_hint === "image" || (post.thumbnail && post.thumbnail !== "self") ? "media" : "text",
        source: "official-api" as const,
      };
    });
}

async function fetchRedditRss(): Promise<ExternalPost[]> {
  const response = await fetch("https://www.reddit.com/r/Verdent/new.rss", {
    headers: {
      accept: "application/atom+xml, application/xml;q=0.9",
      "user-agent": "VerdentGrowthOS/0.5 (+https://www.verdent.ai/)",
    },
    signal: AbortSignal.timeout(12_000),
  });
  if (response.status === 429) {
    throw new Error("Reddit 限制了数据中心 IP 的 RSS 访问（429），建议配置 REDDIT_CLIENT_ID 和 REDDIT_CLIENT_SECRET 使用 OAuth API");
  }
  if (!response.ok) throw new Error(`公开 RSS 返回 ${response.status}`);
  const xml = await response.text();
  return (xml.match(/<entry>[\s\S]*?<\/entry>/gi) ?? [])
    .filter((entry) => /^\/u\/verdent_ai$/i.test(xmlTag(entry, "name")))
    .slice(0, 2)
    .map((entry, index) => {
      const title = compactText(xmlTag(entry, "title"), 200);
      const link = decodeXml(entry.match(/<link[^>]+href="([^"]+)"/i)?.[1] ?? "");
      const content = stripHtml(xmlTag(entry, "content") || xmlTag(entry, "summary"));
      return {
        id: compactText(xmlTag(entry, "id") || link || `reddit-${index}`, 300),
        title,
        text: content || title,
        url: link,
        publishedAt: xmlTag(entry, "updated") || xmlTag(entry, "published"),
        mediaType: /<img|preview\.redd\.it/i.test(entry) ? "media" : "text",
        source: "public-rss" as const,
      };
    });
}

async function fetchReddit(): Promise<ExternalPost[]> {
  if (secret("REDDIT_CLIENT_ID") && secret("REDDIT_CLIENT_SECRET")) {
    return fetchRedditOAuth();
  }
  return fetchRedditRss();
}

async function fetchInstagram(): Promise<ExternalPost[]> {
  const version = secret("INSTAGRAM_GRAPH_VERSION");
  const userId = secret("INSTAGRAM_USER_ID");
  const result = await fetchJson<{
    data?: Array<{
      id: string;
      caption?: string;
      timestamp?: string;
      permalink?: string;
      media_type?: string;
    }>;
  }>(
    `https://graph.instagram.com/${encodeURIComponent(version)}/${encodeURIComponent(userId)}/media?fields=id,caption,timestamp,permalink,media_type&limit=2`,
    { headers: { authorization: `Bearer ${secret("INSTAGRAM_ACCESS_TOKEN")}` } },
  );
  return (result.data ?? []).slice(0, 2).map((post) => ({
    id: post.id,
    title: compactText(post.caption, 120),
    text: compactText(post.caption),
    url: post.permalink ?? "",
    publishedAt: post.timestamp ?? "",
    mediaType: post.media_type?.toLowerCase() ?? "media",
    source: "official-api",
  }));
}

async function fetchTikTok(): Promise<ExternalPost[]> {
  const result = await fetchJson<{
    data?: {
      videos?: Array<{
        id: string;
        title?: string;
        video_description?: string;
        create_time?: number;
        share_url?: string;
      }>;
    };
  }>(
    "https://open.tiktokapis.com/v2/video/list/?fields=id,title,video_description,create_time,share_url",
    {
      method: "POST",
      headers: {
        authorization: `Bearer ${secret("TIKTOK_ACCESS_TOKEN")}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({ max_count: 2 }),
    },
  );
  return (result.data?.videos ?? []).slice(0, 2).map((video) => {
    const text = compactText(video.video_description || video.title);
    return {
      id: video.id,
      title: compactText(video.title || text, 120),
      text,
      url: video.share_url ?? "",
      publishedAt: video.create_time ? new Date(video.create_time * 1_000).toISOString() : "",
      mediaType: "video",
      source: "official-api",
    };
  });
}

/**
 * Verify Feishu self-built app credentials.
 * The returned tenant_access_token is checked for existence only and is
 * never persisted, returned in the API response, or written to D1.
 * Future: extend to read authorized documents via the Feishu Open API.
 */
async function verifyFeishu() {
  const result = await fetchJson<{ code?: number; msg?: string; tenant_access_token?: string }>(
    "https://open.feishu.cn/open-apis/auth/v3/tenant_access_token/internal",
    {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        app_id: secret("FEISHU_APP_ID"),
        app_secret: secret("FEISHU_APP_SECRET"),
      }),
    },
  );
  if (result.code !== 0 || !result.tenant_access_token) {
    throw new Error(result.msg || "飞书授权验证失败——请确认 App ID / App Secret 正确且应用已发布");
  }
  return [] as ExternalPost[];
}

async function refreshPosts(platform: IntegrationPlatform) {
  if (platform === "x") return fetchX();
  if (platform === "discord") return fetchDiscord();
  if (platform === "linkedin") return fetchLinkedIn();
  if (platform === "reddit") return fetchReddit();
  if (platform === "instagram") return fetchInstagram();
  if (platform === "tiktok") return fetchTikTok();
  return verifyFeishu();
}

async function ensureSchema() {
  await env.DB.prepare(`
    CREATE TABLE IF NOT EXISTS integration_snapshots (
      platform TEXT PRIMARY KEY NOT NULL,
      posts TEXT NOT NULL DEFAULT '[]',
      status TEXT NOT NULL DEFAULT 'needs_credentials',
      message TEXT,
      synced_at TEXT,
      updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    )
  `).run();
}

async function loadRows() {
  const result = await env.DB.prepare(`
    SELECT platform, posts, status, message, synced_at
    FROM integration_snapshots
  `).all<SnapshotRow>();
  return new Map((result.results ?? []).map((row) => [row.platform, row]));
}

async function saveSnapshot(platform: IntegrationPlatform, posts: ExternalPost[], status: string, message: string, syncedAt: string | null) {
  await env.DB.prepare(`
    INSERT INTO integration_snapshots (
      platform, posts, status, message, synced_at, updated_at
    ) VALUES (?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
    ON CONFLICT(platform) DO UPDATE SET
      posts = excluded.posts,
      status = excluded.status,
      message = excluded.message,
      synced_at = excluded.synced_at,
      updated_at = CURRENT_TIMESTAMP
  `).bind(platform, JSON.stringify(posts), status, message, syncedAt).run();
}

function parsePosts(row?: SnapshotRow) {
  try {
    const value = JSON.parse(row?.posts ?? "[]");
    return Array.isArray(value) ? value as ExternalPost[] : [];
  } catch {
    return [] as ExternalPost[];
  }
}

function isCooldownActive(platform: IntegrationPlatform, syncedAt: string | null | undefined): boolean {
  if (!syncedAt) return false;
  const cooldown = platform === "reddit" ? REDDIT_COOLDOWN_MS : SYNC_COOLDOWN_MS;
  const elapsed = Date.now() - new Date(syncedAt).getTime();
  return elapsed < cooldown;
}

async function responseFor(refresh: boolean) {
  await ensureSchema();
  const rows = await loadRows();

  if (refresh) {
    await Promise.all(definitions.map(async (definition) => {
      const isConfigured = configured(definition);
      const hasRedditOAuth = definition.platform === "reddit" && hasOptionalSecrets(definition);
      if (!isConfigured && !hasRedditOAuth) return;
      const previous = rows.get(definition.platform);

      if (isCooldownActive(definition.platform, previous?.synced_at)) {
        return;
      }

      try {
        const posts = await refreshPosts(definition.platform);
        const syncedAt = new Date().toISOString();
        const message = definition.platform === "feishu"
          ? "飞书应用凭证验证通过"
          : posts.length >= 2
            ? "最近两条内容已同步"
            : `仅同步到 ${posts.length} 条官方内容`;
        await saveSnapshot(definition.platform, posts, "connected", message, syncedAt);
      } catch (error) {
        await saveSnapshot(
          definition.platform,
          parsePosts(previous),
          "error",
          error instanceof Error ? error.message : "同步失败",
          previous?.synced_at ?? null,
        );
      }
    }));
  }

  const latestRows = refresh ? await loadRows() : rows;
  const connections = definitions.map((definition) => {
    const row = latestRows.get(definition.platform);
    const isConfigured = configured(definition);
    const hasRedditOAuth = definition.platform === "reddit" && hasOptionalSecrets(definition);
    const effectivelyConfigured = isConfigured || hasRedditOAuth;
    const status = effectivelyConfigured ? row?.status || "ready" : "needs_credentials";
    const defaultMessage = definition.platform === "reddit"
      ? hasRedditOAuth
        ? "Reddit OAuth 已就绪，点击同步读取最近两条官方帖子"
        : "公开 RSS 已就绪（数据中心 IP 可能被限流），建议配置 REDDIT_CLIENT_ID 和 REDDIT_CLIENT_SECRET"
      : `需要配置：${definition.requiredSecrets.join("、")}`;
    return {
      platform: definition.platform,
      name: definition.name,
      configured: effectivelyConfigured,
      connected: status === "connected",
      status,
      message: row?.message || defaultMessage,
      lastSyncedAt: row?.synced_at ?? null,
      latestPosts: parsePosts(row),
      requiredSecrets: definition.requiredSecrets,
      optionalSecrets: definition.optionalSecrets ?? [],
      docsUrl: definition.docsUrl,
      billing: definition.billing,
    };
  });

  return Response.json(
    { connections, refreshedAt: refresh ? new Date().toISOString() : null },
    { headers: { "cache-control": "no-store" } },
  );
}

export async function GET() {
  try {
    const user = await getChatGPTUser();
    if (!user) {
      return Response.json(
        { error: "未登录，请先通过 ChatGPT 认证" },
        { status: 401 },
      );
    }
    return await responseFor(false);
  } catch (error) {
    return Response.json(
      { error: error instanceof Error ? error.message : "无法读取外部连接状态" },
      { status: 500 },
    );
  }
}

export async function POST() {
  try {
    const user = await getChatGPTUser();
    if (!user) {
      return Response.json(
        { error: "未登录，请先通过 ChatGPT 认证" },
        { status: 401 },
      );
    }
    return await responseFor(true);
  } catch (error) {
    return Response.json(
      { error: error instanceof Error ? error.message : "无法同步外部渠道" },
      { status: 500 },
    );
  }
}
