<div align="center">
<img src="./apps/mobile/assets/images/icon_large.png" alt="logo" width="50" />
<h1>BBPlayer for iOS 🍏</h1>

一款使用 React Native 构建的本地优先的 Bilibili 音频播放器。<br>
更轻量 & 舒服的听歌体验，远离臃肿卡顿的 Bilibili 客户端。

[![GitHub Release](https://img.shields.io/github/v/release/dusttrustrs/BBPlayer-iOS-?style=flat-square&color=blue)](https://github.com/dusttrustrs/BBPlayer-iOS-/releases)
![Platform - iOS](https://img.shields.io/badge/Platform-iOS%2016%2B-lightgrey?style=flat-square&logo=apple)
![React Native](https://img.shields.io/badge/React%20Native-20232A?style=flat-square&logo=react&logoColor=sky)
[![Upstream](https://img.shields.io/badge/Upstream-bbplayer--app%2FBBPlayer-purple?style=flat-square)](https://github.com/bbplayer-app/BBPlayer)
[![Website](https://img.shields.io/badge/Website-bbplayer.roitium.com-blue?style=flat-square)](https://bbplayer.roitium.com)

</div>

---

> 📌 **项目说明**：本项目基于官方开源项目 [bbplayer-app/BBPlayer](https://github.com/bbplayer-app/BBPlayer) 进行维护与构建，专注于 **iOS 平台的兼容性修复、启动稳定性优化以及持续的 IPA 构建打包**。

**[前往官网查看更多详情和上手指南 ➔](https://bbplayer.roitium.com)**

---

## 🍏 iOS 版本支持与安装

原版项目重心在 Android 端，iOS 原生代码长期未维护且存在多处启动崩溃。本项目已对 iOS 平台完成以下重点修复与适配：

### 🛠️ iOS 专享修复特性
- ✅ **修复 Firebase 校验崩溃**：修正 iOS 原生 `GoogleService-Info.plist` 参数格式，彻底解决应用启动 `0.1s` 秒退（`SIGABRT`）问题。
- ✅ **离线稳定性优化**：屏蔽无服务端配置下的 `expo-updates` 强行崩溃逻辑（`ErrorRecovery.crash()`）。
- ✅ **启动错误边界修复**：修复启动时 `Cannot read property 'ErrorBoundary' of undefined` 异常。
- ✅ **GitHub Actions 云端打包**：集成完整的 CI/CD 流水线，自动化构建导出未签名 `.ipa` 安装包。

### 📲 下载与安装指南

请前往项目的 **[Releases 页面](https://github.com/dusttrustrs/BBPlayer-iOS-/releases)** 获取最新构建的 `BBPlayer.ipa`：

| 安装方式 | 适用场景 | 说明 |
| :--- | :--- | :--- |
| **TrollStore（巨魔）** | iOS 14.0 - 17.0（支持设备） | **最推荐**，永久有效、免越狱免续签 |
| **Sideloadly / AltStore** | 任意 iOS 版本 | 适合未越狱真机，配合个人 Apple ID 签名（7 天需续签） |
| **企业/个人自签证书** | 配合各种签名工具使用 | 导入自签名证书即可直接安装使用 |

> ⚠️ **iOS 16+ 提示**：安装后若打开提示“不受信任的开发者”或无法启动，请前往 iPhone **「设置」->「隐私与安全性」**，滑到最底部开启 **「开发者模式」** 并重启手机。

---

## 屏幕截图

|                  首页                  |                   播放器                   |                    播放列表                    |                    歌词页                    |                    库页面                    |
| :------------------------------------: | :----------------------------------------: | :--------------------------------------------
