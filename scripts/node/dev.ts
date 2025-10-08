import path from 'node:path'
import fs from 'fs'
import { watch } from 'rolldown'
import { getPackageRoot, getRolldownConfigAsync } from './buildBase'

async function devPackages() {
  const packageRoots = getPackageRoot()

  console.log('🚀 Starting development mode...')

  for (const root of packageRoots) {
    const packageName = path.basename(root)
    console.log(`Watching package: ${packageName}`)

    try {
      // Ensure dist directory exists
      const distPath = path.resolve(root, './dist')
      await fs.promises.mkdir(distPath, { recursive: true })

      // Get rolldown config
      const config = (await getRolldownConfigAsync(root)) as any

      // Start watching with rolldown
      const watcher = watch(config)

      watcher.on('event', event => {
        if (event.code === 'START') {
          console.log(`🔄 Building ${packageName}...`)
        } else if (event.code === 'END') {
          console.log(`✅ Successfully built ${packageName}`)
        } else if (event.code === 'ERROR') {
          console.error(`❌ Error building ${packageName}:`)
          console.error(event.error)
        }
      })

      console.log(`👀 Watching for changes in ${packageName}...`)
    } catch (error) {
      console.error(`❌ Failed to start watching package: ${packageName}`)
      console.error(error)
      process.exit(1)
    }
  }

  console.log('🎉 All packages are now being watched for changes!')
}

devPackages()
