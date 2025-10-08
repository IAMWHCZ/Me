import {type UserConfig} from 'cz-git'
const config:UserConfig = {
  extends: ['@commitlint/config-conventional'],
  parserPreset: 'conventional-changelog-conventionalcommits',
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat',     // 新功能
        'fix',      // 修复 bug
        'docs',     // 文档更新
        'style',    // 代码格式修改（不影响功能）
        'refactor', // 重构（既不是新增功能，也不是修复 bug）
        'perf',     // 性能优化
        'test',     // 测试相关修改
        'build',    // 构建系统或依赖修改
        'ci',       // CI 配置修改
        'chore',    // 其他不修改 src 或 test 文件的修改
        'revert',   // 回滚之前的提交
        'wip',      // 进行中的工作
      ],
    ],
    'type-case': [2, 'always', 'lower-case'],
    'type-empty': [2, 'never'],
    'scope-case': [2, 'always', 'lower-case'],
    'subject-case': [2, 'never', ['sentence-case', 'start-case', 'pascal-case', 'upper-case']],
    'subject-empty': [2, 'never'],
    'subject-full-stop': [2, 'never', '.'],
    'header-max-length': [2, 'always', 72],
    'body-leading-blank': [1, 'always'],
    'body-max-line-length': [2, 'always', 100],
    'footer-leading-blank': [1, 'always'],
    'footer-max-line-length': [2, 'always', 100],
  },
  prompt: {
    types:[
      {
        value: 'feat',
        name: 'feat:     新功能 ✨',
      },
      {
        value: 'fix',
        name: 'fix:      修复 bug 🐛',
      },
      {
        value: 'docs',
        name: 'docs:     文档更新 📚',
      },
      {
        value: 'style',
        name: 'style:    代码格式修改（不影响功能） 💎',
      },
      {
        value: 'refactor',
        name: 'refactor: 重构（既不是新增功能，也不是修复 bug） 📦',
      },
      {
        value: 'perf',
        name: 'perf:     性能优化 🚀',
      },
      {
        value: 'test',
        name: 'test:     测试相关修改 🚨',
      },
      {
        value: 'build',
        name: 'build:    构建系统或依赖修改 🛠',
      },
      {
        value: 'ci',
        name: 'ci:       CI 配置修改 ⚙️',
      },
      {
        value: 'chore',
        name: 'chore:    其他不修改 src 或 test 文件的修改 ♻️',
      },
      {
        value: 'revert',
        name: 'revert:   回滚之前的提交 🗑',
      },
      {
        value: 'wip',
        name: 'wip:      进行中的工作 🚧',
      },
    ],
    scopes:[
        'root',
        'backend',
        'frontend',
        'components',
        'utils'
    ],
    allowCustomScopes: true,
    skipQuestions: ['body', 'footer','breaking','footerPrefix'],
    messages:{
        type: '选择你要提交的更改类型: 🤔',
        scope: '选择一个范围（可选）: 🎯',
        customScope: '请输入自定义范围: ✏️',
        subject: '输入变更描述（必填）: 📝',
        confirmCommit: '确认提交？ 🚀',
        body: '输入变更详细描述（可选）: 📋',
        footer: '输入变更备注（可选）: 📌',
    }
  }
  }

export default config