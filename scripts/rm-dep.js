#!/usr/bin/env node

const { execSync } = require('child_process')
const fs = require('fs')
const path = require('path')

/**
 * Script to remove all node_modules directories in the project
 */

function removeNodeModules() {
  console.log('Removing all node_modules directories...')

  try {
    // Find all node_modules directories
    const findCommand = 'find . -name "node_modules" -type d'
    const output = execSync(findCommand, { encoding: 'utf8' }).trim()
    const directories = output ? output.split('\n') : []

    if (directories.length === 0) {
      console.log('No node_modules directories found.')
      return
    }

    console.log(`Found ${directories.length} node_modules directories to remove:`)

    // Remove each directory
    directories.forEach((dir) => {
      if (dir) {
        console.log(`Removing: ${dir}`)
        fs.rmSync(dir, { recursive: true, force: true })
        console.log(`Successfully removed: ${dir}`)
      }
    })

    console.log('All node_modules directories have been removed.')
  } catch (error) {
    console.error('Error removing node_modules directories:', error.message)
    process.exit(1)
  }
}

removeNodeModules()
