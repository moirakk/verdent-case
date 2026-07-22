"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type Kind = "版本更新" | "新模型" | "日常内容";
type Status = "收件箱" | "待补充" | "撰写中" | "待审核" | "已排期" | "已发布";
type DraftKey = "x" | "discord" | "linkedin" | "reddit";
type WriterMode = "Release Announcement" | "V-Thoughts" | "V-Tips" | "V-Playground";
type Brief = { subject:string; launch:string; headline:string; features:string; scenarios:string; access:string; assets:string; confidential:string; missing:string[] };
type Snapshot = { at:string; drafts:Record<DraftKey,string>; poster:string };
type Task = { id:string; title:string; kind:Kind; status:Status; date:string; source:string; notes:string; writerMode:WriterMode; brief:Brief; drafts:Record<DraftKey,string>; poster:string; checks:Record<string,boolean>; snapshots:Snapshot[]; updatedAt:string };

const statusList:Status[]=["收件箱","待补充","撰写中","待审核","已排期","已发布"];
const platformNames:Record<DraftKey,string>={x:"X / Twitter",discord:"Discord",linkedin:"LinkedIn",reddit:"Reddit"};
const baseChecks=["产品名称、版本号或模型名称准确","正式上线时间已确认","暂不能公开的信息已移除","能力和性能表述有依据","链接、@账号与发布时间正确","PM 已完成最终信息确认"];

function recognizeBrief(source:string,kind:Kind):Brief{
  const lines=source.split(/\n+/).map(x=>x.replace(/^[-*•\d.、\s]+/,"").trim()).filter(Boolean);
  const subject=source.match(/(?:v?\d+\.\d+(?:\.\d+)?|GPT[-\s\w.]+|Claude[-\s\w.]+|Kimi[-\s\w.]+|Gemini[-\s\w.]+)/i)?.[0]?.trim()||"";
  const launch=source.match(/(?:20\d{2}[-/.年]\d{1,2}[-/.月]\d{1,2}日?(?:\s+\d{1,2}:\d{2})?|周[一二三四五六日天](?:\s*\d{1,2}:\d{2})?|\d{1,2}:\d{2})/i)?.[0]||"";
  const access=source.match(/(?:Limited Preview|Early Access|EA|Limited-time Free Access|限时免费|灰度|逐步开放|正式上线)/i)?.[0]||"";
  const featureLines=lines.filter(x=>/新增|支持|优化|改进|提升|introduc|support|improv|add|enable|better|faster/i.test(x)).slice(0,5);
  const scenarioLines=lines.filter(x=>/适合|场景|用于|工作流|use case|workflow|builders|coding|automation/i.test(x)).slice(0,4);
  const secretLines=lines.filter(x=>/不能公开|暂不公开|保密|confidential|embargo|hide|隐藏/i.test(x));
  const assetBits=[/截图|screenshot/i.test(source)?"产品截图":"",/录屏|video|demo/i.test(source)?"演示视频":"",/logo|视觉素材/i.test(source)?"Logo / 视觉素材":""].filter(Boolean).join("、");
  const brief:Brief={subject,launch,headline:featureLines[0]||lines[0]||"",features:featureLines.join("\n"),scenarios:scenarioLines.join("\n"),access,assets:assetBits,confidential:secretLines.join("\n"),missing:[]};
  if(!brief.subject)brief.missing.push(kind==="新模型"?"模型与厂商名称":"版本号或主题名称");
  if(!brief.launch)brief.missing.push("正式上线时间");
  if(!brief.features)brief.missing.push("核心功能或能力");
  if(!brief.scenarios)brief.missing.push("用户使用场景");
  if(!brief.assets)brief.missing.push("截图、录屏或视觉素材");
  if(!brief.confidential)brief.missing.push("不可公开信息确认");
  return brief;
}

function blankTask(source=""):Task{
  const lower=source.toLowerCase();
  const kind:Kind=/model|模型|gpt|claude|kimi|gemini/.test(lower)?"新模型":/changelog|version|版本|release|v\d/.test(lower)?"版本更新":"日常内容";
  const match=source.match(/(?:v?\d+\.\d+(?:\.\d+)?|GPT[-\s\w.]+|Claude[-\s\w.]+|Kimi[-\s\w.]+)/i)?.[0]?.trim();
  return {id:crypto.randomUUID(),title:match?`${match} ${kind==="新模型"?"上线":"发布"}`:"未命名任务",kind,status:"收件箱",date:"",source,notes:"",writerMode:kind==="日常内容"?"V-Tips":"Release Announcement",brief:recognizeBrief(source,kind),drafts:{x:"",discord:"",linkedin:"",reddit:""},poster:"",checks:Object.fromEntries(baseChecks.map(x=>[x,false])),snapshots:[],updatedAt:new Date().toISOString()};
}

export default function Home(){
  const [tasks,setTasks]=useState<Task[]>([]);
  const [selectedId,setSelectedId]=useState<string|null>(null);
  const [tab,setTab]=useState<"source"|"brief"|"drafts"|"poster"|"checklist"|"history">("source");
  const [platform,setPlatform]=useState<DraftKey>("x");
  const [query,setQuery]=useState("");
  const [filter,setFilter]=useState<Status|"全部">("全部");
  const [newOpen,setNewOpen]=useState(false);
  const [newSource,setNewSource]=useState("");
  const [toast,setToast]=useState("");
  const importRef=useRef<HTMLInputElement>(null);

  useEffect(()=>{const saved=localStorage.getItem("verdent-local-workspace");if(saved){try{const data=(JSON.parse(saved) as Task[]).map(t=>({...t,writerMode:t.writerMode||(t.kind==="日常内容"?"V-Tips":"Release Announcement"),brief:t.brief||recognizeBrief(t.source,t.kind)}));setTasks(data);setSelectedId(data[0]?.id||null)}catch{}}},[]);
  useEffect(()=>{localStorage.setItem("verdent-local-workspace",JSON.stringify(tasks));},[tasks]);
  const current=tasks.find(x=>x.id===selectedId)||null;
  const visible=useMemo(()=>tasks.filter(t=>(filter==="全部"||t.status===filter)&&`${t.title}${t.source}`.toLowerCase().includes(query.toLowerCase())),[tasks,filter,query]);
  const say=(text:string)=>{setToast(text);setTimeout(()=>setToast(""),2600)};
  const update=(patch:Partial<Task>)=>{if(!current)return;setTasks(all=>all.map(t=>t.id===current.id?{...t,...patch,updatedAt:new Date().toISOString()}:t));};
  const updateDraft=(key:DraftKey,value:string)=>{if(!current)return;update({drafts:{...current.drafts,[key]:value}})};
  const updateBrief=(key:keyof Brief,value:string|string[])=>{if(!current)return;update({brief:{...current.brief,[key]:value}})};

  function createTask(){const task=blankTask(newSource.trim());setTasks(x=>[task,...x]);setSelectedId(task.id);setTab("source");setNewSource("");setNewOpen(false);say("任务已创建并自动保存");}
  function remove(){if(!current)return;const rest=tasks.filter(t=>t.id!==current.id);setTasks(rest);setSelectedId(rest[0]?.id||null);say("任务已删除");}
  function snapshot(){if(!current)return;const snap:Snapshot={at:new Date().toISOString(),drafts:{...current.drafts},poster:current.poster};update({snapshots:[snap,...current.snapshots]});say("已保存内容快照");}
  function restore(s:Snapshot){update({drafts:{...s.drafts},poster:s.poster});say("已恢复该版本");}
  function exportBackup(){const blob=new Blob([JSON.stringify(tasks,null,2)],{type:"application/json"});download(blob,`verdent-backup-${new Date().toISOString().slice(0,10)}.json`);}
  function exportMarkdown(){if(!current)return;const md=`# ${current.title}\n\n- 类型：${current.kind}\n- 状态：${current.status}\n- 发布日期：${current.date||"待定"}\n\n## 原始资料\n\n${current.source}\n\n## X / Twitter\n\n${current.drafts.x}\n\n## Discord\n\n${current.drafts.discord}\n\n## LinkedIn\n\n${current.drafts.linkedin}\n\n## Reddit\n\n${current.drafts.reddit}\n\n## 海报 Brief\n\n${current.poster}\n\n## 备注\n\n${current.notes}`;download(new Blob([md],{type:"text/markdown"}),`${safeName(current.title)}.md`);}
  function download(blob:Blob,name:string){const url=URL.createObjectURL(blob);const a=document.createElement("a");a.href=url;a.download=name;a.click();URL.revokeObjectURL(url);}
  function safeName(v:string){return v.replace(/[\\/:*?"<>|]/g,"-")||"verdent-task"}
  async function copyToCodex(){if(!current)return;const b=current.brief;const text=`请使用同事交接的 Verdent Writer Skill 处理此任务。\nSkill 文件：/Users/a1234/Downloads/verdent-x-writer/SKILL.md\n\n工作模式：${current.writerMode}\n任务：${current.title}\n类型：${current.kind}\n目标发布日期：${current.date||"待确认"}\n内部备注：${current.notes||"无"}\n\n【自动识别 Brief】\n主体：${b.subject||"待确认"}\n上线时间：${b.launch||"待确认"}\n核心传播点：${b.headline||"待确认"}\n功能/能力：\n${b.features||"待确认"}\n使用场景：\n${b.scenarios||"待确认"}\n开放状态：${b.access||"待确认"}\n素材：${b.assets||"待确认"}\n不可公开信息：${b.confidential||"待确认"}\n缺失信息：${b.missing.join("、")||"无"}\n\n【原始资料】\n${current.source||"暂无"}\n\n执行要求：\n1. 先指出事实缺口、公开风险和必须确认的问题。信息不足时不要编造。\n2. 对外文案全部使用英文。\n3. 按 Skill 的平台规范生成 X、Discord、LinkedIn、Reddit 文案。\n4. 同时生成海报 Brief。\n5. 执行 Skill 的自检，尤其检查夸大表述、隐私数据暗示、破折号和禁用营销词。\n6. 发布 CTA 链接到 https://www.verdent.ai/，但不要在每个平台机械重复。`;await navigator.clipboard.writeText(text);say("Writer Skill 指令已复制");}
  function importFile(file:File){const reader=new FileReader();reader.onload=()=>{try{const data=JSON.parse(String(reader.result));if(!Array.isArray(data))throw new Error();setTasks(data);setSelectedId(data[0]?.id||null);say("备份已恢复")}catch{say("无法读取该备份文件")}};reader.readAsText(file)}

  return <main className="app">
    <aside className="rail">
      <header><span>V</span><div><b>Verdent</b><small>Social Workspace</small></div><a href="https://www.verdent.ai/" target="_blank" rel="noreferrer">官网 ↗</a></header>
      <button className="new-btn" onClick={()=>setNewOpen(true)}>＋ 新建内容任务</button>
      <label className="search">⌕<input value={query} onChange={e=>setQuery(e.target.value)} placeholder="搜索任务"/></label>
      <div className="filters">{(["全部",...statusList] as const).map(s=><button key={s} className={filter===s?"on":""} onClick={()=>setFilter(s)}><span>{s}</span><em>{s==="全部"?tasks.length:tasks.filter(t=>t.status===s).length}</em></button>)}</div>
      <div className="task-list">{visible.map(t=><button key={t.id} onClick={()=>setSelectedId(t.id)} className={selectedId===t.id?"active":""}><div><span className={`type ${t.kind}`}>{t.kind}</span><time>{t.date?`${t.date.slice(5)}`:"未排期"}</time></div><b>{t.title}</b><p>{t.source||"尚未添加原始资料"}</p><small>{t.status} · {new Date(t.updatedAt).toLocaleDateString("zh-CN")}</small></button>)}{!visible.length&&<div className="no-tasks">没有匹配的任务</div>}</div>
      <footer><button onClick={exportBackup}>导出备份</button><button onClick={()=>importRef.current?.click()}>恢复备份</button><input ref={importRef} hidden type="file" accept="application/json" onChange={e=>e.target.files?.[0]&&importFile(e.target.files[0])}/><small>数据仅保存在当前浏览器</small></footer>
    </aside>

    <section className="workspace">{current?<>
      <header className="task-header"><div><div className="crumb">内容工作区 / {current.kind}</div><input className="title-input" value={current.title} onChange={e=>update({title:e.target.value})}/></div><div className="header-actions"><span className="saved">✓ 已自动保存</span><button onClick={snapshot}>保存快照</button><button onClick={exportMarkdown}>导出 Markdown</button><button className="primary" onClick={copyToCodex}>生成 Writer Skill 指令</button></div></header>
      <section className="metadata"><label>内容类型<select value={current.kind} onChange={e=>update({kind:e.target.value as Kind})}><option>版本更新</option><option>新模型</option><option>日常内容</option></select></label><label>Writer 模式<select value={current.writerMode} onChange={e=>update({writerMode:e.target.value as WriterMode})}><option>Release Announcement</option><option>V-Thoughts</option><option>V-Tips</option><option>V-Playground</option></select></label><label>当前状态<select value={current.status} onChange={e=>update({status:e.target.value as Status})}>{statusList.map(s=><option key={s}>{s}</option>)}</select></label><label>目标发布日期<input type="date" value={current.date} onChange={e=>update({date:e.target.value})}/></label><label>内部备注<input value={current.notes} onChange={e=>update({notes:e.target.value})} placeholder="审核人、风险或待确认事项"/></label></section>
      <nav className="tabs"><button className={tab==="source"?"active":""} onClick={()=>setTab("source")}>1 原始资料</button><button className={tab==="brief"?"active":""} onClick={()=>setTab("brief")}>2 自动 Brief <em>{current.brief.missing.length} 待确认</em></button><button className={tab==="drafts"?"active":""} onClick={()=>setTab("drafts")}>3 平台文案 <em>{Object.values(current.drafts).filter(Boolean).length}/4</em></button><button className={tab==="poster"?"active":""} onClick={()=>setTab("poster")}>4 海报 Brief</button><button className={tab==="checklist"?"active":""} onClick={()=>setTab("checklist")}>5 发布检查 <em>{Object.values(current.checks).filter(Boolean).length}/{baseChecks.length}</em></button><button className={tab==="history"?"active":""} onClick={()=>setTab("history")}>历史 <em>{current.snapshots.length}</em></button></nav>
      <div className="editor-area">
        {tab==="source"&&<section className="editor-card"><div className="section-title"><div><h2>原始资料</h2><p>粘贴 PM 提供的 Changelog、模型通知或其他背景信息。内容会自动保存。</p></div><div className="section-actions"><span>{current.source.length} 字</span><button onClick={()=>{update({brief:recognizeBrief(current.source,current.kind)});setTab("brief");say("Brief 已重新识别")}}>重新识别 Brief ↗</button></div></div><textarea className="main-editor" value={current.source} onChange={e=>update({source:e.target.value})} placeholder="把收到的原始信息完整粘贴到这里…"/><div className="source-help"><b>创建任务时会自动识别</b><span>版本或模型名称</span><span>核心功能与使用场景</span><span>正式上线时间</span><span>可公开边界</span><span>截图或演示视频</span></div></section>}
        {tab==="brief"&&<section className="editor-card"><div className="section-title"><div><h2>自动识别 Brief</h2><p>系统从原始资料中提取；请人工核对后再生成文案。</p></div><button onClick={()=>{update({brief:recognizeBrief(current.source,current.kind)});say("Brief 已重新识别")}}>重新识别</button></div>{current.brief.missing.length>0&&<div className="missing"><b>需要补充</b>{current.brief.missing.map(x=><span key={x}>{x}</span>)}</div>}<div className="brief-grid"><label>版本 / 模型 / 主题<input value={current.brief.subject} onChange={e=>updateBrief("subject",e.target.value)}/></label><label>正式上线时间<input value={current.brief.launch} onChange={e=>updateBrief("launch",e.target.value)}/></label><label className="wide">核心传播点<input value={current.brief.headline} onChange={e=>updateBrief("headline",e.target.value)}/></label><label className="wide">核心功能或能力<textarea value={current.brief.features} onChange={e=>updateBrief("features",e.target.value)}/></label><label className="wide">用户使用场景<textarea value={current.brief.scenarios} onChange={e=>updateBrief("scenarios",e.target.value)}/></label><label>开放状态<input value={current.brief.access} onChange={e=>updateBrief("access",e.target.value)}/></label><label>截图 / 视频 / Logo<input value={current.brief.assets} onChange={e=>updateBrief("assets",e.target.value)}/></label><label className="wide">不可公开或需要隐藏的信息<textarea value={current.brief.confidential} onChange={e=>updateBrief("confidential",e.target.value)}/></label></div><div className="brief-next"><span>核对完成后，生成 Writer Skill 指令并粘贴到 Codex。</span><button className="primary" onClick={copyToCodex}>生成 Writer Skill 指令</button></div></section>}
        {tab==="drafts"&&<section className="editor-card"><div className="platform-tabs">{(Object.keys(platformNames) as DraftKey[]).map(k=><button className={platform===k?"active":""} onClick={()=>setPlatform(k)} key={k}>{platformNames[k]}{current.drafts[k]&&<span>✓</span>}</button>)}</div><div className="section-title"><div><h2>{platformNames[platform]} 文案</h2><p>{platform==="x"?"简洁突出最值得关注的变化与用户价值。":platform==="discord"?"直接、亲切，说明用户现在能做什么。":platform==="linkedin"?"解释业务价值、场景和工作流变化。":"保持克制，说明具体更新、用法和改进背景。"}</p></div><button onClick={()=>navigator.clipboard.writeText(current.drafts[platform]).then(()=>say("文案已复制"))}>复制文案</button></div><textarea className="main-editor draft" value={current.drafts[platform]} onChange={e=>updateDraft(platform,e.target.value)} placeholder={`在这里粘贴或编辑 ${platformNames[platform]} 文案…`}/><div className="counter">{current.drafts[platform].length} 字符{platform==="x"&&` · ${current.drafts.x.length<=280?"符合 280 字符限制":"超过限制"}`}</div></section>}
        {tab==="poster"&&<section className="editor-card"><div className="section-title"><div><h2>海报 Brief</h2><p>整理给设计同学的最终信息，不放完整 Changelog。</p></div></div><textarea className="main-editor" value={current.poster} onChange={e=>update({poster:e.target.value})} placeholder={`版本号 / 模型名称：\n海报主标题：\n简短小字：\n重点功能：\n所需截图或素材：\n需要标注的开放状态：\n需要隐藏的信息：`}/></section>}
        {tab==="checklist"&&<section className="editor-card"><div className="section-title"><div><h2>发布前检查</h2><p>全部完成后再把任务状态改为“已排期”。</p></div><strong>{Math.round(Object.values(current.checks).filter(Boolean).length/baseChecks.length*100)}%</strong></div><div className="check-list">{baseChecks.map(item=><label key={item} className={current.checks[item]?"done":""}><input type="checkbox" checked={current.checks[item]||false} onChange={e=>update({checks:{...current.checks,[item]:e.target.checked}})}/><span>{item}</span></label>)}</div></section>}
        {tab==="history"&&<section className="editor-card"><div className="section-title"><div><h2>历史快照</h2><p>在大幅修改前保存快照，需要时可以恢复平台文案和海报 brief。</p></div><button onClick={snapshot}>＋ 保存当前快照</button></div><div className="history-list">{current.snapshots.map((s,i)=><div key={s.at}><span><b>版本 {current.snapshots.length-i}</b><small>{new Date(s.at).toLocaleString("zh-CN")}</small></span><em>{Object.values(s.drafts).filter(Boolean).length} 个平台文案</em><button onClick={()=>restore(s)}>恢复</button></div>)}{!current.snapshots.length&&<div className="empty-state">还没有历史快照</div>}</div></section>}
      </div>
      <footer className="danger-zone"><button onClick={remove}>删除此任务</button><span>最后更新：{new Date(current.updatedAt).toLocaleString("zh-CN")}</span></footer>
    </>:<div className="welcome-empty"><span>V</span><h1>Verdent Social Workspace</h1><p>创建第一项任务，开始整理产品更新、模型上线或日常内容。</p><button className="primary" onClick={()=>setNewOpen(true)}>＋ 创建第一项任务</button></div>}</section>

    {newOpen&&<div className="overlay" onClick={()=>setNewOpen(false)}><section className="modal" onClick={e=>e.stopPropagation()}><header><div><small>NEW CONTENT TASK</small><h2>粘贴你收到的原始资料</h2></div><button onClick={()=>setNewOpen(false)}>×</button></header><p>不用提前整理。系统会根据内容预判任务类型并保留完整原文。</p><textarea autoFocus value={newSource} onChange={e=>setNewSource(e.target.value)} placeholder="Changelog、模型上线通知或日常内容想法…"/><footer><button onClick={()=>setNewOpen(false)}>取消</button><button className="primary" onClick={createTask}>创建任务</button></footer></section></div>}
    {toast&&<div className="toast">✓ {toast}</div>}
  </main>
}
