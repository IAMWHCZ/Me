import path from 'node:path'
import fs from 'fs'
import { getPackageRoot } from './buildBase'

async function clearPackages() {
  console.clear()

  const packageRoots = getPackageRoot()

  console.log('🧹 Cleaning up built files...')

  for (const root of packageRoots) {
    const packageName = path.basename(root)
    const distPath = path.resolve(root, './dist')

    try {
      // Check if dist directory exists
      await fs.promises.access(distPath)

      // Remove the dist directory
      await fs.promises.rm(distPath, { recursive: true, force: true })

      console.log(`✅ Successfully removed dist directory for package: ${packageName}`)
    } catch (error) {
      // If directory doesn't exist, that's fine
      if ((error as any).code === 'ENOENT') {
        console.log(`ℹ️ No dist directory found for package: ${packageName}`)
      } else {
        console.error(`❌ Failed to remove dist directory for package: ${packageName}`)
        console.error(error)
        process.exit(1)
      }
    }
  }
  console.log('🎉 All built files have been cleared!')
}

clearPackages()
