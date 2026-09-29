# oc-lark 展示页

**在线地址（渲染版）** → <https://wyili.github.io/oc-web/oc-lark/>

oc-lark 的产品官网（挂载于 oc-web 站点 `/oc-lark/` 路径），GitHub Pages 静态落地页。当前为第六轮内容同步版（`web-refresh-06`，2026-09，与 oc-lark v0.5.6 对齐），使用单文件 `index.html`，以深色终端 Hero、分层蓝灰主体、紧凑导航、中心化首屏、清晰 section 标题和规律卡片网格建立克制的产品官网节奏。页面包含版本与许可证信息、终端展示、核心特性、架构流程、CLI/飞书命令（与真实命令集对齐）、配置指南（关键环境变量与发布状态）、效果展示、本地控制台、FAQ 与页脚；不复制参考站点的品牌或原文。本页源码位于本仓库 `oc-lark/` 目录。

## 产品定位

oc-lark 是独立 Python 服务，连接飞书与原生 `opencode serve`。它不是 OpenCode 的替代品，也不是云托管平台；OpenCode Server 继续负责模型、工具与会话执行。已实现能力包括：

- 飞书 WebSocket 消息接收；私聊、群聊、topic/thread 上下文；
- OpenCode SSE 会话事件与实时输出回传；
- 卡片审批、选项与问询；`/stop` 打断；
- 图片消息、会话关联、CLI 服务管理（setup / start / doctor / logs / systemd 自启）；
- 持久 bash（`!` 前缀）、模型/Agent 切换、会话压缩与 fork；
- 本地 Web 控制台的状态检查与通知入口。

当前不接入多 Agent、Nexus 或云托管能力。页面中的聊天、终端、控制台和审批内容是前端展示演示，不代表真实后端返回值。页面展示 MIT License 信息；服务版本以资产声明为准（当前 v0.5.6）。当前提供资产开发版，正式版仍在规划中，真实飞书环境联调持续进行。

## GitHub Pages

仓库地址：<https://github.com/Wyili/oc-web>

页面地址：<https://wyili.github.io/oc-web/oc-lark/>

GitHub Pages 只静态托管 HTML/CSS/JavaScript，不会启动 Python 后端。页面无需安装前端依赖，可直接部署或自托管；单文件资源使用相对/内联方式，不依赖站点根路径，适配 `/oc-web/oc-lark/` base path。

## 本地控制台与安全边界

页面保留 `API_BASE_URL` 和可选 Bearer token 输入，可通过浏览器运行时请求你自己的 `/api/status` 接口。输入值仅保留在当前页面内存中，刷新后清空；页面不会写入凭证。

使用本地控制台时：

- API 必须由你控制，并使用 HTTPS（本地开发可使用 localhost）；
- 后端自行实现认证、授权、CORS、速率限制和输入校验；
- token 应采用最小权限、短有效期，避免在公共电脑输入长期凭证；
- 飞书凭证、OpenCode 凭证和服务端密钥只能保存在后端环境变量或安全配置中；
- 不要把真实 token、内网地址或任何凭证写入页面或提交到仓库，也不要直接暴露 OpenCode Server。

## 本地开发

```bash
python -m http.server 8080
```

访问 <http://localhost:8080/>。修改后可用浏览器开发者工具检查响应式布局、滚动导航、移动菜单、命令复制、审批演示、FAQ 折叠和 API 状态检查交互。

项目不新增依赖，页面由单文件 HTML/CSS/JS 构成。
