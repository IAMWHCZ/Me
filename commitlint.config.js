module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat', // 新功能 ✨
        'fix', // 修复bug 🐛
        'docs', // 文档更新 📚
        'style', // 代码格式修改 💎
        'refactor', // 重构 📦
        'perf', // 性能优化 🚀
        'test', // 测试相关 🚨
        'chore', // 构建工具或依赖管理 ♻️
        'ci', // CI配置 ⚙️
        'build', // 构建相关 🛠
        'revert', // 回滚 🗑
        'wip', // 进行中的工作 🚧
      ],
    ],
    'type-case': [2, 'always', 'lower-case'],
    'type-empty': [2, 'never'],
    'scope-enum': [
      2,
      'always',
      [
        // 项目模块
        'root', // 根目录配置
        'web', // web应用
        'ui', // UI组件库
        'icons', // 图标库
        'shared', // 共享工具
        'scripts', // 脚本工具
        // 其他常见scope
        'app', // 应用
        'components', // 组件
        'utils', // 工具函数
        'types', // 类型定义
        'config', // 配置文件
        'server',
      ],
    ],
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
    questions: {
      type: {
        description: '选择你要提交的更改类型: 📝',
        enum: {
          feat: {
            description: '新功能',
            title: 'Features',
            emoji: '✨',
          },
          fix: {
            description: '修复bug',
            title: 'Bug Fixes',
            emoji: '🐛',
          },
          docs: {
            description: '文档更新',
            title: 'Documentation',
            emoji: '📚',
          },
          style: {
            description: '代码格式修改（不影响代码运行的变动）',
            title: 'Styles',
            emoji: '💎',
          },
          refactor: {
            description: '重构（既不是新增功能，也不是修改bug的代码变动）',
            title: 'Code Refactoring',
            emoji: '📦',
          },
          perf: {
            description: '性能优化',
            title: 'Performance Improvements',
            emoji: '🚀',
          },
          test: {
            description: '增加测试',
            title: 'Tests',
            emoji: '🚨',
          },
          build: {
            description: '构建相关',
            title: 'Builds',
            emoji: '🛠',
          },
          ci: {
            description: 'CI配置',
            title: 'Continuous Integrations',
            emoji: '⚙️',
          },
          chore: {
            description: '构建工具或依赖管理',
            title: 'Chores',
            emoji: '♻️',
          },
          revert: {
            description: '回滚',
            title: 'Reverts',
            emoji: '🗑',
          },
          wip: {
            description: '进行中的工作',
            title: 'Work In Progress',
            emoji: '🚧',
          },
        },
      },
      scope: {
        description: '此更改的范围是什么（例如组件或文件名）: 🎯',
      },
      subject: {
        description: '写一个简短的命令式描述（最多84个字符）: ✍️',
      },
      body: {
        description: '提供更详细的更改描述: 📋',
      },
      isBreaking: {
        description: '是否有破坏性更改? 💥',
      },
      breakingBody: {
        description: '破坏性更改的详细描述: 💣',
      },
      breaking: {
        description: '描述破坏性更改: ⚠️',
      },
      isIssueAffected: {
        description: '此更改是否影响任何未解决的问题? 🐛',
      },
      issuesBody: {
        description: '如果问题被关闭，提交需要一个body。请输入更长的更改描述: 📝',
      },
      issues: {
        description: '添加问题引用（例如"fix #123", "re #123".）: 🔗',
      },
    },
  },
}
