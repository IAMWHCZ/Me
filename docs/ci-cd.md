# CI/CD 配置文档

本文档说明了如何为这个 monorepo 项目设置和使用 CI/CD 流程。

## 概述

我们使用 GitHub Actions 作为 CI/CD 平台，为项目配置了两个主要的工作流：

1. **主 CI/CD 流程** (`.github/workflows/ci-cd.yml`)：处理整个项目的构建、测试和部署
2. **移动端应用 CI/CD 流程** (`.github/workflows/mobile-ci-cd.yml`)：专门处理移动端应用的构建和部署

## 工作流详解

### 主 CI/CD 流程

#### 触发条件

- 推送到 `main` 或 `develop` 分支
- 向 `main` 分支提交 Pull Request

#### 作业流程

1. **Lint & Format Check**：检查代码格式和 lint 错误
2. **Type Check**：运行 TypeScript 类型检查
3. **Build**：构建所有包和 Web 应用
4. **Test**：运行所有测试
5. **Deploy Web App**（仅在 `main` 分支）：将 Web 应用部署到 GitHub Pages
6. **Publish Packages**（仅在 `main` 分支）：将包发布到 npm

### 移动端应用 CI/CD 流程

#### 触发条件

- 推送到 `main` 或 `develop` 分支，且仅当移动端应用或共享包有变更时
- 向 `main` 分支提交 Pull Request，且仅当移动端应用或共享包有变更时

#### 作业流程

1. **Mobile App Lint & Format Check**：检查移动端应用的代码格式和 lint 错误
2. **Mobile App Type Check**：运行移动端应用的 TypeScript 类型检查
3. **Mobile App Build**：构建移动端应用
4. **Deploy Mobile App**（仅在 `main` 分支）：将移动端应用部署到应用商店

## 所需的 GitHub Secrets

为了使 CI/CD 流程正常工作，需要在 GitHub 仓库中设置以下 secrets：

### 主 CI/CD 流程

- `NPM_TOKEN`：用于发布包到 npm 的认证令牌

### 移动端应用 CI/CD 流程

- `EXPO_TOKEN`：用于 Expo 应用构建和部署的认证令牌

## 测试配置

我们为项目中的不同部分配置了不同的测试框架：

### Web 应用和 UI 包

- **测试框架**：Vitest
- **测试环境**：jsdom（模拟浏览器环境）
- **测试库**：@testing-library/react

### 移动端应用

- **测试框架**：Jest
- **测试环境**：jest-expo（Expo 环境）
- **测试库**：@testing-library/react-native

### 共享包

- **测试框架**：Vitest
- **测试环境**：node（纯 Node.js 环境）

## 运行测试

### 本地运行测试

#### 运行所有测试

```bash
pnpm test
```

#### 运行特定包的测试

```bash
# Web 应用
pnpm -F @me/web test

# UI 包
pnpm -F @me/ui test

# 共享包
pnpm -F @me/shared test

# 移动端应用
pnpm -F @me/mobile test
```

#### 运行测试并生成覆盖率报告

```bash
pnpm test:coverage
```

#### 监视模式运行测试

```bash
pnpm test:watch
```

### CI/CD 中运行测试

测试会在 CI/CD 流程中自动运行，包括：

- 代码格式检查
- Lint 检查
- 类型检查
- 单元测试
- 集成测试（如果有）

## 部署流程

### Web 应用部署

Web 应用会自动部署到 GitHub Pages，访问路径为：
`https://<username>.github.io/<repository-name>/web/`

### 移动端应用部署

移动端应用通过 Expo EAS 构建和部署：

1. 构建应用（iOS 和 Android）
2. 提交到应用商店（仅限生产环境）

### 包发布

共享包会自动发布到 npm，版本基于 package.json 中的版本号。

## 最佳实践

1. **提交前检查**：在提交代码前，请确保所有测试通过

   ```bash
   pnpm lint && pnpm test
   ```

2. **分支策略**：
   - `main` 分支用于生产环境
   - `develop` 分支用于开发环境
   - 功能分支从 `develop` 分支创建

3. **版本控制**：
   - 使用语义化版本控制
   - 在发布前更新 package.json 中的版本号

4. **测试覆盖**：
   - 为新功能添加测试
   - 保持高测试覆盖率

## 故障排除

### 常见问题

1. **构建失败**：
   - 检查依赖是否正确安装
   - 确保所有包的版本兼容

2. **测试失败**：
   - 检查测试配置是否正确
   - 确保测试环境设置正确

3. **部署失败**：
   - 检查 secrets 是否正确设置
   - 确保部署配置正确

### 调试技巧

1. **本地重现**：

   ```bash
   # 运行与 CI 相同的命令
   pnpm install --frozen-lockfile
   pnpm build
   pnpm test
   ```

2. **查看日志**：
   - GitHub Actions 提供详细的构建日志
   - 检查错误信息和警告

3. **逐步调试**：
   - 可以在本地运行单个作业的命令
   - 使用 `--verbose` 标志获取更多信息

## 扩展 CI/CD

如果需要扩展 CI/CD 流程，可以考虑：

1. **添加更多测试**：
   - 端到端测试（E2E）
   - 性能测试
   - 安全测试

2. **添加更多部署目标**：
   - 其他云服务（AWS, Azure, GCP）
   - 容器化部署（Docker, Kubernetes）

3. **添加通知**：
   - Slack/Teams 通知
   - 邮件通知

4. **添加自动化**：
   - 自动版本管理
   - 自动发布说明生成
