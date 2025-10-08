import { type Configuration } from 'lint-staged'

// lint-staged 配置文件
// 用于在提交前对暂存的文件运行指定的 linting 任务

const config: Configuration = {
  // 匹配所有 TypeScript 和 JavaScript 文件
  '*.{ts,tsx,js,jsx}': [
    // 首先运行 ESLint 修复代码问题
    'eslint --fix',
    // 然后运行 Prettier 格式化代码
    'prettier --write'
  ],

  // 匹配 JSON 文件
  '*.{json,jsonc}': [
    // 使用 Prettier 格式化 JSON 文件
    'prettier --write'
  ],

  // 匹配 Markdown 文件
  '*.md': [
    // 使用 Prettier 格式化 Markdown 文件
    'prettier --write',
    // 检查拼写
    'cspell'
  ],

  // 匹配 CSS、SCSS 和 LESS 文件
  '*.{css,scss,less}': [
    // 使用 Prettier 格式化样式文件
    'prettier --write'
  ],

  // 匹配 YAML 文件
  '*.{yml,yaml}': [
    // 使用 Prettier 格式化 YAML 文件
    'prettier --write'
  ],

  // 匹配所有可能包含文本内容的文件进行拼写检查
  '*.{js,jsx,ts,tsx,json,css,scss,less,html,md,cjs,mjs}': [
    // 检查拼写错误
    'cspell'
  ]
}

export default config
