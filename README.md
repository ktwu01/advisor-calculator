# 这个导师坑不坑·测算版

> 科学评估导师综合实力，助你明智选择学术道路

![Banner](assets/Banner-advisor-calculator.png)

[![Website](https://img.shields.io/website?url=https%3A//ktwu01.github.io/advisor-calculator)](https://ktwu01.github.io/advisor-calculator/) 
[![GitHub stars](https://img.shields.io/github/stars/ktwu01/advisor-calculator)](https://github.com/ktwu01/advisor-calculator) 
[![GitHub forks](https://img.shields.io/github/forks/ktwu01/advisor-calculator)](https://github.com/ktwu01/advisor-calculator/fork) 
![License](https://img.shields.io/badge/License-CC%20BY--NC--ND%204.0-lightgrey.svg)

[![English](https://img.shields.io/badge/lang-English-blue.svg)](README.md) [![中文](https://img.shields.io/badge/lang-中文-brown.svg)](README.CN.md)

---

## 🎯 产品特色

### 🔍 多维度评估体系
- **人品评估**: 导师人品、沟通能力、管理风格
- **学术能力**: 科研实力、学术声誉、发展前景  
- **工作环境**: 工作生活平衡、实验室条件、地理位置
- **职业发展**: 毕业难易度、实习政策、薪资待遇

### 🎚️ 智能权重系统
- **硕士推荐**: 学校60% | 导师40%
- **博士推荐**: 学校30% | 导师70%  
- **博士后推荐**: 学校20% | 导师80%
- 支持手动调节权重配置

### 📊 详细评估报告
- 分项得分可视化（人品分、学术分、待遇分、前景分）
- 优势与风险分析
- 个性化建议
- 可折叠详细分析报告

### 💾 数据管理
- 导入/导出功能，支持数据备份
- 本地存储，隐私安全
- 导师昵称系统，便于管理

### 🎨 用户体验
- 直观的描述性评分（如"996/007"而非数字1-5）
- 响应式设计，支持多设备
- 实时计算和对比

## 🚀 快速开始

### 环境要求
- Node.js 16+ 
- npm/yarn/pnpm/bun

### 安装运行

```bash
# 克隆项目
git clone https://github.com/ktwu01/advisor-calculator.git
cd advisor-calculator

# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

访问 [http://localhost:3000](http://localhost:3000) 查看应用

### 部署

```bash
# 构建生产版本
npm run build

# 启动生产服务器
npm start
```

## 📋 使用指南

1. **基本信息设置**: 选择导师性别、年龄段、头衔、学校等级
2. **攻读学位选择**: 选择硕士/博士/博士后，系统自动调整权重
3. **评价指标打分**: 使用描述性语言为各项指标评分
4. **权重调整**: 根据个人需求手动调节学校vs导师权重
5. **查看结果**: 获得综合评分和详细分析报告
6. **导出数据**: 保存评估数据以备后用

## 🛠️ 技术栈

- **框架**: Next.js 15 + TypeScript
- **UI库**: shadcn/ui (Radix UI + Tailwind CSS)
- **图标**: Lucide React
- **样式**: Tailwind CSS
- **开发工具**: ESLint + Biome

## 📦 项目结构

```
src/
├── app/
│   ├── page.tsx          # 主页面组件
│   ├── layout.tsx        # 应用布局
│   └── globals.css       # 全局样式
├── components/ui/        # UI组件库
└── lib/
    └── utils.ts          # 工具函数
```

## 🤝 贡献指南

1. Fork 本项目
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

## 📄 开源协议

本项目采用 [CC BY-NC-ND 4.0](https://creativecommons.org/licenses/by-nc-nd/4.0/) 协议。

## ⚠️ 免责声明

- 本工具仅供参考，请结合实际情况理性选择导师
- 数据仅保存在本地，不会上传到服务器
- 评估结果基于个人主观判断，不代表绝对准确性

## 🔗 相关链接

- [在线体验](https://ktwu01.github.io/advisor-calculator/)
- [问题反馈](https://github.com/ktwu01/advisor-calculator/issues)
- [功能建议](https://github.com/ktwu01/advisor-calculator/discussions)

---

**如果这个项目对你有帮助，请给个 ⭐ Star 支持一下！**