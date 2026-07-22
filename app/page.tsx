"use client";

import { useEffect, useMemo, useState } from "react";

type Status = "待补充" | "可开始" | "制作中" | "审核中" | "已排期";
type Kind = "版本更新" | "新模型" | "日常内容" | "视频设计";
type Task = { id:number; title:string; kind:Kind; status:Status; date:string; owner:string; channels:string[]; raw:string; checked:string[] };

const statuses: Status[] = ["待补充","可开始","制作中","审核中","已排期"];
const statusClass: Record<Status,string> = {"待补充":"amber","可开始":"mint","制作中":"blue","审核中":"purple","已排期":"dark"};
const initialTasks: Task[] = [
  {id:1,title:"Verdent v1.19 发布",kind:"版本更新",status:"制作中",date:"2026-07-22",owner:"PM",channels:["X","Discord","LinkedIn","Reddit"],raw:"等待最终 Changelog 与上线确认。",checked:["版本号","核心功能"]},
  {id:2,title:"Kimi K3 上线",kind:"新模型",status:"审核中",date:"2026-07-24",owner:"算法",channels:["X","Discord","LinkedIn"],raw:"确认模型能力、开放状态及厂商联动计划。",checked:["模型与厂商名称","开放状态与活动"]},
  {id:3,title:"Agent Workflow Tips",kind:"日常内容",status:"可开始",date:"2026-07-25",owner:"我",channels:["X","LinkedIn"],raw:"围绕多 Agent 工作流拆解一条实用技巧。",checked:[]},
  {id:4,title:"版本演示视频",kind:"视频设计",status:"待补充",date:"2026-07-27",owner:"PM",channels:["Video"],raw:"等待 PM 提供原始录屏和旁白基础文案。",checked:[]},
];

const assets = [
  ["版本更新海报","Design","设计同学维护","用于常规版本发布"],
  ["新模型上线海报","Design","设计同学维护","模型接入与联合 PR"],
  ["视频封面模板","Video","可直接复用","16:9 与 1:1"],
  ["视频结尾模板","Video","可直接复用","统一品牌片尾"],
  ["Verdent X Writer","Skill","已梳理","英文平台文案"],
  ["Minimax Voice Clone","Audio","待确认配置","视频旁白生成"],
];

const nav = [["工作台","⌂"],["任务看板","▦"],["发布日历","◫"],["资产中心","◇"],["数据复盘","↗"]];

function classify(text:string): {kind:Kind;title:string} {
  const value=text.toLowerCase();
  if(/model|模型|gpt|claude|kimi|gemini/.test(value)) return {kind:"新模型",title:text.match(/(?:GPT|Claude|Kimi|Gemini)[-\s\w.]*/i)?.[0]?.trim()||"新模型上线"};
  if(/changelog|version|版本|release|v\d/.test(value)) return {kind:"版本更新",title:`${text.match(/v?\d+\.\d+(?:\.\d+)?/i)?.[0]||"新版本"} 发布`};
  if(/video|视频|录屏|剪辑|海报|poster/.test(value)) return {kind:"视频设计",title:"视觉内容制作"};
  return {kind:"日常内容",title:text.trim().slice(0,32)||"新内容任务"};
}

export default function Home(){
  const [tasks,setTasks]=useState<Task[]>(initialTasks);
  const [active,setActive]=useState("工作台");
  const [query,setQuery]=useState("");
  const [inbox,setInbox]=useState("");
  const [selected,setSelected]=useState<number|null>(null);
  const [showNew,setShowNew]=useState(false);
  const [toast,setToast]=useState("");

  useEffect(()=>{const saved=localStorage.getItem("verdent-growth-tasks-v2");if(saved)setTasks(JSON.parse(saved));},[]);
  useEffect(()=>{localStorage.setItem("verdent-growth-tasks-v2",JSON.stringify(tasks));},[tasks]);

  const visible=useMemo(()=>tasks.filter(t=>`${t.title}${t.kind}${t.owner}`.toLowerCase().includes(query.toLowerCase())),[tasks,query]);
  const current=tasks.find(t=>t.id===selected);
  const attention=tasks.filter(t=>t.status==="待补充"||t.status==="审核中").length;
  const notify=(message:string)=>{setToast(message);setTimeout(()=>setToast(""),2800)};

  function createFromText(text:string){
    if(!text.trim())return;
    const info=classify(text); const task:Task={id:Date.now(),...info,status:"待补充",date:new Date().toISOString().slice(0,10),owner:"我",channels:info.kind==="视频设计"?["Video"]:["X","Discord","LinkedIn","Reddit"],raw:text.trim(),checked:[]};
    setTasks(v=>[task,...v]);setInbox("");setShowNew(false);setSelected(task.id);notify(`已创建「${info.kind}」任务`);
  }
  function update(id:number,patch:Partial<Task>){setTasks(v=>v.map(t=>t.id===id?{...t,...patch}:t));}
  function move(id:number,direction:number){const task=tasks.find(t=>t.id===id);if(!task)return;const next=Math.max(0,Math.min(statuses.length-1,statuses.indexOf(task.status)+direction));update(id,{status:statuses[next]});}
  async function copyCodex(task:Task){const text=`请按 Verdent Social Ops OS 处理此任务。\n任务：${task.title}\n类型：${task.kind}\n状态：${task.status}\n发布日期：${task.date}\n协作方：${task.owner}\n渠道：${task.channels.join("、")}\n原始信息：${task.raw}\n\n请输出：信息缺口、传播角度、X/Discord/LinkedIn/Reddit 英文文案、海报 brief、发布前检查。`;await navigator.clipboard.writeText(text);notify("已复制 Codex 任务指令");}

  const TaskCard=({task,compact=false}:{task:Task;compact?:boolean})=><button className={`task-card ${compact?"compact":""}`} onClick={()=>setSelected(task.id)}>
    <div className="task-card-top"><span className={`kind k-${task.kind}`}>{task.kind}</span><span className={`state ${statusClass[task.status]}`}>{task.status}</span></div>
    <h3>{task.title}</h3><p>{task.raw}</p><div className="task-meta"><span>◷ {task.date.slice(5)}</span><span>◎ {task.owner}</span><span>{task.channels.length} 渠道</span></div>
  </button>;

  function Dashboard(){return <>
    <section className="welcome"><div><span className="overline">TUESDAY · JUL 22</span><h2>今天需要处理 <b>{attention}</b> 个关键节点</h2><p>先解决信息缺口和审核项，再开始新的内容制作。</p></div><button className="solid" onClick={()=>setShowNew(true)}>＋ 创建任务</button></section>
    <section className="metric-grid"><div><small>进行中任务</small><strong>{tasks.length}</strong><em>本周工作量</em></div><div><small>等待确认</small><strong>{tasks.filter(t=>t.status==="待补充").length}</strong><em>需要 PM / 算法</em></div><div><small>审核中</small><strong>{tasks.filter(t=>t.status==="审核中").length}</strong><em>发布前最后一步</em></div><div><small>本周发布</small><strong>{tasks.filter(t=>t.status==="已排期").length}</strong><em>已进入排期</em></div></section>
    <section className="inbox-panel"><div className="panel-title"><div className="ai-mark">AI</div><div><h3>快速收件箱</h3><p>直接粘贴 Changelog、模型通知或内容想法</p></div></div><textarea value={inbox} onChange={e=>setInbox(e.target.value)} placeholder="粘贴原始信息，不需要整理格式…"/><div className="inbox-bottom"><span>自动分类 · 保留原文 · 创建检查清单</span><button onClick={()=>createFromText(inbox)}>识别并创建任务 ↗</button></div></section>
    <section className="two-col"><div className="panel"><div className="panel-head"><div><h3>需要关注</h3><p>信息缺口与待审核事项</p></div><button onClick={()=>setActive("任务看板")}>查看看板</button></div><div className="stack">{tasks.filter(t=>t.status==="待补充"||t.status==="审核中").map(t=><TaskCard key={t.id} task={t} compact/>)}</div></div>
    <div className="panel timeline"><div className="panel-head"><div><h3>近期发布</h3><p>按计划时间排序</p></div><button onClick={()=>setActive("发布日历")}>打开日历</button></div>{[...tasks].sort((a,b)=>a.date.localeCompare(b.date)).slice(0,4).map(t=><button key={t.id} onClick={()=>setSelected(t.id)}><time>{t.date.slice(8)}</time><span></span><div><b>{t.title}</b><small>{t.channels.join(" · ")}</small></div></button>)}</div></section>
  </>}

  function Board(){return <section className="board">{statuses.map(status=><div className="lane" key={status}><div className="lane-head"><span className={`lane-dot ${statusClass[status]}`}></span><b>{status}</b><em>{visible.filter(t=>t.status===status).length}</em></div><div className="lane-body">{visible.filter(t=>t.status===status).map(t=><TaskCard key={t.id} task={t}/>)}</div></div>)}</section>}

  function Calendar(){const days=Array.from({length:14},(_,i)=>{const d=new Date("2026-07-20");d.setDate(d.getDate()+i);return d});return <section className="calendar-panel"><div className="calendar-top"><div><button>‹</button><h2>2026 年 7 月</h2><button>›</button></div><span>两周发布视图</span></div><div className="calendar-grid">{days.map(d=>{const date=d.toISOString().slice(0,10);const list=tasks.filter(t=>t.date===date);return <div className={`day ${date==="2026-07-22"?"today":""}`} key={date}><header><span>{["日","一","二","三","四","五","六"][d.getDay()]}</span><b>{d.getDate()}</b></header>{list.map(t=><button key={t.id} className={`event ${statusClass[t.status]}`} onClick={()=>setSelected(t.id)}><b>{t.title}</b><small>{t.channels.join(" · ")}</small></button>)}</div>})}</div></section>}

  function Assets(){return <><div className="asset-toolbar"><div><h2>内容与设计资产</h2><p>集中管理模板、Skills、视频工程和品牌规范</p></div><button className="solid" onClick={()=>notify("资产上传将在团队存储接入后开放")}>＋ 添加资产</button></div><section className="asset-grid">{assets.filter(a=>a.join("").toLowerCase().includes(query.toLowerCase())).map((a,i)=><button className="asset" key={a[0]} onClick={()=>notify(`已选中：${a[0]}`)}><span className={`asset-icon a${i%4}`}>{a[1].slice(0,1)}</span><div><small>{a[1]}</small><h3>{a[0]}</h3><p>{a[3]}</p><em>{a[2]}</em></div><b>↗</b></button>)}</section></>}

  function Analytics(){return <><section className="analytics-head"><div><span className="overline">LAST 30 DAYS</span><h2>内容表现复盘</h2><p>示例结构。接入真实平台数据后自动更新。</p></div><select><option>过去 30 天</option><option>过去 7 天</option></select></section><section className="metric-grid analytics"><div><small>总曝光</small><strong>48.2K</strong><em className="up">↑ 18.4%</em></div><div><small>互动率</small><strong>6.8%</strong><em className="up">↑ 1.2%</em></div><div><small>链接点击</small><strong>1,284</strong><em className="up">↑ 9.7%</em></div><div><small>内容发布</small><strong>24</strong><em>4个平台</em></div></section><section className="analytics-grid"><div className="panel chart"><div className="panel-head"><div><h3>每周互动趋势</h3><p>按平台合并</p></div></div><div className="bars">{[38,55,44,68,60,82,74,91,67,78,88,96].map((v,i)=><span key={i} style={{height:`${v}%`}}></span>)}</div><div className="chart-axis"><span>Jun 23</span><span>Jun 30</span><span>Jul 7</span><span>Jul 14</span></div></div><div className="panel top-content"><div className="panel-head"><div><h3>高表现内容</h3><p>按互动率排序</p></div></div>{[["Kimi K3 Launch","X","9.4%"],["Agent Workflow Tips","LinkedIn","8.7%"],["v1.18 Release","Discord","7.9%"]].map((x,i)=><div key={x[0]}><b>0{i+1}</b><span><strong>{x[0]}</strong><small>{x[1]}</small></span><em>{x[2]}</em></div>)}</div></section></>}

  const title=active;
  return <main className="shell">
    <aside className="side"><div className="logo"><span>V</span><b>Verdent</b></div><small className="side-label">GROWTH OS</small><nav>{nav.map(([name,icon])=><button className={active===name?"active":""} onClick={()=>setActive(name)} key={name}><i>{icon}</i><span>{name}</span>{name==="任务看板"&&<em>{tasks.length}</em>}</button>)}</nav><div className="side-foot"><button onClick={()=>notify("工作规范已内置到任务流程")}>⚙ <span>工作规范</span></button><div><span>GI</span><p><b>Growth Intern</b><small>Verdent Social</small></p></div></div></aside>
    <section className="content"><header className="top"><div><small>VERDENT SOCIAL TEAM</small><h1>{title}</h1></div><div className="top-actions"><label>⌕<input value={query} onChange={e=>setQuery(e.target.value)} placeholder="搜索任务或资产"/></label><button className="solid" onClick={()=>setShowNew(true)}>＋ 新建</button></div></header><div className="view">{active==="工作台"&&<Dashboard/>}{active==="任务看板"&&<Board/>}{active==="发布日历"&&<Calendar/>}{active==="资产中心"&&<Assets/>}{active==="数据复盘"&&<Analytics/>}</div></section>
    {current&&<div className="overlay" onClick={()=>setSelected(null)}><aside className="drawer" onClick={e=>e.stopPropagation()}><header><div><span className={`kind k-${current.kind}`}>{current.kind}</span><h2>{current.title}</h2></div><button onClick={()=>setSelected(null)}>×</button></header><div className="form-grid"><label>状态<select value={current.status} onChange={e=>update(current.id,{status:e.target.value as Status})}>{statuses.map(s=><option key={s}>{s}</option>)}</select></label><label>发布日期<input type="date" value={current.date} onChange={e=>update(current.id,{date:e.target.value})}/></label><label>协作方<input value={current.owner} onChange={e=>update(current.id,{owner:e.target.value})}/></label><label>内容类型<select value={current.kind} onChange={e=>update(current.id,{kind:e.target.value as Kind})}>{["版本更新","新模型","日常内容","视频设计"].map(k=><option key={k}>{k}</option>)}</select></label></div><label className="full-label">任务标题<input value={current.title} onChange={e=>update(current.id,{title:e.target.value})}/></label><label className="full-label">原始信息<textarea value={current.raw} onChange={e=>update(current.id,{raw:e.target.value})}/></label><div className="drawer-actions"><button className="danger" onClick={()=>{setTasks(v=>v.filter(t=>t.id!==current.id));setSelected(null);}}>删除</button><div><button onClick={()=>move(current.id,-1)}>← 上一步</button><button className="solid" onClick={()=>copyCodex(current)}>复制给 Codex</button><button onClick={()=>move(current.id,1)}>下一步 →</button></div></div></aside></div>}
    {showNew&&<div className="overlay" onClick={()=>setShowNew(false)}><section className="new-modal" onClick={e=>e.stopPropagation()}><header><div><small>SMART INBOX</small><h2>创建新任务</h2></div><button onClick={()=>setShowNew(false)}>×</button></header><p>直接粘贴你收到的原始信息。系统会识别任务类型并保留完整原文。</p><textarea autoFocus value={inbox} onChange={e=>setInbox(e.target.value)} placeholder="Changelog、模型上线通知、内容想法或视频需求…"/><div><button onClick={()=>setShowNew(false)}>取消</button><button className="solid" onClick={()=>createFromText(inbox)}>识别并创建</button></div></section></div>}
    {toast&&<div className="toast">✓ {toast}</div>}
  </main>
}
