# Git提交规范

本项目使用husky和commitlint来规范Git提交。

## 提交消息格式

提交消息必须遵循以下格式：

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Type

Type必须是以下之一：

- `feat`: 新功能
- `fix`: 修复bug
- `docs`: 文档更新
- `style`: 代码格式修改（不影响代码运行的变动）
- `refactor`: 重构（既不是新增功能，也不是修改bug的代码变动）
- `perf`: 性能优化
- `test`: 增加测试
- `chore`: 构建工具或依赖管理
- `ci`: CI配置
- `build`: 构建相关
- `revert`: 回滚
- `wip`: 进行中的工作

### Scope

Scope说明影响范围，可选。

### Subject

Subject是简短描述，必须以动词开头，使用第一人称现在时，如"change"而不是"changed"或"changes"。

## 示例

```
feat(auth): add login button

Add a new login button to the authentication form that allows users to sign in with their credentials.

Closes #123
```

## 提交前检查

在提交代码前，husky会自动运行以下检查：

1. 使用prettier格式化代码
2. 验证提交消息格式

如果检查失败，提交将被拒绝。
