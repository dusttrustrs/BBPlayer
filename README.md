<div align="center">
<img src="./apps/mobile/assets/images/icon_large.png" alt="logo" width="50" />
<h1>BBPlayer for iOS 🍏</h1>

一款使用 React Native 构建的本地优先的 Bilibili 音频播放器。<br>
更轻量 & 舒服的听歌体验，远离臃肿卡顿的 Bilibili 客户端。

[![GitHub Release](https://img.shields.io/github/v/release/dusttrustrs/BBPlayer-iOS-?style=flat-square&color=blue)](https://github.com/dusttrustrs/BBPlayer-iOS-/releases)
![Xcode](https://img.shields.io/badge/Xcode-26.6-blue?style=flat-square&logo=xcode&logoColor=white)
![Tested on](https://img.shields.io/badge/Tested%20on-iPhone%2017%20%7C%20iOS%2027.0-brightgreen?style=flat-square&logo=apple)
![React Native](https://img.shields.io/badge/React%20Native-20232A?style=flat-square&logo=react&logoColor=sky)
[![Upstream](https://img.shields.io/badge/Upstream-bbplayer--app%2FBBPlayer-purple?style=flat-square)](https://github.com/bbplayer-app/BBPlayer)
[![Website](https://img.shields.io/badge/Website-bbplayer.roitium.com-blue?style=flat-square)](https://bbplayer.roitium.com)

</div>

---

> 📌 **项目说明**：本项目基于官方开源项目 [bbplayer-app/BBPlayer](https://github.com/bbplayer-app/BBPlayer) 进行维护与构建，专注于 **iOS 平台的兼容性修复、启动稳定性优化以及持续的 IPA 构建打包**。

**[前往官网查看更多详情和上手指南 ➔](https://bbplayer.roitium.com)**

---

## 屏幕截图 (iOS 真机实测)

| 欢迎页面 | 登录与模式选择 | 搜索页 | 音乐库 | “我的”页面 |
| :---: | :---: | :---: | :---: | :---: |
| ![欢迎页面](./assets/screenshots/ios-welcome.jpg) | ![登录选择](./assets/screenshots/ios-login.jpg) | ![搜索](./assets/screenshots/ios-search.jpg) | ![音乐库](./assets/screenshots/ios-library.jpg) | ![我的](./assets/screenshots/ios-me.jpg) |

---

## 🍏 iOS 版本支持与设备兼容性说明

本项目基于 **Xcode 26.6** 进行编译打包，并且**仅在 iPhone 17 (iOS 27.0) 设备上进行了实机测试，可正常流畅使用**。

> ⚠️ **兼容性提示（重要）**：
> - ❌ **已知不支持 iOS 16 系统设备安装**。
> - ❓ 其他 iOS、iPadOS 版本能否正常安装和运行，**请各位用户自行下载测试**！欢迎在 Issues 中反馈你的设备型号与系统版本兼容情况。

### 🛠️ iOS 专享修复特性
- ✅ **修复 Firebase 校验崩溃**：修正 iOS 原生 `GoogleService-Info.plist` 参数格式规范，彻底解决应用启动 `0.1s` 秒退（`SIGABRT`）问题。
- ✅ **离线稳定性优化**：关闭未配置服务端时的 `expo-updates` 强行崩溃机制（`ErrorRecovery.crash()`），保障离线启动正常。
- ✅ **启动错误边界修复**：排查并修复启动时 `Cannot read property 'ErrorBoundary' of undefined` 异常。
- ✅ **GitHub Actions 云端打包**：集成完整的 CI/CD 流水线，自动化构建导出未签名 `.ipa` 安装包。

### 📲 下载与安装指南

请前往项目的 **[Releases 页面](https://github.com/dusttrustrs/BBPlayer-iOS-/releases)** 获取最新构建的 `BBPlayer.ipa`：

| 安装方式 | 适用场景 | 说明 |
| :--- | :--- | :--- |
| **Sideloadly / AltStore** | 未越狱真机 | 配合个人 Apple ID 签名安装（7 天需续签） |
| **企业/个人自签证书** | 任意支持的设备 | 配合全能签、牛蛙助手等自签工具直接安装 |
| **TrollStore（巨魔）** | 支持巨魔的特定系统版本 | 永久有效、免越狱免续签 |

> 💡 **iOS 开发者模式提示**：安装后若打开提示“不受信任的开发者”或无法启动，请前往 iPhone **「设置」->「隐私与安全性」**，滑到最底部开启 **「开发者模式」** 并重启设备。

---

## 主要功能

### 核心播放体验

- **Bilibili 登录**: 支持通过**扫码**、**手机号（短信验证码）**或手动设置 Cookie 登录。
- **播放源**: 自由添加本地播放列表，登录账号后也可直接访问账号内收藏夹、订阅合集等，兼顾快速与方便。
- **导入外部歌单**: 支持从 **网易云音乐** 和 **QQ 音乐** 的歌单自动匹配到 B 站视频并保存为播放列表。
- **全功能播放器**: 提供播放/暂停、循环、随机、播放队列、响度均衡、断点续播、启动自动播放等功能。
- **搜索**: 智能搜索，支持 BV/AV 号、b23.tv 短链解析。同时提供收藏夹和本地播放列表内搜索。

### 歌词系统

- **支持 SPL**: 基于 [SPL 规范](https://bbplayer.roitium.com/SPL)，支持**逐字进度**、**罗马音注音**及**翻译歌词**展示。
- **智能获取**: 支持自动匹配歌词（网易云/QQ 音乐/酷狗音乐），并支持手动搜索、粘贴 LRC/SPL 文本及偏移量调整。
- **多样展示**: 支持桌面歌词（悬浮窗）、状态栏歌词。

### 主题系统

可以在软件内搜索并应用**任意** B 站主题装扮，支持：

- 导航栏
- 开屏动画
- 进度条拖拽图标
- 点赞动画
- 页面头部背景
- 头像框

### 其他特性

- **下载与导出**: 支持缓存歌曲并离线播放，提供简单实用的下载管理。同时支持将已缓存的歌曲导出为带封面、元数据、内嵌歌词的 `.m4a` 文件到本地存储。
- **UI**: 支持浅色/深色模式，UI 深度适配 Material Design 3 且支持莫奈取色。
- **实用工具**: 提供定时关闭、播放历史统计（排行榜）等功能。

还有更多功能和惊喜，欢迎到 [官网](https://bbplayer.roitium.com) 查看！

## 技术栈

- **框架**: React Native, Expo
- **状态管理**: Zustand
- **数据请求**: React Query
- **UI**: Material Design 3 (React Native Paper + ExpoUI)
- **播放库**: [@bbplayer/orpheus](./packages/orpheus)
- **ORM**: Drizzle ORM

## 项目结构 (Monorepo)

- **[apps/mobile](./apps/mobile)**: BBPlayer 移动端应用核心代码。
- **[apps/backend](./apps/backend)**: 后端服务，提供歌单共享与软件更新查询（Cloudflare Worker）。
- **[apps/docs](./apps/docs)**: 项目文档站点。
- **[apps/update-publisher](./apps/update-publisher)**: 用于发布更新的工具。
- **[packages/](./packages)**: 共享库与工具包。
  - **[@bbplayer/splash](./packages/splash)**: 歌词解析与转换核心库。
  - **[@bbplayer/eslint-plugin](./packages/eslint-plugin)**: BBPlayer 专用 lint 规则。
  - **[@bbplayer/orpheus](./packages/orpheus)**: 音频播放引擎。
  - **[@bbplayer/logs](./packages/logs)**: 日志库。
  - **[@bbplayer/image-theme-colors](./packages/image-theme-colors)**: 封面颜色提取工具。
  - **[@bbplayer/native](./packages/native)**: BBPlayer 原生能力集成模块。
  - **[@bbplayer/heatmap](./packages/heatmap)**: 基于 SVG 的日期热力图组件。
  - **[expo-wavy-slider](./packages/expo-wavy-slider)**: Jetpack Compose WavySlider 的 Expo 模块封装。

## 隐私与数据统计

为了持续改进 BBPlayer，应用内集成了一套轻量级的匿名数据收集系统（包含 Firebase Analytics 和 Sentry）。

### 我们收集什么？

1. **使用数据**：功能使用频率、播放会话时长等。
2. **崩溃报告**：应用崩溃时的堆栈信息，帮助我们修复 Bug。

### 隐私承诺

- **匿名**：所有数据均**不包含个人身份信息**。
- **透明**：我们不会收集任何与账号隐私相关的信息（如 Cookie 内容、浏览历史明细等）。所有统计代码均开源可见。
- **控制权**：你可以随时在「设置 -> 通用设置」中关闭「分享数据（崩溃报告 & 匿名统计）」开关，完全停止数据上传。

## 捐赠支持（原作者）

如果你觉得 BBPlayer 对你有所帮助，欢迎考虑捐赠支持原作者团队，所有捐赠都将用于让 Roitium 吃顿疯狂星期四或是买一部 GalGame！

<table>
<tr>
<td align="center">
<details>
<summary>微信支付</summary>
<br />
<img src="./apps/mobile/assets/images/wechat.png" alt="WeChat Donation" width="200" />
</details>
</td>
<td align="center">
<details>
<summary>支付宝</summary>
<br />
<img src="./apps/mobile/assets/images/alipay.jpg" alt="Alipay Donation" width="200" />
</details>
</td>
</tr>
</table>

## 感谢与致谢

- 感谢上游项目 [bbplayer-app/BBPlayer](https://github.com/bbplayer-app/BBPlayer) 及其创作者团队带来的优秀设计！
- 以及开发过程中提供灵感的前辈们：
  - [AzusaPlayer](https://github.com/lovegaoshi/azusa-player-mobile)
  - [BiliSound](https://github.com/bilisound/client-mobile)
  - [Salt Player](https://github.com/Moriafly/SaltPlayerSource)
  - [Spotify](https://spotify.com)
  - [Bilibili](https://www.bilibili.com/)

## 开源许可

本项目采用 MIT 许可。
