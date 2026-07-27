# Changelog

本项目使用 `MAJOR.MINOR.PATCH` 版本格式。功能完成并通过检查后记录在这里。

## 0.4.1 - 2026-07-27

### Changed

- AI Prompt 将每个启用平台最近两条可验证的 Verdent 官方内容提升为最高优先级的语气与格式参考
- 新增 `Recent-post calibration`，要求记录样本、内容类型和实际采用的表达特征
- X、LinkedIn、Reddit 更新为 2026-07-27 的近期官方内容基线
- Discord、Instagram、TikTok 无法公开核对两条样本时必须标记 `VOICE SAMPLE MISSING`，不再猜测账号历史风格
- Verdent Social Growth Skill 升级到 `1.1`

## 0.4.0 - 2026-07-27

### Added

- 七类内容任务，以及标准流程 / 紧急流程切换
- 任务模板保存、复用、编辑和删除
- 列表、流程看板和日程视图
- 北京时间默认、任务时区选择和 Markdown 多时区导出
- 30 天任务回收站
- 直接生成六平台英文初稿，以及可见、可复制、可下载的 AI Prompt
- 新建任务时上传文本、截图、图片、视频或办公文件
- 复盘阶段实时汇总曝光、互动、互动率和平台对比

### Fixed

- `ready` 被误识别为 `EA`
- “No partner campaign” 和 “No confidential information” 被反向误判
- 官方文档依据和目标日期 / 时间未自动填入
- 剪贴板不可用时触发未处理错误
- 超过 1 MB 的素材上传被运行时拦截

### Changed

- 进入系统的资料默认按已确认处理，并移除非必要的 PM 审批门禁
- 素材改用 512 KB 分片上传，启用平台发布必须记录最终 URL

## 0.3.0 - 2026-07-27

### Added

- D1 云端工作区，保存任务、账号、文案、发布记录和复盘数据
- 旧版 `localStorage` 数据首次打开时自动迁移到云端
- 多设备修订号检查，避免旧页面静默覆盖新数据
- R2 任务素材库，支持图片、视频、文档和设计文件
- 素材元数据、分类、上传人和任务关联

### Changed

- 浏览器存储降级为非权威临时缓存
- 工作区状态明确显示云端保存、保存中、离线或版本冲突

### Pending

- 飞书组织登录与成员权限需要 Verdent 飞书应用凭证后接入
- `growth.verdent.ai` 需要在云端版本稳定后配置 DNS

## 0.2.0 - 2026-07-22

### Added

- 六平台社媒账号目录及每任务发布账号选择
- Instagram 和 TikTok 内容与发布流程
- 自有 `verdent-social-growth` Skill、平台规范、制作 Brief 和 QA 规则
- Skill / SOP 页面与一键复制 Codex 任务
- 未确认上线表达和待确认占位符扫描
- GitHub CI、PR 模板和依赖更新配置

### Changed

- 正式公告与观点内容采用不同的内容策略
- Skill 使用项目相对路径，不依赖个人电脑目录
- README 改为完整的使用、数据和维护入口

### Removed

- 对前同事 Writer Skill、飞书脚本和个人绝对路径的运行依赖
- 所有内容必须争议化、必须补数字和固定 hashtag 数量等规则

## 0.1.0 - 2026-07-21

### Added

- 本地任务工作台
- 收集、核实、制作、审核、发布、复盘六阶段流程
- Brief 自动识别、内容快照、JSON 备份和基础风险扫描
