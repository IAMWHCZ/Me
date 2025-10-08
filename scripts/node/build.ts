#!/usr/bin/env node

import path from 'node:path'
import fs from 'fs'
import { build } from 'rolldown'
import { getPackageRoot, getRolldownConfigAsync } from './buildBase'

async function buildPackages() {
  const packageRoots = getPackageRoot()

  for (const root of packageRoots) {
    const packageName = path.basename(root)
    console.log(`Building package: ${packageName}`)

    try {
      // Ensure dist directory exists
      const distPath = path.resolve(root, './dist')
      await fs.promises.mkdir(distPath, { recursive: true })

      // Get rolldown config
      const config = (await getRolldownConfigAsync(root)) as any

      // Build with rolldown
      await build(config)

      console.log(`✅ Successfully built package: ${packageName}`)
    } catch (error) {
      console.error(`❌ Failed to build package: ${packageName}`)
      console.error(error)
      process.exit(1)
    }
  }

  console.log('🎉 All packages built successfully!')
}

buildPackages()
