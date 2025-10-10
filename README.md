# Me

Consider this my personal lab notebook. Here, I document my adventures in code, design, and life. It's a mix of finished projects, half-baked ideas, and everything in between. Hope you find something interesting!

## 项目结构

这是一个 monorepo 项目，使用 pnpm workspace 和 Turbo 进行管理。

### 应用

- **@me/web**: Web 应用，使用 React + Vite
- **@me/mobile**: 移动端应用，使用 Expo + React Native
- **@me/desktop**: 桌面应用，使用 Electron + React

### 共享包

- **@me/ui**: 共享 UI 组件库
- **@me/icons**: 图标库
- **@me/shared**: 共享工具和类型定义

## 开发

### 安装依赖

```bash
pnpm install
```

### 启动开发服务器

```bash
# 启动所有应用
pnpm dev

# 启动特定应用
pnpm dev:web
pnpm dev:ui
pnpm dev:mobile
pnpm dev:desktop
```

### 运行测试

```bash
# 运行所有测试
pnpm test

# 运行特定包的测试
pnpm -F @me/web test
pnpm -F @me/mobile test
pnpm -F @me/desktop test
pnpm -F @me/ui test
pnpm -F @me/shared test
```

### 构建

```bash
# 构建所有包和应用
pnpm build

# 构建特定包
pnpm -F @me/ui build
pnpm -F @me/icons build
pnpm -F @me/shared build
```

## 包版本管理

项目使用 Changesets 进行包版本管理和发布。Changesets 可以帮助我们：

- 跟踪包的变更
- 自动确定版本号
- 生成变更日志
- 发布包到 npm

### 创建 Changeset

当您完成了一项功能或修复了一个 bug 后，运行以下命令来创建一个新的 changeset：

```bash
# Windows
pnpm create-changeset:win

# 或者直接使用 changeset CLI
pnpm changeset
```

### 版本发布

当您准备发布新版本时，可以运行以下命令：

```bash
# 更新包版本
pnpm version-packages

# 发布包到 npm
pnpm release

# 或者一次性完成版本更新和发布
pnpm version-and-release
```

详细使用指南请参考 [Changesets 使用指南](./docs/changesets-guide.md)。

## CI/CD

项目配置了完整的 CI/CD 流程，使用 GitHub Actions：

- **代码检查**: Lint 和格式检查
- **类型检查**: TypeScript 类型检查
- **测试**: 单元测试和集成测试
- **构建**: 构建所有包和应用
- **部署**: 自动部署 Web 应用到 GitHub Pages，发布包到 npm
- **版本管理**: 自动化包版本管理和发布

### 工作流

1. **开发阶段**: 开发人员创建 PR，如果没有 changeset，GitHub Actions 会自动提醒
2. **合并阶段**: PR 被合并后，如果有 changeset，会自动创建发布 PR
3. **发布阶段**: 发布 PR 被合并后，自动更新包版本并发布到 npm

详细配置请参考 [CI/CD 文档](./docs/ci-cd.md) 和 [Changesets 实现文档](./docs/changesets-implementation.md)。

## 技术栈

### 核心技术

- **包管理器**: pnpm
- **构建工具**: Turbo
- **前端框架**: React 19
- **样式方案**: Tailwind CSS 4
- **类型系统**: TypeScript

### 开发工具

- **代码检查**: ESLint
- **代码格式化**: Prettier
- **Git hooks**: Husky + lint-staged
- **提交规范**: Commitizen + Commitlint
- **测试框架**: Vitest + Testing Library

### 平台特定技术

- **Web**: Vite
- **Mobile**: Expo + React Native
- **Desktop**: Electron

## 贡献

请确保所有测试通过并遵循代码风格指南。在提交 PR 之前，请确保：

1. 为您的变更创建 changeset
2. 运行测试并确保通过
3. 遵循项目的提交信息规范

## 许可证

MIT
