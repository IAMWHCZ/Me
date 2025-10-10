# Changesets 包版本管理

我们已经成功为您的 monorepo 项目集成了 Changesets 包版本管理系统。以下是实现的功能和使用指南：

## 已实现的功能

### 1. Changesets 配置

- 安装了 `@changesets/cli` 和 `@changesets/changelog-github`
- 配置了 `.changeset/config.json`，包括：
  - 使用 GitHub changelog 生成器
  - 链接相关包（@me/ui, @me/icons, @me/shared）
  - 自定义 changelog 模板

### 2. 脚本命令

在 `package.json` 中添加了以下命令：

- `pnpm changeset`: 创建新的 changeset
- `pnpm create-changeset`: 运行 changeset 创建助手 (Unix/Linux/macOS)
- `pnpm create-changeset:win`: 运行 changeset 创建助手 (Windows)
- `pnpm version-packages`: 更新包版本
- `pnpm release`: 发布包到 npm
- `pnpm version-and-release`: 组合命令，先更新版本再发布

### 3. GitHub Actions 工作流

创建了以下自动化工作流：

#### 1. Release Packages (`.github/workflows/release-packages.yml`)

- 当推送到 main 分支时触发
- 检查是否有 pending 的 changesets
- 如果有，创建一个发布 PR
- 如果没有，直接发布包到 npm

#### 2. Version Packages (`.github/workflows/version-packages.yml`)

- 当发布 PR 被合并时触发
- 更新包版本
- 构建包
- 提交版本更改

#### 3. Create Changeset (`.github/workflows/create-changeset.yml`)

- 当创建或更新 PR 时触发
- 检查是否有包或应用的更改
- 如果没有 changeset，在 PR 中添加提醒评论

### 4. 辅助工具

- 创建了 Unix/Linux/macOS 和 Windows 版本的 changeset 创建助手脚本
- 创建了详细的 Changesets 使用指南 (`docs/changesets-guide.md`)
- 创建了自定义的 changelog 模板

## 使用方法

### 1. 创建 Changeset

当您完成了一项功能或修复了一个 bug 后，运行以下命令来创建一个新的 changeset：

```bash
# Unix/Linux/macOS
pnpm create-changeset

# Windows
pnpm create-changeset:win

# 或者直接使用 changeset CLI
pnpm changeset
```

### 2. 提交 Changeset

Changeset 文件将被创建在 `.changeset` 目录下。将这些文件提交到您的代码仓库：

```bash
git add .changeset/*
git commit -m "chore: add changeset"
```

### 3. 版本发布

当您准备发布新版本时，可以运行以下命令：

```bash
# 更新包版本
pnpm version-packages

# 发布包到 npm
pnpm release

# 或者一次性完成版本更新和发布
pnpm version-and-release
```

## 自动化流程

1. **开发阶段**：开发人员创建 PR，如果没有 changeset，GitHub Actions 会自动提醒
2. **合并阶段**：PR 被合并后，如果有 changeset，会自动创建发布 PR
3. **发布阶段**：发布 PR 被合并后，自动更新包版本并发布到 npm

## 环境变量配置

为了使自动化发布流程正常工作，您需要在 GitHub 仓库中配置以下 secrets：

- `NPM_TOKEN`: 用于发布包到 npm 的认证令牌
- `GITHUB_TOKEN`: 用于操作 GitHub API 的认证令牌（通常由 GitHub Actions 自动提供）

## 最佳实践

1. **每次功能或修复都创建 changeset**：这确保了所有变更都被跟踪和记录。
2. **使用语义化的版本类型**：
   - `major`: 破坏性变更
   - `minor`: 新功能
   - `patch`: 错误修复
3. **清晰的变更描述**：描述应该简洁明了，让用户能够理解变更的内容。
4. **定期发布**：定期合并 changesets 并发布新版本，以保持包的更新。

## 下一步

1. 在 GitHub 仓库中配置 `NPM_TOKEN` secret
2. 测试 changeset 创建流程
3. 根据团队需求调整 changelog 模板和配置

## 文档资源

- [Changesets 使用指南](docs/changesets-guide.md)
- [Changesets 官方文档](https://github.com/changesets/changesets)
- [Changesets 常见问题](https://github.com/changesets/changesets/blob/main/docs/common-questions.md)
