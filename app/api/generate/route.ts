import { env } from "cloudflare:workers";
import { getChatGPTUser } from "@/app/chatgpt-auth";

/**
 * Server-side AI generation endpoint.
 *
 * Provider-agnostic: talks the OpenAI-compatible chat/completions protocol.
 * Base URL, model, and API key all come from server-side env (hosted Sites
 * secrets in production, `.env` locally). Nothing vendor-specific is
 * hardcoded, and the API key never leaves the server.
 *
 * This endpoint is additive: the existing "copy prompt to ChatGPT" flow in
 * the UI stays untouched and fully functional without any AI configuration.
 */

/** Upstream call budget. Generation of a full multi-platform pack can take 30-60s. */
const GENERATION_TIMEOUT_MS = 60_000;

/** Guard against runaway payloads; the assembled writer prompt is ~6-8k chars. */
const MAX_PROMPT_CHARS = 120_000;

const REQUIRED_ENV = ["AI_API_KEY", "AI_BASE_URL", "AI_MODEL"] as const;

type GenerateRequest = {
  prompt?: unknown;
  system?: unknown;
  model?: unknown;
  temperature?: unknown;
  maxTokens?: unknown;
};

function secret(name: string) {
  const value = (env as unknown as Record<string, unknown>)[name];
  return typeof value === "string" ? value.trim() : "";
}

function missingEnv() {
  return REQUIRED_ENV.filter((name) => !secret(name));
}

function notConfiguredResponse(missing: string[]) {
  return Response.json(
    {
      error: "AI_NOT_CONFIGURED",
      message:
        `一键生成尚未启用：缺少服务端配置 ${missing.join("、")}。` +
        "请在托管环境（Sites 设置 → 环境变量/Secrets）或本地 .env 中配置后重新部署。" +
        "在此之前可以继续使用「生成 AI Prompt」复制到 ChatGPT 手动执行。",
      missing,
    },
    { status: 503 },
  );
}

/**
 * GET reports whether one-click generation is available, without leaking
 * any secret values. The frontend can use this to decide whether to show
 * the one-click button alongside the copy-prompt flow.
 */
export async function GET() {
  try {
    const user = await getChatGPTUser();
    if (!user) {
      return Response.json(
        { error: "未登录，请先通过 ChatGPT 认证" },
        { status: 401 },
      );
    }
    const missing = missingEnv();
    return Response.json(
      {
        configured: missing.length === 0,
        missing,
        model: secret("AI_MODEL") || null,
      },
      { headers: { "cache-control": "no-store" } },
    );
  } catch (error) {
    return Response.json(
      { error: error instanceof Error ? error.message : "无法读取生成配置状态" },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const user = await getChatGPTUser();
    if (!user) {
      return Response.json(
        { error: "未登录，请先通过 ChatGPT 认证" },
        { status: 401 },
      );
    }

    const missing = missingEnv();
    if (missing.length > 0) {
      return notConfiguredResponse(missing);
    }

    let body: GenerateRequest;
    try {
      body = (await request.json()) as GenerateRequest;
    } catch {
      return Response.json(
        { error: "INVALID_REQUEST", message: "请求体必须是合法 JSON" },
        { status: 400 },
      );
    }

    const prompt = typeof body.prompt === "string" ? body.prompt.trim() : "";
    if (!prompt) {
      return Response.json(
        { error: "INVALID_REQUEST", message: "缺少 prompt 文本" },
        { status: 400 },
      );
    }
    if (prompt.length > MAX_PROMPT_CHARS) {
      return Response.json(
        { error: "INVALID_REQUEST", message: `prompt 超过 ${MAX_PROMPT_CHARS} 字符上限` },
        { status: 413 },
      );
    }

    const system = typeof body.system === "string" ? body.system.trim() : "";
    const model =
      (typeof body.model === "string" && body.model.trim()) || secret("AI_MODEL");
    const temperature =
      typeof body.temperature === "number" &&
      Number.isFinite(body.temperature) &&
      body.temperature >= 0 &&
      body.temperature <= 2
        ? body.temperature
        : undefined;
    const maxTokens =
      typeof body.maxTokens === "number" &&
      Number.isInteger(body.maxTokens) &&
      body.maxTokens > 0 &&
      body.maxTokens <= 32_000
        ? body.maxTokens
        : undefined;

    const baseUrl = secret("AI_BASE_URL").replace(/\/+$/, "");
    const messages = [
      ...(system ? [{ role: "system", content: system }] : []),
      { role: "user", content: prompt },
    ];

    let upstream: Response;
    try {
      upstream = await fetch(`${baseUrl}/chat/completions`, {
        method: "POST",
        headers: {
          authorization: `Bearer ${secret("AI_API_KEY")}`,
          "content-type": "application/json",
        },
        body: JSON.stringify({
          model,
          messages,
          stream: false,
          ...(temperature !== undefined ? { temperature } : {}),
          ...(maxTokens !== undefined ? { max_tokens: maxTokens } : {}),
        }),
        signal: AbortSignal.timeout(GENERATION_TIMEOUT_MS),
      });
    } catch (error) {
      if (error instanceof DOMException && error.name === "TimeoutError") {
        return Response.json(
          {
            error: "GENERATION_TIMEOUT",
            message: `模型端点在 ${GENERATION_TIMEOUT_MS / 1_000} 秒内未完成响应，请稍后重试或改用「生成 AI Prompt」手动执行`,
          },
          { status: 504 },
        );
      }
      return Response.json(
        {
          error: "UPSTREAM_UNREACHABLE",
          message: `无法连接模型端点：${error instanceof Error ? error.message : "网络错误"}`,
        },
        { status: 502 },
      );
    }

    if (!upstream.ok) {
      // Never forward upstream response bodies verbatim: they can echo the
      // request or include provider account details. Surface status only.
      const status =
        upstream.status === 401 || upstream.status === 403
          ? 502
          : upstream.status === 429
            ? 429
            : 502;
      const message =
        upstream.status === 401 || upstream.status === 403
          ? "模型端点拒绝了服务端凭证，请检查 AI_API_KEY 是否有效"
          : upstream.status === 429
            ? "模型端点限流，请稍后重试"
            : `模型端点返回 ${upstream.status}`;
      return Response.json(
        { error: "UPSTREAM_ERROR", message, upstreamStatus: upstream.status },
        { status },
      );
    }

    const result = (await upstream.json()) as {
      model?: string;
      choices?: Array<{ message?: { content?: string } }>;
      usage?: { prompt_tokens?: number; completion_tokens?: number; total_tokens?: number };
    };
    const content = result.choices?.[0]?.message?.content;
    if (typeof content !== "string" || !content.trim()) {
      return Response.json(
        { error: "UPSTREAM_ERROR", message: "模型端点返回了空内容" },
        { status: 502 },
      );
    }

    return Response.json(
      {
        content,
        model: result.model ?? model,
        usage: result.usage ?? null,
      },
      { headers: { "cache-control": "no-store" } },
    );
  } catch (error) {
    return Response.json(
      { error: error instanceof Error ? error.message : "生成失败" },
      { status: 500 },
    );
  }
}
