# Changesets 使用指南

## 什么是 Changesets？

Changesets 是一个用于管理多包仓库版本和发布的工具。它可以帮助您：

- 跟踪包的变更
- 自动确定版本号
- 生成变更日志
- 发布包到 npm

## 工作流程

### 1. 创建 Changeset

当您完成了一项功能或修复了一个 bug 后，运行以下命令来创建一个新的 changeset：

```bash
pnpm changeset
```

这将引导您完成以下步骤：

1. 选择要更新的包
2. 选择版本类型（major、minor、patch）
3. 添加变更说明

### 2. 提交 Changeset

Changeset 文件将被创建在 `.changeset` 目录下。将这些文件提交到您的代码仓库：

```bash
git add .changeset/*
git commit -m "feat: add new feature"
```

### 3. 版本发布

当您准备发布新版本时，可以运行以下命令：

```bash
pnpm version-packages
```

这将：

- 根据 changeset 更新所有包的版本
- 更新包之间的依赖关系
- 生成 CHANGELOG.md 文件

### 4. 发布包

最后，运行以下命令将包发布到 npm：

```bash
pnpm release
```

或者，您可以使用组合命令：

```bash
pnpm version-and-release
```

## 自动化发布

我们设置了 GitHub Actions 工作流来自动化发布过程：

1. **Release Packages** (`.github/workflows/release-packages.yml`): 当您推送到 main 分支时，此工作流将：
   - 检查是否有 pending 的 changesets
   - 如果有，创建一个发布 PR
   - 如果没有，直接发布包到 npm

2. **Version Packages** (`.github/workflows/version-packages.yml`): 当发布 PR 被合并时，此工作流将：
   - 更新包版本
   - 构建包
   - 提交版本更改

## 最佳实践

1. **每次功能或修复都创建 changeset**: 这确保了所有变更都被跟踪和记录。

2. **使用语义化的版本类型**:
   - `major`: 破坏性变更
   - `minor`: 新功能
   - `patch`: 错误修复

3. **清晰的变更描述**: 描述应该简洁明了，让用户能够理解变更的内容。

4. **定期发布**: 定期合并 changesets 并发布新版本，以保持包的更新。

## 常见问题

### 如何撤销一个 changeset？

删除 `.changeset` 目录下对应的 changeset 文件，然后提交更改。

### 如何发布特定包？

在创建 changeset 时，只选择要发布的包。

### 如何自定义变更日志？

编辑 `.changeset/config.json` 文件，可以自定义变更日志的格式和内容。

## 更多资源

- [Changesets 官方文档](https://github.com/changesets/changesets)
- [Changesets 常见问题](https://github.com/changesets/changesets/blob/main/docs/common-questions.md)
