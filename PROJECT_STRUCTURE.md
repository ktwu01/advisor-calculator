# Project Structure Documentation

## Advisor Calculator Repository Structure

```
advisor-calculator/
├── README.md, README.CN.md, LICENSE          # 项目文档
├── package.json, package-lock.json           # 依赖管理
├── next.config.js, tsconfig.json             # Next.js配置
├── tailwind.config.ts, postcss.config.mjs    # 样式配置
├── biome.json, eslint.config.mjs             # 代码规范
├── components.json                           # shadcn/ui配置
├── assets/
│   ├── Banner-advisor-calculator.png         # 项目横幅
│   └── todo.md                              # 开发记录
├── deploy/
│   └── netlify.toml                         # 部署配置
├── src/
│   ├── app/
│   │   ├── layout.tsx                       # 应用布局
│   │   ├── page.tsx                         # 主应用组件
│   │   ├── ClientBody.tsx                   # 客户端包装器
│   │   └── globals.css                      # 全局样式
│   ├── components/ui/                       # UI组件库
│   │   ├── badge.tsx, button.tsx, card.tsx
│   │   ├── collapsible.tsx                  # 可折叠组件
│   │   ├── input.tsx, label.tsx, select.tsx
│   │   ├── slider.tsx, tooltip.tsx
│   └── lib/
│       └── utils.ts                         # 工具函数
├── out/                                     # 构建输出
└── node_modules/                            # 依赖包
```

## 核心文件说明

### 主要组件
- **`src/app/page.tsx`** - 主应用组件，包含完整的导师评估逻辑
  - 20维度评价指标系统
  - 智能权重算法
  - 风险识别与分析算法
  - 数据导入导出功能

### UI组件库
- **`src/components/ui/`** - 完整的shadcn/ui组件集
  - 基础组件：Badge, Button, Card, Input, Label
  - 交互组件：Select, Slider, Tooltip
  - 高级组件：Collapsible（支持动画的可折叠面板）

### 配置文件
- **`tailwind.config.ts`** - Tailwind CSS配置，包含动画定义
- **`components.json`** - shadcn/ui组件库配置
- **`tsconfig.json`** - TypeScript配置

## 技术架构

### 前端技术栈
- **框架**: Next.js 15 + TypeScript
- **UI库**: shadcn/ui (Radix UI + Tailwind CSS)
- **图标**: Lucide React
- **样式**: Tailwind CSS
- **动画**: CSS动画 + Radix UI过渡效果

### 核心算法模块
1. **智能权重系统** (`getTitleMultiplier`, `getSchoolMultiplier`, `getGenderAgeMultiplier`)
2. **分项得分计算** (`calculateDetailedScores`)
3. **综合评分算法** (`calculateScore`)
4. **风险识别系统** (`getDetailedAnalysis`)
5. **数据管理** (`exportComparison`, `importComparison`)

### 状态管理
- React useState for component state
- localStorage for persistence
- Real-time calculation system

## 已实现功能

### ✅ 核心评估系统
- 20维度评价指标体系
- 智能权重算法（基于学位类型）
- 实时评分计算
- 分项得分可视化

### ✅ 智能分析系统
- 精准风险识别（检测所有<3分指标）
- 个性化优势分析（识别4-5分优秀表现）
- 针对性建议生成
- 可折叠详细分析报告

### ✅ 数据管理系统
- JSON格式导入/导出
- 导师昵称管理
- 本地数据存储
- 版本控制支持

### ✅ 用户体验
- 描述性评分界面
- 响应式设计
- 多导师对比（最多3个）
- 无障碍设计支持

## 代码质量

### 开发规范
- TypeScript严格模式
- ESLint + Biome代码检查
- 函数式组件设计
- 清晰的组件分离

### 性能优化
- Next.js静态优化
- 组件懒加载
- CSS-in-JS优化
- 图片资源优化

## 部署配置

### 生产环境
- **平台**: Netlify
- **构建命令**: `npm run build`
- **输出目录**: `out/`
- **环境**: Node.js 16+

### 开发环境
- **包管理器**: npm (兼容yarn/pnpm/bun)
- **开发服务器**: Next.js Dev Server
- **热重载**: Turbopack支持

## 安全性

### 数据安全
- 本地数据存储，不上传服务器
- 导师昵称系统保护隐私
- 无用户身份追踪

### 代码安全
- TypeScript类型安全
- ESLint安全规则检查
- 依赖版本安全检查

## 未来扩展

### 待开发功能
- [ ] 国际化(i18n)支持
- [ ] 劣势权重算法优化（2倍影响）
- [ ] 更多导师对比模式
- [ ] 历史数据分析

### 技术改进
- [ ] 单元测试覆盖
- [ ] E2E测试
- [ ] 性能监控
- [ ] 错误边界处理

## 维护说明

### 定期更新
- 依赖包安全更新
- 算法权重调优
- UI/UX改进
- 文档同步更新

### 监控指标
- 构建成功率
- 加载性能
- 用户反馈
- 错误率追踪