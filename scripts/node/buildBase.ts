import path from 'node:path'
import fs from 'fs'
import { fileURLToPath } from 'url'
import { ConfigExport, OutputOptions } from 'rolldown'

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

async function getRolldownConfigAsync(root: string, format?: string): Promise<ConfigExport> {
  const packageJson = await getPackageJsonAsync(root)
  const { name, format: packageFormat = 'esm' } = packageJson.buildOptions || {}
  const dist = path.resolve(root, './dist')
  const entry = path.resolve(root, './src/index.ts')

  // Use the provided format or fall back to the package format
  const buildFormat = format || packageFormat

  // Create format-specific subdirectory
  const formatDir = path.resolve(dist, buildFormat)

  // Check if this is the utils package (no React dependencies)
  const isUtilsPackage = path.basename(root) === 'utils'

  const rolldownOptions: ConfigExport = {
    input: entry,
    external: isUtilsPackage ? [] : ['react'],
    plugins: [],
    output: {
      dir: formatDir,
      format: buildFormat as 'esm' | 'cjs' | 'iife' | 'umd',
      sourcemap: true,
      entryFileNames: '[name].js',
      chunkFileNames: 'chunks/[name]-[hash].js',
      assetFileNames: 'assets/[name]-[hash][extname]'
    }
  }

  return rolldownOptions
}

export { getPackageRoot, getPackageJsonAsync, getRolldownConfigAsync }
