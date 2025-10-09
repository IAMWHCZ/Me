import path from 'node:path'
import fs from 'fs'
import { watch } from 'rolldown'
import { getPackageRoot, getPackageJsonAsync, getRolldownConfigAsync } from './buildBase'

async function devPackages() {
  const packageRoots = getPackageRoot()

  console.log('🚀 Starting development mode...')

  for (const root of packageRoots) {
    const packageName = path.basename(root)
    console.log(`Watching package: ${packageName}`)

    try {
      // Get package.json to check for multiple formats
      const packageJson = await getPackageJsonAsync(root)
      const { format = 'esm' } = packageJson.buildOptions || {}

      // Support multiple formats
      const formats = Array.isArray(format) ? format : [format]

      // Watch for each format
      for (const fmt of formats) {
        console.log(`  Watching format: ${fmt}`)

        // Ensure dist directory exists
        const distPath = path.resolve(root, './dist', fmt)
        await fs.promises.mkdir(distPath, { recursive: true })

        // Get rolldown config for this format
        const config = (await getRolldownConfigAsync(root, fmt)) as any

        // Start watching with rolldown
        const watcher = watch(config)

        watcher.on('event', event => {
          if (event.code === 'START') {
            console.log(`🔄 Building ${packageName} (${fmt})...`)
          } else if (event.code === 'END') {
            console.log(`✅ Successfully built ${packageName} (${fmt})`)
          } else if (event.code === 'ERROR') {
            console.error(`❌ Error building ${packageName} (${fmt}):`)
            console.error(event.error)
          }
        })

        console.log(`👀 Watching for changes in ${packageName} (${fmt})...`)
      }
    } catch (error) {
      console.error(`❌ Failed to start watching package: ${packageName}`)
      console.error(error)
      process.exit(1)
    }
  }

  console.log('🎉 All packages are now being watched for changes!')
}

devPackages()
