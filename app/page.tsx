"use client";

import { useEffect, useMemo, useState } from "react";

type Status = "Need Info" | "Ready" | "Drafting" | "Review" | "Scheduled";
type Kind = "版本更新" | "新模型" | "日常内容" | "视频与设计";

type Task = {
  id: number;
  title: string;
  kind: Kind;
  status: Status;
  due: string;
  owner: string;
  channel: string;
  accent: string;
};

const seedTasks: Task[] = [
  { id: 1, title: "v1.19 Release", kind: "版本更新", status: "Drafting", due: "Tue · 22:00", owner: "Me", channel: "4 platforms", accent: "green" },
  { id: 2, title: "Kimi K3 Launch", kind: "新模型", status: "Review", due: "Jul 24", owner: "Algorithm", channel: "PR partner", accent: "violet" },
  { id: 3, title: "Agent Workflow Tips", kind: "日常内容", status: "Ready", due: "Jul 25", owner: "Me", channel: "X · LinkedIn", accent: "orange" },
  { id: 4, title: "Demo video cut", kind: "视频与设计", status: "Need Info", due: "Waiting", owner: "PM", channel: "Video", accent: "blue" },
];

const lanes: Status[] = ["Need Info", "Ready", "Drafting", "Review", "Scheduled"];

function classify(text: string): { kind: Kind; title: string; status: Status; accent: string } {
  const normalized = text.toLowerCase();
  if (/model|模型|claude|gpt|kimi|gemini|llama/.test(normalized)) {
    const match = text.match(/(?:GPT|Claude|Kimi|Gemini|Llama)[-\s\w.]*/i);
    return { kind: "新模型", title: match?.[0]?.trim() || "新模型上线", status: "Need Info", accent: "violet" };
  }
  if (/changelog|version|版本|release|v\d/.test(normalized)) {
    const match = text.match(/v?\d+\.\d+(?:\.\d+)?/i);
    return { kind: "版本更新", title: match ? `${match[0]} Release` : "产品版本更新", status: "Need Info", accent: "green" };
  }
  if (/video|录屏|视频|剪辑|poster|海报/.test(normalized)) {
    return { kind: "视频与设计", title: "视觉内容制作", status: "Need Info", accent: "blue" };
  }
  return { kind: "日常内容", title: text.trim().slice(0, 30) || "日常内容想法", status: "Ready", accent: "orange" };
}

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>(seedTasks);
  const [input, setInput] = useState("");
  const [filter, setFilter] = useState("全部任务");
  const [active, setActive] = useState("工作台");
  const [notice, setNotice] = useState("");

  useEffect(() => {
    const saved = window.localStorage.getItem("verdent-growth-tasks");
    if (saved) setTasks(JSON.parse(saved));
  }, []);

  useEffect(() => {
    window.localStorage.setItem("verdent-growth-tasks", JSON.stringify(tasks));
  }, [tasks]);

  const visibleTasks = useMemo(
    () => filter === "全部任务" ? tasks : tasks.filter((task) => task.kind === filter),
    [filter, tasks]
  );

  function addTask() {
    if (!input.trim()) return;
    const result = classify(input);
    const next: Task = {
      id: Date.now(),
      ...result,
      due: result.kind === "版本更新" ? "Tue · 22:00" : "To schedule",
      owner: "Me",
      channel: result.kind === "版本更新" || result.kind === "新模型" ? "4 platforms" : "To decide",
    };
    setTasks((current) => [next, ...current]);
    setInput("");
    setNotice(`已识别为「${result.kind}」，并加入任务流。`);
    window.setTimeout(() => setNotice(""), 3200);
  }

  function advance(task: Task) {
    const index = lanes.indexOf(task.status);
    if (index === lanes.length - 1) return;
    setTasks((current) => current.map((item) => item.id === task.id ? { ...item, status: lanes[index + 1] } : item));
  }

  const reviewCount = tasks.filter((task) => task.status === "Review").length;
  const blockedCount = tasks.filter((task) => task.status === "Need Info").length;

  return (
    <main className="app-shell">
      <aside className="sidebar">
        <div className="brand"><span className="brand-mark">V</span><span>Verdent</span></div>
        <div className="workspace-label">GROWTH OS</div>
        <nav>
          {["工作台", "内容任务", "发布日历", "资产中心", "数据复盘"].map((item) => (
            <button key={item} className={active === item ? "nav-item active" : "nav-item"} onClick={() => setActive(item)}>
              <span className="nav-icon">{item.slice(0, 1)}</span>{item}
              {item === "内容任务" && <em>{tasks.length}</em>}
            </button>
          ))}
        </nav>
        <div className="sidebar-bottom">
          <button className="nav-item"><span className="nav-icon">设</span>工作规范</button>
          <div className="profile"><span>GI</span><div><strong>Growth Intern</strong><small>Verdent Social</small></div></div>
        </div>
      </aside>

      <section className="main-content">
        <header className="topbar">
          <div><p className="eyebrow">VERDENT SOCIAL TEAM</p><h1>{active}</h1></div>
          <div className="top-actions"><button className="icon-button">⌕</button><button className="primary" onClick={() => document.getElementById("smart-inbox")?.focus()}>＋ 新建任务</button></div>
        </header>

        <section className="hero-grid">
          <div className="briefing">
            <div className="briefing-head"><span className="pulse"></span><span>今日简报</span><small>JUL 22 · TUESDAY</small></div>
            <h2>晚上好。<br/>有 <b>{reviewCount + blockedCount} 项</b>工作需要你的关注。</h2>
            <div className="alert-row">
              <div><span className="alert-icon purple">审</span><p><strong>{reviewCount} 项等待审核</strong><small>产品或算法侧确认</small></p></div>
              <div><span className="alert-icon amber">缺</span><p><strong>{blockedCount} 项信息不完整</strong><small>补齐后即可开始制作</small></p></div>
            </div>
          </div>
          <div className="week-card">
            <div className="card-label">本周发布节奏 <span>W30</span></div>
            <div className="week-days">
              {["一", "二", "三", "四", "五"].map((day, i) => <div key={day} className={i === 1 ? "today" : ""}><small>{day}</small><b>{21 + i}</b>{i === 1 && <span></span>}</div>)}
            </div>
            <div className="release-slot"><span></span><div><strong>v1.19 正式发布</strong><small>今晚 22:00 · 等待 PM 最终确认</small></div><b>→</b></div>
          </div>
        </section>

        <section className="smart-card">
          <div className="smart-copy"><span className="ai-badge">AI</span><div><h3>智能收件箱</h3><p>粘贴 Changelog、模型上线通知或内容想法，我会自动分类并创建任务。</p></div></div>
          <div className="input-row">
            <textarea id="smart-inbox" value={input} onChange={(event) => setInput(event.target.value)} placeholder="把原始信息粘贴到这里…" onKeyDown={(event) => { if ((event.metaKey || event.ctrlKey) && event.key === "Enter") addTask(); }} />
            <button onClick={addTask}>智能处理 <span>↗</span></button>
          </div>
          <div className="smart-foot"><span>自动识别</span><span>版本更新</span><span>新模型</span><span>日常内容</span><small>⌘ + Enter 提交</small></div>
          {notice && <div className="toast">✓ {notice}</div>}
        </section>

        <section className="task-section">
          <div className="section-head"><div><h2>当前任务</h2><span>{visibleTasks.length} 个进行中</span></div><div className="filters">{["全部任务", "版本更新", "新模型", "日常内容", "视频与设计"].map((item) => <button key={item} className={filter === item ? "selected" : ""} onClick={() => setFilter(item)}>{item}</button>)}</div></div>
          <div className="task-list">
            <div className="task-header"><span>任务</span><span>状态</span><span>截止时间</span><span>协作方</span><span>渠道</span><span></span></div>
            {visibleTasks.map((task) => (
              <div className="task-row" key={task.id}>
                <div className="task-name"><span className={`task-dot ${task.accent}`}></span><div><strong>{task.title}</strong><small>{task.kind}</small></div></div>
                <span className={`status ${task.status.toLowerCase().replace(" ", "-")}`}>{task.status}</span>
                <span className="muted">{task.due}</span><span className="muted">{task.owner}</span><span className="channel">{task.channel}</span>
                <button className="advance" onClick={() => advance(task)} aria-label={`推进 ${task.title}`}>→</button>
              </div>
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}
