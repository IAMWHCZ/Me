import path from 'node:path'
import fs from 'fs'
import { fileURLToPath } from 'url'
import { ConfigExport } from 'rolldown'

const __filename = fileURLToPath(import.meta.url)

const __dirname = path.dirname(__filename)

const packages = ['utils', 'components']

function getPackageRoot() {
  const packageRoots = packages.map(pkg => path.resolve(__dirname, '../../packages', pkg))
  return packageRoots
}

async function getPackageJsonAsync(root: string) {
  const packageJsonPath = path.resolve(root, 'package.json')
  const packageJson = await fs.promises.readFile(packageJsonPath, 'utf-8')
  const content = JSON.parse(packageJson)
  return content
}

async function getRolldownConfigAsync(root: string): Promise<ConfigExport> {
  const packageJson = await getPackageJsonAsync(root)
  const { name, format = 'esm' } = packageJson.buildOptions || {}
  const dist = path.resolve(root, './dist')
  const entry = path.resolve(root, './src/index.ts')

  const rolldownOptions: ConfigExport = {
    input: entry,
    external: ['react'],
    plugins: [],
    output: {
      dir: dist,
      format: format,
      sourcemap: true,
      entryFileNames: '[name].js',
      chunkFileNames: 'chunks/[name]-[hash].js',
      assetFileNames: 'assets/[name]-[hash][extname]'
    }
  }

  return rolldownOptions
}

export { getPackageRoot, getPackageJsonAsync, getRolldownConfigAsync }
