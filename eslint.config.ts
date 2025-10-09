// eslint.config.ts
import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import reactPlugin from 'eslint-plugin-react'
import tseslint from 'typescript-eslint'
import prettierConfig from 'eslint-config-prettier'
import prettierPlugin from 'eslint-plugin-prettier'
import unicornPlugin from 'eslint-plugin-unicorn'
import jsxAccessibility from 'eslint-plugin-jsx-a11y'
import sonarjs from 'eslint-plugin-sonarjs'

const ignores = ['**/node_modules/**', '**/dist/**', '**/public/**']

export default tseslint.config({
  ignores,
  extends: [js.configs.recommended, ...tseslint.configs.recommended, prettierConfig],
  plugins: {
    'react-hooks': reactHooks,
    'react-refresh': reactRefresh,
    react: reactPlugin,
    prettier: prettierPlugin,
    unicorn: unicornPlugin,
    'jsx-a11y': jsxAccessibility,
    sonarjs: sonarjs
  },
  languageOptions: {
    globals: {
      ...globals.browser,
      ...globals.node
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
    parser: tseslint.parser,
    parserOptions: {
      project: true,
      tsconfigRootDir: __dirname,
      ecmaFeatures: {
        jsx: true
      }
    }
  },
  rules: {
    'no-var': 'error', // 禁止使用 var，使用 let 或 const 代替
    'prefer-const': 'error', // 如果变量不会被重新赋值，则使用 const 声明
    'no-unused-vars': 'off', // 禁用 ESLint 的未使用变量检查，使用 TypeScript 的检查
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }], // TypeScript 未使用变量检查，忽略以下划线开头的参数

    // React 规则
    'react/react-in-jsx-scope': 'off', // React 17+ 不需要导入 React 即可使用 JSX
    'react/prop-types': 'off', // 使用 TypeScript 替代 prop-types 进行类型检查
    'react/jsx-uses-react': 'off', // 在 JSX 中使用 React 时不需要显式导入
    'react/jsx-uses-vars': 'error', // 确保在 JSX 中使用的变量都已声明
    'react/jsx-key': 'error', // 在数组或迭代器中创建的元素必须具有 key 属性
    'react/jsx-no-duplicate-props': 'error', // 禁止在 JSX 中使用重复的属性
    'react/jsx-no-undef': 'error', // 禁止在 JSX 中使用未声明的变量
    'react/no-direct-mutation-state': 'error', // 禁止直接修改 this.state
    'react/no-unescaped-entities': 'warn', // 禁止在 JSX 中使用未转义的实体字符（如 >, <, & 等）
    'react/no-unknown-property': 'error', // 禁止使用未知的 DOM 属性
    'react/jsx-curly-brace-presence': ['error', { props: 'never', children: 'never' }], // 当不需要时，禁止在 JSX 属性或子元素中使用花括号

    // React 性能优化规则
    'react/no-unstable-nested-components': 'warn', // 警告不要在组件内部创建嵌套组件，这会导致性能问题
    'react/no-array-index-key': 'warn', // 警告不要使用数组索引作为 key，这可能导致渲染问题
    'react/jsx-no-bind': 'warn', // 警告不要在 JSX 中使用 bind 或箭头函数，这会导致不必要的重新渲染
    'react/jsx-no-constructed-context-values': 'warn', // 警告不要在 JSX 中直接创建对象或数组作为 context 值
    'react/forbid-component-props': ['warn', { forbid: ['style'] }], // 警告不要使用特定的组件属性（如 style）
    'react/require-render-return': 'error', // 要求 render 方法必须有返回值
    'react/no-this-in-sfc': 'error', // 禁止在无状态函数组件中使用 this
    'react/no-typos': 'error', // 防止在 React 组件中拼写错误
    'react/destructuring-assignment': 'warn', // 建议使用解构赋值

    // React Hooks 规则
    'react-hooks/rules-of-hooks': 'error', // 强制执行 Hooks 规则
    'react-hooks/exhaustive-deps': 'warn', // 警告 useEffect 等钩子的依赖项不完整

    // React Refresh 规则
    'react-refresh/only-export-components': ['warn', { allowConstantExport: true }], // 警告只导出组件以支持快速刷新

    // TypeScript 规则
    '@typescript-eslint/no-explicit-any': 'warn', // 警告使用 any 类型
    '@typescript-eslint/explicit-function-return-type': 'off', // 不要求函数显式声明返回类型
    '@typescript-eslint/explicit-module-boundary-types': 'off', // 不要求模块边界显式类型声明
    '@typescript-eslint/no-empty-interface': 'warn', // 警告定义空接口
    '@typescript-eslint/no-inferrable-types': 'off', // 允许为可以推断的类型显式声明类型
    '@typescript-eslint/ban-ts-comment': 'warn', // 警告使用 TypeScript 注释（如 @ts-ignore）
    '@typescript-eslint/prefer-nullish-coalescing': 'error', // 使用空值合并运算符 (??) 而不是逻辑或 (||)
    '@typescript-eslint/prefer-optional-chain': 'error', // 使用可选链 (?.) 而不是链式访问
    '@typescript-eslint/no-non-null-assertion': 'warn', // 警告使用非空断言 (!)
    '@typescript-eslint/consistent-type-imports': 'error', // 强制使用一致的类型导入语法
    '@typescript-eslint/no-unnecessary-type-assertion': 'warn', // 警告不必要的类型断言
    '@typescript-eslint/no-unnecessary-condition': 'warn', // 警告不必要的条件判断
    '@typescript-eslint/prefer-as-const': 'error', // 使用 as const 而不是类型断言
    '@typescript-eslint/prefer-for-of': 'warn', // 建议使用 for...of 而不是标准的 for 循环
    '@typescript-eslint/prefer-function-type': 'warn', // 建议使用函数类型而不是接口
    '@typescript-eslint/prefer-includes': 'warn', // 建议使用 includes() 而不是 indexOf()
    '@typescript-eslint/prefer-readonly': 'warn', // 建议使用 readonly 修饰符
    '@typescript-eslint/prefer-reduce-type-parameter': 'warn', // 建议为 reduce 提供类型参数
    '@typescript-eslint/prefer-string-starts-ends-with': 'warn', // 建议使用 startsWith() 和 endsWith() 而不是 indexOf()

    // 无障碍访问规则 (jsx-a11y)
    'jsx-a11y/alt-text': 'error', // 要求 img 元素具有 alt 属性
    'jsx-a11y/anchor-is-valid': 'error', // 要求锚点元素具有有效的内容或属性
    'jsx-a11y/aria-props': 'error', // 确保有效的 ARIA 属性
    'jsx-a11y/aria-proptypes': 'error', // 确保 ARIA 属性具有正确的类型
    'jsx-a11y/aria-role': 'error', // 确保有效的 ARIA 角色
    'jsx-a11y/aria-unsupported-elements': 'error', // 禁止在不支持的元素上使用 ARIA 属性
    'jsx-a11y/role-has-required-aria-props': 'error', // 确保具有角色的元素具有必需的 ARIA 属性
    'jsx-a11y/role-supports-aria-props': 'error', // 确保角色的 ARIA 属性有效
    'jsx-a11y/click-events-have-key-events': 'warn', // 警告可点击元素应具有键盘事件处理
    'jsx-a11y/no-static-element-interactions': 'warn', // 警告静态元素不应具有交互处理程序
    'jsx-a11y/no-autofocus': 'warn', // 警告不要使用 autoFocus，这会影响无障碍访问
    'jsx-a11y/interactive-supports-focus': 'warn', // 警告交互元素应支持焦点

    // 代码质量规则 (sonarjs)
    'sonarjs/cognitive-complexity': ['warn', 15], // 警告函数认知复杂度超过 15
    'sonarjs/no-duplicate-string': 'warn', // 警告重复的字符串字面量
    'sonarjs/no-identical-functions': 'warn', // 警告相同的函数实现
    'sonarjs/no-collapsible-if': 'error', // 禁止可以合并的 if 语句
    'sonarjs/no-collection-size-mischeck': 'error', // 禁止错误的集合大小检查
    'sonarjs/no-empty-collection': 'error', // 禁止使用空集合
    'sonarjs/no-extra-arguments': 'error', // 禁止函数调用时传递额外参数
    'sonarjs/no-identical-conditions': 'error', // 禁止相同的条件判断
    'sonarjs/no-redundant-boolean': 'error', // 禁止冗余的布尔值
    'sonarjs/no-redundant-jump': 'error', // 禁止冗余的跳转语句
    'sonarjs/no-same-line-conditional': 'error', // 禁止在同一行使用条件语句
    'sonarjs/prefer-immediate-return': 'warn', // 建议立即返回而不是赋值后返回

    // 现代JavaScript规则 (unicorn)
    'unicorn/better-regex': 'error', // 强制使用更好的正则表达式
    'unicorn/catch-error-name': 'error', // 强制使用特定的错误变量名
    'unicorn/consistent-empty-array-spread': 'error', // 强制一致地展开空数组
    'unicorn/consistent-function-scoping': 'warn', // 警告函数作用域不一致
    'unicorn/custom-error-definition': 'error', // 强制正确地定义自定义错误
    'unicorn/empty-brace-spaces': 'error', // 强制在空大括号内使用空格
    'unicorn/error-message': 'error', // 强制错误消息具有特定格式
    'unicorn/escape-case': 'error', // 强制在字符串中正确转义字符
    'unicorn/expiring-todo-comments': 'error', // 要求 TODO 注释包含过期日期
    'unicorn/explicit-length-check': 'error', // 强制显式检查数组长度
    'unicorn/filename-case': ['error', { case: 'kebabCase' }], // 强制文件名使用 kebab-case 格式
    'unicorn/import-style': 'error', // 强制使用一致的导入样式
    'unicorn/new-for-builtins': 'error', // 强制对内置类型使用 new
    'unicorn/no-abusive-eslint-disable': 'error', // 禁止滥用 eslint-disable 注释
    'unicorn/no-array-for-each': 'error', // 禁止使用数组的 forEach 方法
    'unicorn/no-array-method-this-argument': 'error', // 禁止在数组方法中使用 this 参数
    'unicorn/no-array-push-push': 'error', // 禁止连续多次调用 array.push
    'unicorn/no-console-spaces': 'error', // 禁止在 console 方法中使用多余空格
    'unicorn/no-document-cookie': 'error', // 禁止使用 document.cookie
    'unicorn/no-empty-file': 'error', // 禁止空文件
    'unicorn/no-for-loop': 'error', // 禁止使用 for 循环，使用 for-of 或数组方法代替
    'unicorn/no-hex-escape': 'error', // 禁止使用十六进制转义序列
    'unicorn/no-instanceof-array': 'error', // 禁止使用 instanceof 检查数组
    'unicorn/no-invalid-remove-event-listener': 'error', // 禁止无效的事件监听器移除
    'unicorn/no-keyword-prefix': 'error', // 禁止变量名以 JavaScript 关键字为前缀
    'unicorn/no-lonely-if': 'error', // 禁止 if 语句作为 else 块的唯一语句
    'unicorn/no-nested-ternary': 'error', // 禁止嵌套的三元表达式
    'unicorn/no-new-array': 'error', // 禁止使用 Array 构造函数
    'unicorn/no-new-buffer': 'error', // 禁止使用 Buffer 构造函数
    'unicorn/no-null': 'error', // 禁止使用 null，使用 undefined 代替
    'unicorn/no-object-as-default-parameter': 'error', // 禁止使用对象作为默认参数
    'unicorn/no-process-exit': 'error', // 禁止使用 process.exit
    'unicorn/no-static-only-class': 'error', // 禁止只包含静态成员的类
    'unicorn/no-thenable': 'error', // 禁止在非 Promise 中使用 thenable
    'unicorn/no-this-assignment': 'error', // 禁止将 this 赋值给变量
    'unicorn/no-unreadable-array-destructuring': 'error', // 禁止不可读的数组解构
    'unicorn/no-unreadable-iife': 'error', // 禁止不可读的立即调用函数表达式
    'unicorn/no-useless-fallback-in-spread': 'error', // 禁止在展开操作中使用无用的回退值
    'unicorn/no-useless-length-check': 'error', // 禁止无用的长度检查
    'unicorn/no-useless-promise-resolve-reject': 'error', // 禁止无用的 Promise resolve/reject
    'unicorn/no-useless-spread': 'error', // 禁止无用的展开操作
    'unicorn/no-useless-switch-case': 'error', // 禁止无用的 switch case
    'unicorn/no-useless-undefined': 'error', // 禁止无用的 undefined
    'unicorn/no-zero-fractions': 'error', // 禁止使用零分数
    'unicorn/number-literal-case': 'error', // 强制数字字面量使用正确的大小写
    'unicorn/numeric-separators-style': 'error', // 强制使用一致的数字分隔符样式
    'unicorn/prefer-add-event-listener': 'error', // 建议使用 addEventListener 而不是事件属性
    'unicorn/prefer-array-find': 'error', // 建议使用 array.find 而不是循环
    'unicorn/prefer-array-flat': 'error', // 建议使用 array.flat 而不是其他方法
    'unicorn/prefer-array-flat-map': 'error', // 建议使用 array.flatMap 而不是其他方法
    'unicorn/prefer-array-index-of': 'error', // 建议使用 array.indexOf 而不是其他方法
    'unicorn/prefer-array-some': 'error', // 建议使用 array.some 而不是其他方法
    'unicorn/prefer-at': 'error', // 建议使用 at() 方法而不是索引访问
    'unicorn/prefer-code-point': 'error', // 建议使用 codePointAt() 而不是 charCodeAt()
    'unicorn/prefer-date-now': 'error', // 建议使用 Date.now() 而不是 new Date()
    'unicorn/prefer-default-parameters': 'error', // 建议使用默认参数而不是参数检查
    'unicorn/prefer-dom-node-dataset': 'error', // 建议使用 dataset 属性而不是 getAttribute
    'unicorn/prefer-dom-node-text-content': 'error', // 建议使用 textContent 而不是 innerText
    'unicorn/prefer-includes': 'error', // 建议使用 includes() 而不是 indexOf()
    'unicorn/prefer-keyboard-event-key': 'error', // 建议使用 key 属性而不是 keyCode
    'unicorn/prefer-math-trunc': 'error', // 建议使用 Math.trunc() 而不是其他方法
    'unicorn/prefer-modern-dom-apis': 'error', // 建议使用现代 DOM API
    'unicorn/prefer-modern-math-apis': 'error', // 建议使用现代 Math API
    'unicorn/prefer-module': 'error', // 建议使用 ES 模块而不是其他模块系统
    'unicorn/prefer-negative-index': 'error', // 建议使用负索引而不是 length 计算
    'unicorn/prefer-node-protocol': 'error', // 建议使用 node: 协议导入核心模块
    'unicorn/prefer-number-properties': 'error', // 建议使用 Number 的属性而不是全局函数
    'unicorn/prefer-object-from-entries': 'error', // 建议使用 Object.fromEntries()
    'unicorn/prefer-optional-catch-binding': 'error', // 建议使用可选的 catch 绑定
    'unicorn/prefer-prototype-methods': 'error', // 建议使用原型方法而不是实例方法
    'unicorn/prefer-query-selector': 'error', // 建议使用 querySelector 而不是 getElementById
    'unicorn/prefer-reflect-apply': 'error', // 建议使用 Reflect.apply() 而不是 Function.prototype.apply
    'unicorn/prefer-regexp-test': 'error', // 建议使用 regexp.test() 而不是 String.prototype.match
    'unicorn/prefer-set-has': 'error', // 建议使用 set.has() 而不是其他方法
    'unicorn/prefer-set-size': 'error', // 建议使用 set.size 而不是其他方法
    'unicorn/prefer-spread': 'error', // 建议使用展开操作而不是 Object.assign 等
    'unicorn/prefer-string-replace-all': 'error', // 建议使用 replaceAll() 而不是 replace() 与正则表达式
    'unicorn/prefer-string-slice': 'error', // 建议使用 slice() 而不是 substring()
    'unicorn/prefer-string-starts-ends-with': 'error', // 建议使用 startsWith() 和 endsWith()
    'unicorn/prefer-string-trim-start-end': 'error', // 建议使用 trimStart() 和 trimEnd()
    'unicorn/prefer-switch': 'error', // 建议使用 switch 语句而不是多个 if-else
    'unicorn/prefer-ternary': 'error', // 建议使用三元表达式而不是简单的 if-else
    'unicorn/prefer-top-level-await': 'error', // 建议使用顶层 await
    'unicorn/prefer-type-error': 'error', // 建议抛出 TypeError 而不是 Error
    'unicorn/relative-url-style': 'error', // 强制使用一致的相对 URL 样式
    'unicorn/require-array-join-separator': 'error', // 要求 array.join() 提供分隔符
    'unicorn/require-number-to-fixed-digits-argument': 'error', // 要求 toFixed() 提供数字参数
    'unicorn/template-indent': 'error', // 强制模板字符串缩进一致
    'unicorn/text-encoding-identifier-case': 'error', // 强制文本编码标识符使用正确的大小写
    'unicorn/throw-new-error': 'error', // 强制使用 new Error() 抛出错误

    // 代码风格规则
    'prettier/prettier': 'error', // 强制执行 Prettier 代码风格
    'no-console': ['warn', { allow: ['warn', 'error'] }], // 警告使用 console，但允许 console.warn 和 console.error
    'no-debugger': 'error', // 禁止使用 debugger 语句
    'no-alert': 'error', // 禁止使用 alert, confirm, prompt
    'no-eval': 'error', // 禁止使用 eval()
    'no-implied-eval': 'error', // 禁止使用隐含的 eval()
    'no-new-func': 'error', // 禁止使用 Function 构造函数
    'no-script-url': 'error', // 禁止使用 javascript: URL
    'no-iterator': 'error', // 禁止使用 __iterator__ 属性
    'no-proto': 'error', // 禁止使用 __proto__ 属性
    'no-with': 'error', // 禁止使用 with 语句
    'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 0 }], // 限制空行数量，最多连续 1 个空行，文件末尾无空行
    eqeqeq: ['error', 'always'], // 强制使用严格相等运算符 (=== 和 !==)
    curly: ['error', 'all'], // 强制所有控制语句使用大括号
    'max-len': ['warn', { code: 120 }], // 警告行长度超过 120 个字符
    complexity: ['warn', 15], // 警告函数复杂度超过 15
    'max-depth': ['warn', 3], // 警告代码块嵌套深度超过 3 层
    'max-params': ['warn', 4], // 警告函数参数超过 4 个
    'max-lines-per-function': ['warn', 200] // 警告函数行数超过 200 行
  },
  files: ['apps/**/*.{ts,tsx}', 'packages/**/*.{ts,tsx}']
})
