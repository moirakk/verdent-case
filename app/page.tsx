"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type Kind = "版本更新" | "新模型" | "日常内容";
type Priority = "P0" | "P1" | "P2";
type Channel = "x" | "discord" | "linkedin" | "reddit" | "instagram" | "tiktok";
type SocialPlatform = "website" | Channel;
type WriterMode = "Release Announcement" | "V-Thoughts" | "V-Tips" | "V-Playground";
type SocialAccount = { id: string; platform: SocialPlatform; platformName: string; accountName: string; url: string };
type Brief = {
  subject: string;
  vendor: string;
  launch: string;
  headline: string;
  features: string;
  scenarios: string;
  access: string;
  assets: string;
  confidential: string;
  evidence: string;
  partner: string;
  detectedSubjects: string[];
};
type PublishItem = { enabled: boolean; accountId: string; scheduledAt: string; published: boolean; url: string };
type Metric = { impressions: string; engagements: string; notes: string };
type Snapshot = { at: string; drafts: Record<Channel, string>; poster: string };
type Task = {
  id: string;
  title: string;
  kind: Kind;
  priority: Priority;
  stage: number;
  date: string;
  time: string;
  source: string;
  notes: string;
  writerMode: WriterMode;
  brief: Brief;
  drafts: Record<Channel, string>;
  poster: string;
  video: string;
  checks: Record<string, boolean>;
  publishing: Record<Channel, PublishItem>;
  metrics: Record<Channel, Metric>;
  retrospective: string;
  snapshots: Snapshot[];
  updatedAt: string;
};

const channels: Channel[] = ["x", "discord", "linkedin", "reddit", "instagram", "tiktok"];
const growthSkillPath = "skills/verdent-social-growth/SKILL.md";
const growthSkillVersion = "1.0";
const channelNames: Record<Channel, string> = {
  x: "X / Twitter",
  discord: "Discord",
  linkedin: "LinkedIn",
  reddit: "Reddit",
  instagram: "Instagram",
  tiktok: "TikTok",
};
const channelNotes: Record<Channel, string> = {
  x: "先说清更新是什么，再用最短篇幅突出用户价值。",
  discord: "直接、亲切，让社区用户一眼知道现在可以做什么。",
  linkedin: "解释业务价值、适用场景和工作流变化。",
  reddit: "信息优先，弱营销，标题与正文必须分开。",
  instagram: "视觉优先，用首行 Hook、短段落和具体故事推动收藏与分享。",
  tiktok: "一秒内给出 Hook，脚本与 Caption 分开，围绕观看完成率组织内容。",
};
const defaultAccounts: SocialAccount[] = [
  { id: "website", platform: "website", platformName: "Official Website", accountName: "verdent.ai", url: "https://www.verdent.ai/" },
  { id: "x-main", platform: "x", platformName: "X / Twitter", accountName: "@verdent_ai", url: "https://x.com/verdent_ai" },
  { id: "linkedin-main", platform: "linkedin", platformName: "LinkedIn", accountName: "Verdent AI", url: "https://www.linkedin.com/company/verdent-ai" },
  { id: "linkedin-business", platform: "linkedin", platformName: "LinkedIn", accountName: "Verdent For Business", url: "" },
  { id: "discord-main", platform: "discord", platformName: "Discord", accountName: "Verdent Community", url: "https://discord.gg/NGjXEZcbJq" },
  { id: "reddit-main", platform: "reddit", platformName: "Reddit", accountName: "VerdentAI", url: "https://www.reddit.com/r/Verdent/" },
  { id: "instagram-main", platform: "instagram", platformName: "Instagram", accountName: "@verdent__ai", url: "https://www.instagram.com/verdent__ai/" },
  { id: "tiktok-main", platform: "tiktok", platformName: "TikTok", accountName: "@verdent_ai", url: "https://www.tiktok.com/@verdent_ai" },
];
const defaultAccountByChannel: Record<Channel, string> = {
  x: "x-main",
  discord: "discord-main",
  linkedin: "linkedin-main",
  reddit: "reddit-main",
  instagram: "instagram-main",
  tiktok: "tiktok-main",
};
const stages = [
  { name: "收集", caption: "原始资料" },
  { name: "核实", caption: "事实与边界" },
  { name: "制作", caption: "文案与素材" },
  { name: "审核", caption: "风险与确认" },
  { name: "发布", caption: "排期与链接" },
  { name: "复盘", caption: "表现与经验" },
];
const checkLabels: Record<string, string> = {
  launch_confirmed: "正式上线时间与开放状态已确认",
  public_scope: "不可公开信息、Embargo 与公开边界已确认",
  claim_evidence: "模型能力、性能与成本表述有可靠依据",
  product_accuracy: "PM / 产品已核对功能信息",
  asset_ready: "海报 Brief、截图和 Logo 已交付设计",
  video_ready: "演示视频已完成，或确认本次不需要视频",
  writer_review: "Verdent Social Growth Skill 自检已通过",
  design_review: "海报 / 视频成品已确认",
  final_approval: "PM 已给出最终发布许可",
  release_live: "发布前再次确认功能已经正式上线",
  links_accounts: "官网链接、发布账号与平台格式已检查",
};
const checkGroups = {
  facts: ["launch_confirmed", "public_scope", "claim_evidence"],
  production: ["product_accuracy", "asset_ready", "video_ready"],
  review: ["writer_review", "design_review", "final_approval"],
  publish: ["release_live", "links_accounts"],
};
const bannedTerms = ["game-changer", "revolutionary", "unleash", "seamlessly", "excited to share", "thrilled", "delighted", "cutting-edge", "best-in-class", "leverage", "synergy"];
const privacyPatterns = [/we looked at user data/i, /our data shows/i, /we analyzed .*sessions/i, /user data indicates/i, /we tracked user behavior/i, /our users['’] data/i];
const availabilityPatterns = [/\bis live\b/i, /\bavailable now\b/i, /\bnow supports\b/i, /\btry .{0,60} now\b/i];

function unique(values: string[]) {
  return values.filter((value, index) => value && values.indexOf(value) === index);
}

function detectSubjects(source: string) {
  const patterns = [
    /Gemini\s+\d+(?:\.\d+)*(?:\s+(?:Flash(?:-Lite)?|Pro|Ultra|Nano|Code|series))?/gi,
    /GPT-?\s*\d+(?:\.\d+)*(?:\s+(?:Sol|Terra|Luna|series))?/gi,
    /Kimi\s+K?\d+(?:\.\d+)*(?:\s+Code)?/gi,
    /Claude\s+[A-Za-z]+\s+\d+(?:\.\d+)*/gi,
    /v?\d+\.\d+(?:\.\d+)?/gi,
  ];
  return unique(patterns.flatMap((pattern) => source.match(pattern) || []).map((item) => item.trim())).slice(0, 12);
}

function recognizeBrief(source: string, kind: Kind): Brief {
  const lines = source.split(/\n+/).map((line) => line.replace(/^[-*•\d.、\s]+/, "").trim()).filter(Boolean);
  const detectedSubjects = detectSubjects(source);
  const modelSubjects = detectedSubjects.filter((item) => /Gemini|GPT|Kimi|Claude/i.test(item));
  const subject = (kind === "新模型" ? modelSubjects.slice(0, 2) : detectedSubjects.slice(0, 1)).join(" & ");
  const launch = source.match(/(?:20\d{2}[-/.年]\d{1,2}[-/.月]\d{1,2}日?(?:\s+\d{1,2}:\d{2})?|周[一二三四五六日天](?:\s*\d{1,2}:\d{2})?|\d{1,2}:\d{2})/i)?.[0] || "";
  const vendor = /Google|Gemini/i.test(source) ? "Google" : /OpenAI|GPT/i.test(source) ? "OpenAI" : /Moonshot|Kimi/i.test(source) ? "Moonshot AI" : /Anthropic|Claude/i.test(source) ? "Anthropic" : "";
  const access = source.match(/(?:Limited Preview|Early Access|EA|Limited-time Free Access|限时免费|灰度|逐步开放|正式上线)/i)?.[0] || "";
  const featureLines = lines.filter((line) => /新增|支持|优化|改进|提升|introduc|support|improv|add|enable|better|faster|deliver|bring/i.test(line)).slice(0, 6);
  const scenarioLines = lines.filter((line) => /适合|场景|用于|工作流|use case|workflow|coding|automation|analysis|agentic|multi-agent/i.test(line)).slice(0, 5);
  const evidenceLines = lines.filter((line) => /\d+%|roughly|benchmark|compared|lower cost|fewer|performance|测试|对比|成本|token/i.test(line)).slice(0, 5);
  const secretLines = lines.filter((line) => /不能公开|暂不公开|保密|confidential|embargo|hide|隐藏/i.test(line));
  const assetBits = [
    /截图|screenshot/i.test(source) ? "产品截图" : "",
    /录屏|video|demo/i.test(source) ? "演示视频" : "",
    /logo|视觉素材/i.test(source) ? "Logo / 视觉素材" : "",
  ].filter(Boolean).join("、");
  return {
    subject,
    vendor,
    launch,
    headline: featureLines[0] || lines[0] || "",
    features: featureLines.join("\n"),
    scenarios: scenarioLines.join("\n"),
    access,
    assets: assetBits,
    confidential: secretLines.join("\n"),
    evidence: evidenceLines.join("\n"),
    partner: /联合\s*PR|joint\s*PR|co-marketing|partner/i.test(source) ? "存在联动线索，需确认具体安排" : "",
    detectedSubjects,
  };
}

function getMissing(brief: Brief, kind: Kind) {
  const missing: string[] = [];
  if (!brief.subject) missing.push(kind === "新模型" ? "模型名称" : kind === "版本更新" ? "版本号" : "内容主题");
  if (kind === "新模型" && !brief.vendor) missing.push("模型厂商");
  if (!brief.launch) missing.push("正式上线时间");
  if (!brief.features) missing.push("核心功能或能力");
  if (!brief.scenarios) missing.push("用户使用场景");
  if (!brief.access && kind !== "日常内容") missing.push("开放状态");
  if (!brief.assets) missing.push("截图、录屏或视觉素材");
  if (!brief.confidential) missing.push("不可公开信息确认");
  if (kind === "新模型" && !brief.evidence) missing.push("能力与性能依据");
  if (kind === "新模型" && !brief.partner) missing.push("厂商联合 PR 确认");
  return missing;
}

function emptyPublishing(kind: Kind): Record<Channel, PublishItem> {
  const defaultEnabled = new Set<Channel>(kind === "日常内容" ? ["x", "instagram", "tiktok"] : ["x", "discord", "linkedin", "reddit"]);
  return Object.fromEntries(channels.map((channel) => [channel, { enabled: defaultEnabled.has(channel), accountId: defaultAccountByChannel[channel], scheduledAt: "", published: false, url: "" }])) as Record<Channel, PublishItem>;
}
function emptyMetrics(): Record<Channel, Metric> {
  return Object.fromEntries(channels.map((channel) => [channel, { impressions: "", engagements: "", notes: "" }])) as Record<Channel, Metric>;
}
function emptyChecks() {
  return Object.fromEntries(Object.keys(checkLabels).map((key) => [key, false]));
}

function inferKind(source: string): Kind {
  const lower = source.toLowerCase();
  if (/model|模型|gpt|claude|kimi|gemini/.test(lower)) return "新模型";
  if (/changelog|version|版本|release|v\d/.test(lower)) return "版本更新";
  return "日常内容";
}

function newTask(source = "", chosenKind?: Kind): Task {
  const kind = chosenKind || inferKind(source);
  const brief = recognizeBrief(source, kind);
  return {
    id: crypto.randomUUID(),
    title: brief.subject ? `${brief.subject} ${kind === "日常内容" ? "内容" : "上线"}` : "未命名内容任务",
    kind,
    priority: kind === "日常内容" ? "P2" : "P1",
    stage: 0,
    date: "",
    time: kind === "日常内容" ? "" : "22:00",
    source,
    notes: "",
    writerMode: kind === "日常内容" ? "V-Tips" : "Release Announcement",
    brief,
    drafts: { x: "", discord: "", linkedin: "", reddit: "", instagram: "", tiktok: "" },
    poster: "",
    video: "",
    checks: emptyChecks(),
    publishing: emptyPublishing(kind),
    metrics: emptyMetrics(),
    retrospective: "",
    snapshots: [],
    updatedAt: new Date().toISOString(),
  };
}

function migrateTask(raw: Partial<Task> & { status?: string }): Task {
  const source = raw.source || "";
  const kind = raw.kind || inferKind(source);
  const base = newTask(source, kind);
  const oldStatusStage: Record<string, number> = { 收件箱: 0, 待补充: 1, 撰写中: 2, 待审核: 3, 已排期: 4, 已发布: 5 };
  return {
    ...base,
    ...raw,
    kind,
    stage: typeof raw.stage === "number" ? raw.stage : oldStatusStage[raw.status || ""] || 0,
    brief: { ...base.brief, ...(raw.brief || {}), detectedSubjects: raw.brief?.detectedSubjects || detectSubjects(source) },
    drafts: { ...base.drafts, ...(raw.drafts || {}) },
    checks: Object.fromEntries(Object.keys(checkLabels).map((key) => [key, raw.checks?.[key] || false])),
    publishing: Object.fromEntries(channels.map((channel) => [channel, { ...base.publishing[channel], ...(raw.publishing?.[channel] || {}) }])) as Record<Channel, PublishItem>,
    metrics: Object.fromEntries(channels.map((channel) => [channel, { ...base.metrics[channel], ...(raw.metrics?.[channel] || {}) }])) as Record<Channel, Metric>,
    snapshots: raw.snapshots || [],
    updatedAt: raw.updatedAt || new Date().toISOString(),
  } as Task;
}

function subjectFamilies(subjects: string[]) {
  return unique(subjects.map((subject) => subject.match(/Gemini|GPT|Kimi|Claude/i)?.[0] || "").filter(Boolean));
}

function qualityScan(task: Task) {
  const issues: { level: "高" | "中" | "低"; text: string }[] = [];
  const enabled = channels.filter((channel) => task.publishing[channel].enabled);
  enabled.forEach((channel) => {
    const copy = task.drafts[channel];
    if (!copy.trim()) issues.push({ level: "高", text: `${channelNames[channel]} 文案尚未完成` });
    if (copy.includes("—")) issues.push({ level: "中", text: `${channelNames[channel]} 含有禁用的英文长破折号` });
    const found = bannedTerms.find((term) => copy.toLowerCase().includes(term));
    if (found) issues.push({ level: "中", text: `${channelNames[channel]} 含禁用营销词 “${found}”` });
    if (privacyPatterns.some((pattern) => pattern.test(copy))) issues.push({ level: "高", text: `${channelNames[channel]} 暗示分析或追踪用户数据，必须重写` });
    if (!task.checks.launch_confirmed && availabilityPatterns.some((pattern) => pattern.test(copy))) issues.push({ level: "高", text: `${channelNames[channel]} 在上线状态未确认时使用了已上线表达` });
    if (/\[(?:CONFIRM|TBD)[^\]]*\]|待确认|TBC/i.test(copy)) issues.push({ level: "中", text: `${channelNames[channel]} 仍含待确认占位符` });
  });
  if (task.publishing.x.enabled && task.drafts.x.length > 280) issues.push({ level: "低", text: `X 文案为 ${task.drafts.x.length} 字符，请确认使用长文格式` });
  if (task.publishing.reddit.enabled && task.drafts.reddit && (!/Reddit Title:/i.test(task.drafts.reddit) || !/Reddit Body:/i.test(task.drafts.reddit))) issues.push({ level: "中", text: "Reddit 文案缺少独立的 Title 或 Body" });
  if (subjectFamilies(task.brief.detectedSubjects).length > 1) issues.push({ level: "高", text: "原始资料包含多个模型家族，需确认合并发布还是拆分任务" });
  return issues;
}

function stageRequirements(task: Task, stage: number) {
  const missing = getMissing(task.brief, task.kind);
  const enabled = channels.filter((channel) => task.publishing[channel].enabled);
  if (stage === 0) return task.source.trim().length >= 20 ? [] : ["粘贴完整的 Changelog、模型通知或内容资料"];
  if (stage === 1) return [...missing, ...checkGroups.facts.filter((key) => !task.checks[key]).map((key) => checkLabels[key])];
  if (stage === 2) {
    const draftNeeds = enabled.filter((channel) => !task.drafts[channel].trim()).map((channel) => `完成 ${channelNames[channel]} 文案`);
    const assetNeeds = task.poster.trim() ? [] : [task.kind === "日常内容" ? "完成视觉素材 Brief" : "完成海报 Brief"];
    return [...draftNeeds, ...assetNeeds, ...checkGroups.production.filter((key) => !task.checks[key]).map((key) => checkLabels[key])];
  }
  if (stage === 3) return [...qualityScan(task).filter((issue) => issue.level !== "低").map((issue) => issue.text), ...checkGroups.review.filter((key) => !task.checks[key]).map((key) => checkLabels[key])];
  if (stage === 4) {
    const scheduleNeeds = enabled.filter((channel) => !task.publishing[channel].scheduledAt).map((channel) => `${channelNames[channel]} 尚未排期`);
    const publishNeeds = enabled.filter((channel) => !task.publishing[channel].published).map((channel) => `${channelNames[channel]} 尚未标记已发布`);
    return [...scheduleNeeds, ...publishNeeds, ...checkGroups.publish.filter((key) => !task.checks[key]).map((key) => checkLabels[key])];
  }
  return [];
}

function download(blob: Blob, name: string) {
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = name;
  anchor.click();
  URL.revokeObjectURL(url);
}
function safeName(value: string) {
  return value.replace(/[\\/:*?"<>|]/g, "-") || "verdent-task";
}

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [accounts, setAccounts] = useState<SocialAccount[]>(defaultAccounts);
  const [loaded, setLoaded] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [activeStage, setActiveStage] = useState(0);
  const [platform, setPlatform] = useState<Channel>("x");
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<"全部" | "进行中" | "有阻塞" | "待发布" | "已发布">("全部");
  const [newOpen, setNewOpen] = useState(false);
  const [accountsOpen, setAccountsOpen] = useState(false);
  const [sopOpen, setSopOpen] = useState(false);
  const [newSource, setNewSource] = useState("");
  const [newKind, setNewKind] = useState<Kind | "自动识别">("自动识别");
  const [toast, setToast] = useState("");
  const importRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      const saved = localStorage.getItem("verdent-local-workspace");
      if (saved) {
        try {
          const data = (JSON.parse(saved) as Task[]).map(migrateTask);
          setTasks(data);
        } catch { /* keep an empty workspace if an old backup is invalid */ }
      }
      const savedAccounts = localStorage.getItem("verdent-social-accounts");
      if (savedAccounts) {
        try {
          const parsed = JSON.parse(savedAccounts) as SocialAccount[];
          if (Array.isArray(parsed)) setAccounts(defaultAccounts.map((account) => ({ ...account, ...(parsed.find((item) => item.id === account.id) || {}) })));
        } catch { /* retain verified defaults */ }
      }
      setLoaded(true);
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);
  useEffect(() => {
    if (loaded) {
      localStorage.setItem("verdent-local-workspace", JSON.stringify(tasks));
      localStorage.setItem("verdent-social-accounts", JSON.stringify(accounts));
    }
  }, [tasks, accounts, loaded]);

  const current = tasks.find((task) => task.id === selectedId) || null;
  const currentNeeds = current ? stageRequirements(current, current.stage) : [];
  const issues = current ? qualityScan(current) : [];
  const accountById = (id: string) => accounts.find((account) => account.id === id);
  const filteredTasks = useMemo(() => tasks.filter((task) => {
    const matchesQuery = `${task.title}${task.source}${task.brief.subject}`.toLowerCase().includes(query.toLowerCase());
    const blockers = stageRequirements(task, task.stage).length;
    const matchesFilter = filter === "全部" || (filter === "进行中" && task.stage < 4) || (filter === "有阻塞" && blockers > 0) || (filter === "待发布" && task.stage === 4) || (filter === "已发布" && task.stage === 5);
    return matchesQuery && matchesFilter;
  }), [tasks, query, filter]);

  const say = (message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(""), 2600);
  };
  const update = (patch: Partial<Task>) => {
    if (!current) return;
    setTasks((all) => all.map((task) => task.id === current.id ? { ...task, ...patch, updatedAt: new Date().toISOString() } : task));
  };
  const updateBrief = (key: keyof Brief, value: string | string[]) => {
    if (!current) return;
    update({ brief: { ...current.brief, [key]: value } });
  };
  const updateCheck = (key: string, value: boolean) => {
    if (!current) return;
    update({ checks: { ...current.checks, [key]: value } });
  };

  function selectTask(task: Task) {
    setSelectedId(task.id);
    setActiveStage(task.stage);
  }
  function createTask() {
    const task = newTask(newSource.trim(), newKind === "自动识别" ? undefined : newKind);
    setTasks((all) => [task, ...all]);
    setSelectedId(task.id);
    setActiveStage(0);
    setNewSource("");
    setNewKind("自动识别");
    setNewOpen(false);
    say("任务已建立，原始资料已自动保留");
  }
  function reRecognize(move = false) {
    if (!current) return;
    update({ brief: recognizeBrief(current.source, current.kind) });
    if (move) setActiveStage(1);
    say("Brief 已重新识别，请人工核对");
  }
  function advance() {
    if (!current) return;
    const needs = stageRequirements(current, current.stage);
    if (needs.length) {
      setActiveStage(current.stage);
      say(`还差 ${needs.length} 项，暂不能进入下一阶段`);
      return;
    }
    const next = Math.min(current.stage + 1, 5);
    update({ stage: next });
    setActiveStage(next);
    say(`已进入「${stages[next].name}」阶段`);
  }
  function removeTask() {
    if (!current) return;
    const rest = tasks.filter((task) => task.id !== current.id);
    setTasks(rest);
    setSelectedId(null);
    say("任务已删除");
  }
  function saveSnapshot() {
    if (!current) return;
    const snapshot: Snapshot = { at: new Date().toISOString(), drafts: { ...current.drafts }, poster: current.poster };
    update({ snapshots: [snapshot, ...current.snapshots] });
    say("内容快照已保存");
  }
  function restoreSnapshot(snapshot: Snapshot) {
    if (!current) return;
    update({ drafts: { ...current.drafts, ...snapshot.drafts }, poster: snapshot.poster });
    say("已恢复该版本的文案与海报 Brief");
  }
  function exportBackup() {
    download(new Blob([JSON.stringify({ version: 2, tasks, accounts }, null, 2)], { type: "application/json" }), `verdent-growth-os-${new Date().toISOString().slice(0, 10)}.json`);
  }
  function exportMarkdown() {
    if (!current) return;
    const enabled = channels.filter((channel) => current.publishing[channel].enabled);
    const publishLines = enabled.map((channel) => {
      const item = current.publishing[channel];
      const account = accountById(item.accountId);
      return `- ${channelNames[channel]} · ${account?.accountName || "账号待确认"}: ${item.url || "待发布"}`;
    }).join("\n");
    const draftSections = enabled.map((channel) => `### ${channelNames[channel]}\n${current.drafts[channel]}`).join("\n\n");
    const md = `# ${current.title}\n\n- 类型：${current.kind}\n- 当前阶段：${stages[current.stage].name}\n- 目标发布日期：${current.date || "待确认"} ${current.time}\n\n## 原始资料\n\n${current.source}\n\n## Brief\n\n- 主体：${current.brief.subject}\n- 厂商：${current.brief.vendor}\n- 上线时间：${current.brief.launch}\n- 开放状态：${current.brief.access}\n- 核心传播点：${current.brief.headline}\n\n### 功能 / 能力\n${current.brief.features}\n\n### 使用场景\n${current.brief.scenarios}\n\n## 平台文案\n\n${draftSections}\n\n## 海报 / 视觉 Brief\n${current.poster}\n\n## 发布链接\n${publishLines}\n\n## 复盘\n${current.retrospective}`;
    download(new Blob([md], { type: "text/markdown" }), `${safeName(current.title)}.md`);
  }
  async function copyWriterPrompt() {
    if (!current) return;
    const brief = current.brief;
    const missing = getMissing(brief, current.kind);
    const enabled = channels.filter((channel) => current.publishing[channel].enabled);
    const destinations = enabled.map((channel) => {
      const account = accountById(current.publishing[channel].accountId);
      return `- ${channelNames[channel]}：${account?.accountName || "账号待确认"}${account?.url ? ` (${account.url})` : "（主页链接待补充）"}`;
    }).join("\n");
    const text = `请使用我们自己的 Verdent Social Growth Skill 处理此任务。\nSkill 文件：${growthSkillPath}\nSkill 版本：${growthSkillVersion}\n\n内容模式：${current.writerMode}\n任务：${current.title}\n类型：${current.kind}\n目标发布日期：${current.date || "待确认"} ${current.time || ""}\n内部备注：${current.notes || "无"}\n\n【事实门禁状态】\n上线时间与开放状态：${current.checks.launch_confirmed ? "CONFIRMED" : "PENDING"}\n公开边界：${current.checks.public_scope ? "CONFIRMED" : "PENDING"}\n能力与性能依据：${current.checks.claim_evidence ? "CONFIRMED" : "PENDING"}\n最终发布许可：${current.checks.final_approval ? "APPROVED" : "PENDING"}\n\n【已核对 Brief】\n主体：${brief.subject || "NOT PROVIDED"}\n模型厂商：${brief.vendor || "NOT PROVIDED"}\n上线时间：${brief.launch || "NOT PROVIDED"}\n核心传播点：${brief.headline || "NOT PROVIDED"}\n功能/能力：\n${brief.features || "NOT PROVIDED"}\n使用场景：\n${brief.scenarios || "NOT PROVIDED"}\n开放状态：${brief.access || "NOT PROVIDED"}\n事实依据：\n${brief.evidence || "NOT PROVIDED"}\n素材：${brief.assets || "NOT PROVIDED"}\n厂商联动：${brief.partner || "NOT PROVIDED"}\n不可公开信息：${brief.confidential || "NOT PROVIDED"}\n缺失信息：${missing.join("、") || "无"}\n\n【本次启用平台与发布账号】\n${destinations}\n\n【原始资料】\n${current.source || "暂无"}\n\n执行要求：\n1. 按 Skill 的顺序先输出 Release readiness、Publish blockers、Confirm before publishing 和 Confirmed basis。\n2. 对外文案全部使用英文；内部风险说明可以使用中文。\n3. 仅为本次启用的平台生成文案：${enabled.map((channel) => channelNames[channel]).join("、")}。每个平台从同一事实底稿重写，不机械裁剪。\n4. 同时生成海报或视觉 Brief；只有存在视频素材时才生成视频 Brief。\n5. 若上线状态、公开边界或关键依据未确认，整包标记 DRAFT — DO NOT PUBLISH，禁止使用 available now、is live、now supports 等发布态表达。\n6. 执行 Skill 的事实、隐私、夸大表述、英文长破折号、占位符、平台格式与 CTA 自检。\n7. CTA 按平台分配，可使用 https://www.verdent.ai/，不要在每个平台机械重复。`;
    await navigator.clipboard.writeText(text);
    say("已复制 Verdent Skill 任务，可直接粘贴到 Codex");
  }
  function importFile(file: File) {
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const raw = JSON.parse(String(reader.result));
        const taskData = Array.isArray(raw) ? raw : raw.tasks;
        if (!Array.isArray(taskData)) throw new Error();
        const data = taskData.map(migrateTask);
        setTasks(data);
        if (!Array.isArray(raw) && Array.isArray(raw.accounts)) setAccounts(defaultAccounts.map((account) => ({ ...account, ...(raw.accounts.find((item: SocialAccount) => item.id === account.id) || {}) })));
        setSelectedId(null);
        say("备份已恢复");
      } catch { say("无法读取该备份文件"); }
    };
    reader.readAsText(file);
  }

  const dashboard = <section className="dashboard">
    <div className="dashboard-head"><div><span className="eyebrow">VERDENT GROWTH OPERATIONS</span><h1>今天该推进什么</h1><p>以事实确认和发布门禁为核心的单人社媒工作台。</p></div><div className="dashboard-actions"><button className="button" onClick={() => setSopOpen(true)}>查看 Skill SOP</button><button className="button primary" onClick={() => setNewOpen(true)}>＋ 新建内容任务</button></div></div>
    <div className="stat-grid">
      <article><span>进行中</span><strong>{tasks.filter((task) => task.stage < 4).length}</strong><small>正在核实或制作</small></article>
      <article><span>有阻塞</span><strong>{tasks.filter((task) => stageRequirements(task, task.stage).length > 0 && task.stage < 5).length}</strong><small>需要补信息或确认</small></article>
      <article><span>待发布</span><strong>{tasks.filter((task) => task.stage === 4).length}</strong><small>等待排期或上线</small></article>
      <article><span>已发布</span><strong>{tasks.filter((task) => task.stage === 5).length}</strong><small>进入表现复盘</small></article>
    </div>
    <section className="account-strip"><header><div><h2>官方渠道账号</h2><p>发布前从统一账号资产中选择目标，不再靠手动记忆。</p></div><button className="button" onClick={() => setAccountsOpen(true)}>管理账号</button></header><div>{accounts.map((account) => account.url ? <a href={account.url} target="_blank" rel="noreferrer" key={account.id}><i>{account.platformName.slice(0, 1)}</i><span><small>{account.platformName}</small><b>{account.accountName}</b></span><em>↗</em></a> : <button key={account.id} onClick={() => setAccountsOpen(true)} className="missing-account"><i>{account.platformName.slice(0, 1)}</i><span><small>{account.platformName}</small><b>{account.accountName}</b></span><em>缺链接</em></button>)}</div></section>
    <div className="dashboard-grid">
      <section className="panel queue-panel"><header><div><h2>优先工作队列</h2><p>优先级、发布日期和当前阻塞共同排序。</p></div><span>{tasks.length} 个任务</span></header>
        <div className="queue-list">{[...tasks].sort((a, b) => a.priority.localeCompare(b.priority) || (a.date || "9999").localeCompare(b.date || "9999")).slice(0, 8).map((task) => {
          const needs = stageRequirements(task, task.stage);
          return <button key={task.id} onClick={() => selectTask(task)}><span className={`priority ${task.priority}`}>{task.priority}</span><div><b>{task.title}</b><small>{task.kind} · {stages[task.stage].name}</small></div><time>{task.date || "未排期"}</time><em className={needs.length ? "blocked" : "ready"}>{needs.length ? `${needs.length} 项阻塞` : "可推进"}</em></button>;
        })}{!tasks.length && <div className="empty"><b>还没有任务</b><p>把 PM 的 Changelog 或模型通知完整粘贴进来即可开始。</p></div>}</div>
      </section>
      <section className="panel rules-panel"><header><div><h2>稳定工作节奏</h2><p>版本更新默认周二 22:00 发布。</p></div><button className="text-action" onClick={() => setSopOpen(true)}>Skill v{growthSkillVersion} ↗</button></header>
        <ol><li><b>周五封板</b><span>获取 Changelog，确认版本范围和演示素材。</span></li><li><b>周五至周一</b><span>核实事实、生成多平台文案、提交设计与视频。</span></li><li><b>周二上线前</b><span>PM 最终确认产品已上线，再执行发布。</span></li><li><b>发布后 24–72h</b><span>记录链接和表现，把有效表达沉淀为经验。</span></li></ol>
      </section>
    </div>
  </section>;

  return <main className="app-shell">
    <aside className="sidebar">
      <header className="brand"><span>V</span><div><b>Verdent</b><small>Growth OS · Local</small></div><button onClick={() => setAccountsOpen(true)}>账号中心</button></header>
      <button className="button primary create" onClick={() => setNewOpen(true)}>＋ 新建任务</button>
      <button className={`home-link ${selectedId === null ? "active" : ""}`} onClick={() => setSelectedId(null)}><span>⌂ 工作台</span><em>{tasks.length}</em></button>
      <button className="home-link" onClick={() => setSopOpen(true)}><span>◇ Skill / SOP</span><em>v{growthSkillVersion}</em></button>
      <label className="search"><span>⌕</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="搜索任务或原始资料" /></label>
      <div className="filter-row">{(["全部", "进行中", "有阻塞", "待发布", "已发布"] as const).map((item) => <button key={item} className={filter === item ? "active" : ""} onClick={() => setFilter(item)}>{item}</button>)}</div>
      <div className="side-tasks">{filteredTasks.map((task) => {
        const needs = stageRequirements(task, task.stage);
        return <button key={task.id} className={selectedId === task.id ? "active" : ""} onClick={() => selectTask(task)}><div><span className={`kind ${task.kind}`}>{task.kind}</span><span className={`priority ${task.priority}`}>{task.priority}</span></div><b>{task.title}</b><p>{stages[task.stage].name} · {needs.length ? `${needs.length} 项待处理` : "可进入下一步"}</p><div className="mini-progress"><i style={{ width: `${(task.stage / 5) * 100}%` }} /></div></button>;
      })}{!filteredTasks.length && <div className="side-empty">没有匹配的任务</div>}</div>
      <footer className="sidebar-footer"><div><button onClick={exportBackup}>导出备份</button><button onClick={() => importRef.current?.click()}>恢复备份</button></div><input ref={importRef} hidden type="file" accept="application/json" onChange={(event) => event.target.files?.[0] && importFile(event.target.files[0])} /><small>自动保存于当前浏览器 · 建议每周导出一次</small></footer>
    </aside>

    <section className="main-area">{!current ? dashboard : <>
      <header className="task-topbar"><div><div className="crumb"><button onClick={() => setSelectedId(null)}>工作台</button><span>/</span><span>{current.kind}</span></div><input className="task-title" value={current.title} onChange={(event) => update({ title: event.target.value })} /></div><div className="top-actions"><span className="autosaved">✓ 已自动保存</span><button className="button" onClick={saveSnapshot}>保存快照</button><button className="button" onClick={exportMarkdown}>导出</button><button className="button primary" onClick={copyWriterPrompt}>用 Verdent Skill 生成</button></div></header>
      <section className="task-meta">
        <label>类型<select value={current.kind} onChange={(event) => { const kind = event.target.value as Kind; const defaults = emptyPublishing(kind); update({ kind, writerMode: kind === "日常内容" ? "V-Tips" : "Release Announcement", brief: recognizeBrief(current.source, kind), publishing: Object.fromEntries(channels.map((channel) => [channel, { ...current.publishing[channel], enabled: defaults[channel].enabled }])) as Record<Channel, PublishItem> }); }}><option>版本更新</option><option>新模型</option><option>日常内容</option></select></label>
        <label>优先级<select value={current.priority} onChange={(event) => update({ priority: event.target.value as Priority })}><option>P0</option><option>P1</option><option>P2</option></select></label>
        <label>内容策略<select value={current.writerMode} onChange={(event) => update({ writerMode: event.target.value as WriterMode })}><option value="Release Announcement">正式发版 / 模型上线</option><option value="V-Thoughts">观点 / 行业观察</option><option value="V-Tips">教程 / 实用技巧</option><option value="V-Playground">Builder Story / Demo</option></select></label>
        <label>目标发布日期<input type="date" value={current.date} onChange={(event) => update({ date: event.target.value })} /></label>
        <label>时间<input type="time" value={current.time} onChange={(event) => update({ time: event.target.value })} /></label>
        <label className="wide-note">内部备注<input value={current.notes} onChange={(event) => update({ notes: event.target.value })} placeholder="审核人、风险、临时信息" /></label>
      </section>
      <nav className="pipeline">{stages.map((stage, index) => <button key={stage.name} className={`${activeStage === index ? "active" : ""} ${index < current.stage ? "done" : ""} ${index === current.stage ? "current" : ""}`} onClick={() => setActiveStage(index)}><i>{index < current.stage ? "✓" : index + 1}</i><span><b>{stage.name}</b><small>{stage.caption}</small></span></button>)}</nav>

      <div className="work-layout"><section className="stage-card">
        {activeStage === 0 && <>
          <header className="stage-heading"><div><span className="step-label">STEP 01 · INTAKE</span><h2>保留完整原始资料</h2><p>不要先改写。完整粘贴 PM Changelog、模型群通知或内容灵感，系统再做结构化识别。</p></div><button className="button primary" onClick={() => reRecognize(true)}>识别 Brief →</button></header>
          <textarea className="large-editor" value={current.source} onChange={(event) => update({ source: event.target.value })} placeholder="把收到的原始资料完整粘贴到这里……" />
          <div className="hint-bar"><b>自动识别范围</b><span>主体与厂商</span><span>上线时间</span><span>功能与场景</span><span>性能依据</span><span>素材与公开边界</span></div>
        </>}

        {activeStage === 1 && <>
          <header className="stage-heading"><div><span className="step-label">STEP 02 · FACT LOCK</span><h2>先锁定事实，再开始写</h2><p>空白字段代表尚未确认。填写“无”也比默认猜测更安全。</p></div><button className="button" onClick={() => reRecognize()}>重新识别</button></header>
          {subjectFamilies(current.brief.detectedSubjects).length > 1 && <div className="alert danger"><b>检测到多个传播主体</b><p>原始资料同时出现 {subjectFamilies(current.brief.detectedSubjects).join("、")}。请确认这是一次联合发布，还是应该拆成独立任务，避免 Brief 串线。</p></div>}
          {getMissing(current.brief, current.kind).length > 0 && <div className="missing-box"><b>{getMissing(current.brief, current.kind).length} 项事实待补充</b><div>{getMissing(current.brief, current.kind).map((item) => <span key={item}>{item}</span>)}</div></div>}
          <div className="brief-form">
            <label>版本 / 模型 / 主题<input value={current.brief.subject} onChange={(event) => updateBrief("subject", event.target.value)} /></label>
            <label>模型厂商<input value={current.brief.vendor} onChange={(event) => updateBrief("vendor", event.target.value)} disabled={current.kind !== "新模型"} placeholder={current.kind === "新模型" ? "Google / OpenAI / …" : "此类型不需要"} /></label>
            <label>正式上线时间<input value={current.brief.launch} onChange={(event) => updateBrief("launch", event.target.value)} placeholder="需 PM 最终确认" /></label>
            <label>开放状态<input value={current.brief.access} onChange={(event) => updateBrief("access", event.target.value)} placeholder="GA / EA / Limited Preview / …" /></label>
            <label className="wide">核心传播点<input value={current.brief.headline} onChange={(event) => updateBrief("headline", event.target.value)} /></label>
            <label className="wide">功能 / 能力<textarea value={current.brief.features} onChange={(event) => updateBrief("features", event.target.value)} /></label>
            <label className="wide">用户使用场景<textarea value={current.brief.scenarios} onChange={(event) => updateBrief("scenarios", event.target.value)} /></label>
            <label className="wide">事实与性能依据<textarea value={current.brief.evidence} onChange={(event) => updateBrief("evidence", event.target.value)} placeholder="官方资料、内部测试或算法同学已确认的结论" /></label>
            <label>截图 / 视频 / Logo<input value={current.brief.assets} onChange={(event) => updateBrief("assets", event.target.value)} /></label>
            <label>厂商联合 PR<input value={current.brief.partner} onChange={(event) => updateBrief("partner", event.target.value)} placeholder="无 / 待确认 / 具体安排" /></label>
            <label className="wide">不可公开信息 / 需要隐藏区域<textarea value={current.brief.confidential} onChange={(event) => updateBrief("confidential", event.target.value)} placeholder="如确认没有，请明确填写“无，已与 PM 确认”" /></label>
          </div>
          <CheckGroup title="事实确认门禁" keys={checkGroups.facts} task={current} onChange={updateCheck} />
        </>}

        {activeStage === 2 && <>
          <header className="stage-heading"><div><span className="step-label">STEP 03 · PRODUCTION</span><h2>一次生产完整内容包</h2><p>启用的平台共享同一个事实底稿，但表达方式按平台重写，不做机械裁剪。</p></div><button className="button primary" onClick={copyWriterPrompt}>用 Skill 生成内容包</button></header>
          <div className="platform-switch">{channels.map((channel) => <button key={channel} className={`${platform === channel ? "active" : ""} ${!current.publishing[channel].enabled ? "inactive" : ""}`} onClick={() => setPlatform(channel)}><span>{channelNames[channel]}</span><i>{!current.publishing[channel].enabled ? "未启用" : current.drafts[channel].trim() ? "✓" : "空"}</i></button>)}</div>
          <div className="draft-head"><div><h3>{channelNames[platform]} 文案</h3><p>{channelNotes[platform]}</p></div><button className="button" onClick={() => navigator.clipboard.writeText(current.drafts[platform]).then(() => say("文案已复制"))}>复制文案</button></div>
          <textarea className="large-editor draft-editor" value={current.drafts[platform]} onChange={(event) => update({ drafts: { ...current.drafts, [platform]: event.target.value } })} placeholder={`在这里粘贴或编辑 ${channelNames[platform]} 文案……`} />
          <div className={`char-count ${platform === "x" && current.drafts.x.length > 280 ? "warn" : ""}`}>{current.drafts[platform].length} 字符{platform === "x" ? " · 短帖建议不超过 280" : ""}</div>
          <div className="asset-grid"><label><span><b>{current.kind === "日常内容" ? "视觉素材 Brief" : "海报 Brief"}</b><small>交付给设计同学的精简信息</small></span><textarea value={current.poster} onChange={(event) => update({ poster: event.target.value })} placeholder={`主体：\n主标题：\n简短小字：\n重点能力：\n截图 / Logo：\n开放状态：`} /></label><label><span><b>视频剪辑 Brief</b><small>没有视频时写明“本次不需要”</small></span><textarea value={current.video} onChange={(event) => update({ video: event.target.value })} placeholder={`保留画面：\n隐藏区域：\n加速 / 跳过：\n旁白对应：\n放大 / 标注 / 字幕：`} /></label></div>
          <CheckGroup title="制作完成门禁" keys={checkGroups.production} task={current} onChange={updateCheck} />
        </>}

        {activeStage === 3 && <>
          <header className="stage-heading"><div><span className="step-label">STEP 04 · REVIEW</span><h2>自动扫描，人工签字</h2><p>系统负责发现明显风险；产品事实与最终发布许可仍由对应同学确认。</p></div><span className={`scan-score ${issues.some((issue) => issue.level === "高") ? "bad" : issues.length ? "medium" : "good"}`}>{issues.length ? `${issues.length} 个问题` : "扫描通过"}</span></header>
          <div className="scan-list">{issues.map((issue, index) => <div key={`${issue.text}-${index}`} className={`issue ${issue.level}`}><span>{issue.level}</span><p>{issue.text}</p></div>)}{!issues.length && <div className="scan-clear"><span>✓</span><div><b>未发现明显文案风险</b><p>仍需人工核对产品事实、正式上线状态和公开边界。</p></div></div>}</div>
          <div className="review-rules"><h3>自动检查规则</h3><div><span>未确认上线表述</span><span>待确认占位符</span><span>夸大营销词</span><span>隐私数据暗示</span><span>英文长破折号</span><span>X 字符长度</span><span>Reddit 标题 / 正文</span><span>多模型主体冲突</span></div></div>
          <CheckGroup title="最终审核门禁" keys={checkGroups.review} task={current} onChange={updateCheck} />
        </>}

        {activeStage === 4 && <>
          <header className="stage-heading"><div><span className="step-label">STEP 05 · DISTRIBUTION</span><h2>确认上线后再发布</h2><p>各平台可独立启用、排期和记录链接。正式发布前必须再次向 PM 确认上线状态。</p></div></header>
          <div className="publish-table"><div className="publish-row publish-header"><span>平台</span><span>发布账号</span><span>启用</span><span>发布时间</span><span>发布链接</span><span>完成</span></div>{channels.map((channel) => {
            const item = current.publishing[channel];
            const channelAccounts = accounts.filter((account) => account.platform === channel);
            const selectedAccount = accountById(item.accountId);
            return <div className={`publish-row ${!item.enabled ? "disabled" : ""}`} key={channel}><b>{channelNames[channel]}</b><div className="account-target"><select value={item.accountId} disabled={!item.enabled} onChange={(event) => update({ publishing: { ...current.publishing, [channel]: { ...item, accountId: event.target.value } } })}>{channelAccounts.map((account) => <option key={account.id} value={account.id}>{account.accountName}</option>)}</select>{selectedAccount?.url ? <a href={selectedAccount.url} target="_blank" rel="noreferrer" aria-label={`打开 ${selectedAccount.accountName}`}>↗</a> : <button onClick={() => setAccountsOpen(true)} title="补充账号链接">!</button>}</div><label className="switch"><input type="checkbox" checked={item.enabled} onChange={(event) => update({ publishing: { ...current.publishing, [channel]: { ...item, enabled: event.target.checked } } })} /><i /></label><input type="datetime-local" value={item.scheduledAt} disabled={!item.enabled} onChange={(event) => update({ publishing: { ...current.publishing, [channel]: { ...item, scheduledAt: event.target.value } } })} /><input value={item.url} disabled={!item.enabled} onChange={(event) => update({ publishing: { ...current.publishing, [channel]: { ...item, url: event.target.value } } })} placeholder="发布后粘贴 URL" /><label className="publish-check"><input type="checkbox" checked={item.published} disabled={!item.enabled} onChange={(event) => update({ publishing: { ...current.publishing, [channel]: { ...item, published: event.target.checked } } })} /><span>{item.published ? "已发布" : "待发布"}</span></label></div>;
          })}</div>
          <CheckGroup title="发布执行门禁" keys={checkGroups.publish} task={current} onChange={updateCheck} />
        </>}

        {activeStage === 5 && <>
          <header className="stage-heading"><div><span className="step-label">STEP 06 · LEARNING</span><h2>把一次发布变成可复用经验</h2><p>先记录链接和基础表现，再总结什么表达、素材或发布时间值得复用。</p></div></header>
          <div className="metric-grid">{channels.filter((channel) => current.publishing[channel].enabled).map((channel) => <article key={channel}><header><b>{channelNames[channel]}</b>{current.publishing[channel].url && <a href={current.publishing[channel].url} target="_blank" rel="noreferrer">查看发布 ↗</a>}</header><div><label>曝光 / 浏览<input value={current.metrics[channel].impressions} onChange={(event) => update({ metrics: { ...current.metrics, [channel]: { ...current.metrics[channel], impressions: event.target.value } } })} placeholder="例如 12.4K" /></label><label>互动<input value={current.metrics[channel].engagements} onChange={(event) => update({ metrics: { ...current.metrics, [channel]: { ...current.metrics[channel], engagements: event.target.value } } })} placeholder="回复、转发、评论" /></label></div><textarea value={current.metrics[channel].notes} onChange={(event) => update({ metrics: { ...current.metrics, [channel]: { ...current.metrics[channel], notes: event.target.value } } })} placeholder="表现观察……" /></article>)}</div>
          <label className="retro"><span><b>复盘结论</b><small>建议按“有效 → 无效 → 下次复用”记录</small></span><textarea value={current.retrospective} onChange={(event) => update({ retrospective: event.target.value })} placeholder={`有效：\n无效：\n下次继续：\n可沉淀到模板 / Skill 的规则：`} /></label>
          <div className="history"><header><h3>内容快照</h3><button className="button" onClick={saveSnapshot}>＋ 保存当前快照</button></header>{current.snapshots.map((snapshot, index) => <div key={snapshot.at}><span><b>版本 {current.snapshots.length - index}</b><small>{new Date(snapshot.at).toLocaleString("zh-CN")}</small></span><em>{Object.values(snapshot.drafts).filter(Boolean).length} 个平台文案</em><button onClick={() => restoreSnapshot(snapshot)}>恢复</button></div>)}{!current.snapshots.length && <p className="empty-history">还没有快照。大幅修改文案前建议保存一次。</p>}</div>
        </>}
      </section>

      <aside className="next-panel">
        <section className="next-card"><span className="eyebrow">CURRENT GATE</span><h3>{stages[current.stage].name}阶段</h3>{currentNeeds.length ? <><p>完成以下 {currentNeeds.length} 项后才能推进：</p><ul>{currentNeeds.slice(0, 6).map((need) => <li key={need}>{need}</li>)}</ul>{currentNeeds.length > 6 && <small>另有 {currentNeeds.length - 6} 项未完成</small>}</> : <div className="all-clear"><span>✓</span><p>本阶段门禁已完成，可以进入下一步。</p></div>}<button className="button primary next-action" onClick={advance} disabled={current.stage === 5}>{current.stage === 5 ? "流程已完成" : `进入「${stages[Math.min(current.stage + 1, 5)].name}」阶段 →`}</button></section>
        <section className="health-card"><header><h3>任务健康度</h3><strong>{Math.round((Object.keys(checkLabels).filter((key) => current.checks[key]).length / Object.keys(checkLabels).length) * 100)}%</strong></header><div><span>事实完整度</span><b>{Math.max(0, 9 - getMissing(current.brief, current.kind).length)}/9</b></div><div><span>启用平台文案</span><b>{channels.filter((channel) => current.publishing[channel].enabled && current.drafts[channel].trim()).length}/{channels.filter((channel) => current.publishing[channel].enabled).length}</b></div><div><span>风险扫描</span><b className={issues.some((issue) => issue.level === "高") ? "red" : "green"}>{issues.some((issue) => issue.level === "高") ? "需处理" : "正常"}</b></div></section>
        <section className="shortcut-card"><h3>快捷动作</h3><button onClick={copyWriterPrompt}>用 Verdent Skill 生成 <span>⌘</span></button><button onClick={() => setSopOpen(true)}>查看 Skill / SOP <span>↗</span></button><button onClick={() => setAccountsOpen(true)}>打开社媒账号中心 <span>↗</span></button><button onClick={saveSnapshot}>保存内容快照 <span>＋</span></button></section>
        <section className="delete-card"><button onClick={removeTask}>删除此任务</button><small>最后更新 {new Date(current.updatedAt).toLocaleString("zh-CN")}</small></section>
      </aside></div>
    </>}</section>

    {sopOpen && <div className="overlay" onClick={() => setSopOpen(false)}><section className="sop-modal" onClick={(event) => event.stopPropagation()}><header><div><span className="eyebrow">VERDENT SOCIAL GROWTH · v{growthSkillVersion}</span><h2>自己的 Skill 与发布 SOP</h2><p>以当前 Verdent 工作流和真实账号样本为依据，交接 Skill 仅作参考。</p></div><button onClick={() => setSopOpen(false)}>×</button></header><div className="sop-status"><article><b>4 个平台</b><span>已有真实公开内容样本</span></article><article><b>2 个平台</b><span>Discord / TikTok 待数据校准</span></article><article><b>3 类主流程</b><span>版本、模型、日常内容</span></article></div><section><h3>执行主线</h3><ol><li><b>收集</b><span>保留完整 Changelog、模型通知和素材。</span></li><li><b>事实门禁</b><span>区分 CONFIRMED、PENDING、NOT PROVIDED 和 DO NOT USE。</span></li><li><b>内容路由</b><span>正式发版讲清价值；观点和 Builder Story 才做更强 Hook。</span></li><li><b>平台重写</b><span>同一事实底稿，按 X、Discord、LinkedIn、Reddit、Instagram、TikTok 分别生产。</span></li><li><b>发布 QA</b><span>检查上线状态、依据、公开边界、隐私、语言、CTA 和素材。</span></li><li><b>复盘沉淀</b><span>按内容类型比较表现，重复证据才升级为 Skill 规则。</span></li></ol></section><div className="sop-columns"><section><h3>删除</h3><p>前任电脑路径、飞书强耦合、伪精确算法权重、所有帖子强制争议化、必须编数字、固定 hashtag 墙。</p></section><section><h3>保留</h3><p>英文对外输出、事实优先、平台差异、隐私保护、禁用夸张词、无英文长破折号、发布前确认。</p></section><section><h3>增加</h3><p>事实状态、DO NOT PUBLISH 门禁、六种内容模式、视觉与视频交付、平台 CTA 分配、复盘更新规则。</p></section></div><footer><span>Skill 文件已随 GitHub 项目管理，可审阅、更新和回滚。</span><div><button className="button" onClick={() => navigator.clipboard.writeText(growthSkillPath).then(() => say("Skill 路径已复制"))}>复制 Skill 路径</button><button className="button primary" onClick={() => setSopOpen(false)}>开始使用</button></div></footer></section></div>}
    {accountsOpen && <div className="overlay" onClick={() => setAccountsOpen(false)}><section className="account-modal" onClick={(event) => event.stopPropagation()}><header><div><span className="eyebrow">CHANNEL DIRECTORY</span><h2>社媒账号中心</h2><p>账号名称与主页链接是全局资产。修改后会自动保存，并同步到每个任务的发布阶段。</p></div><button onClick={() => setAccountsOpen(false)}>×</button></header><div className="account-table"><div className="account-table-head"><span>平台</span><span>账号名称</span><span>主页链接</span><span>状态</span></div>{accounts.map((account) => <div className="account-row" key={account.id}><b>{account.platformName}</b><input value={account.accountName} onChange={(event) => setAccounts((all) => all.map((item) => item.id === account.id ? { ...item, accountName: event.target.value } : item))} /><input value={account.url} onChange={(event) => setAccounts((all) => all.map((item) => item.id === account.id ? { ...item, url: event.target.value } : item))} placeholder="粘贴官方主页或邀请链接" /><span className={account.url ? "linked" : "unlinked"}>{account.url ? <a href={account.url} target="_blank" rel="noreferrer">已连接 ↗</a> : "待补链接"}</span></div>)}</div><footer><div><b>默认发布组合</b><span>版本 / 模型：X、Discord、LinkedIn、Reddit</span><span>日常内容：X、Instagram、TikTok</span></div><div><button className="button" onClick={() => setAccounts(defaultAccounts.map((account) => ({ ...account })))}>恢复默认</button><button className="button primary" onClick={() => setAccountsOpen(false)}>完成</button></div></footer></section></div>}
    {newOpen && <div className="overlay" onClick={() => setNewOpen(false)}><section className="new-modal" onClick={(event) => event.stopPropagation()}><header><div><span className="eyebrow">NEW CONTENT TASK</span><h2>先把原始信息放进来</h2><p>系统会保留原文、识别内容类型，并标出事实缺口。</p></div><button onClick={() => setNewOpen(false)}>×</button></header><div className="kind-picker">{(["自动识别", "版本更新", "新模型", "日常内容"] as const).map((item) => <button className={newKind === item ? "active" : ""} onClick={() => setNewKind(item)} key={item}>{item}</button>)}</div><textarea autoFocus value={newSource} onChange={(event) => setNewSource(event.target.value)} placeholder="Changelog、模型上线通知或日常内容想法……" /><footer><span>{newSource.length} 字</span><div><button className="button" onClick={() => setNewOpen(false)}>取消</button><button className="button primary" onClick={createTask}>建立任务并识别 →</button></div></footer></section></div>}
    {toast && <div className="toast">✓ {toast}</div>}
  </main>;
}

function CheckGroup({ title, keys, task, onChange }: { title: string; keys: string[]; task: Task; onChange: (key: string, value: boolean) => void }) {
  return <section className="check-group"><header><h3>{title}</h3><span>{keys.filter((key) => task.checks[key]).length}/{keys.length}</span></header><div>{keys.map((key) => <label key={key} className={task.checks[key] ? "checked" : ""}><input type="checkbox" checked={task.checks[key] || false} onChange={(event) => onChange(key, event.target.checked)} /><i>{task.checks[key] ? "✓" : ""}</i><span>{checkLabels[key]}</span></label>)}</div></section>;
}
