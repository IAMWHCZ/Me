#!/usr/bin/env node

import path from 'node:path'
import fs from 'fs'
import { build } from 'rolldown'
import { getPackageRoot, getPackageJsonAsync, getRolldownConfigAsync } from './buildBase'

async function buildPackages() {
  const packageRoots = getPackageRoot()

  for (const root of packageRoots) {
    const packageName = path.basename(root)
    console.log(`Building package: ${packageName}`)

    try {
      // Get package.json to check for multiple formats
      const packageJson = await getPackageJsonAsync(root)
      const { format = 'esm' } = packageJson.buildOptions || {}

      // Support multiple formats
      const formats = Array.isArray(format) ? format : [format]

      // Build for each format
      for (const fmt of formats) {
        console.log(`  Building format: ${fmt}`)

        // Ensure dist directory exists
        const distPath = path.resolve(root, './dist', fmt)
        await fs.promises.mkdir(distPath, { recursive: true })

        // Get rolldown config for this format
        const config = (await getRolldownConfigAsync(root, fmt)) as any

        // Build with rolldown
        await build(config)

        console.log(`  ✅ Successfully built package: ${packageName} (${fmt})`)
      }
    } catch (error) {
      console.error(`❌ Failed to build package: ${packageName}`)
      console.error(error)
      process.exit(1)
    }
  }

  console.log('🎉 All packages built successfully!')
}

buildPackages()
