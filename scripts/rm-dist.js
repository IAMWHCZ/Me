#!/usr/bin/env node

const { execSync } = require("node:child_process");
const fs = require("node:fs");

/**
 * Script to remove all dist directories in the project
 */

function removeDistDirectories() {
	console.log("Removing all dist directories...");

	try {
		// Find all dist directories
		const findCommand = 'find . -name "dist" -type d';
		const output = execSync(findCommand, { encoding: "utf8" }).trim();
		const directories = output ? output.split("\n") : [];

		if (directories.length === 0) {
			console.log("No dist directories found.");
			return;
		}

		console.log(`Found ${directories.length} dist directories to remove:`);

		// Remove each directory
		directories.forEach((dir) => {
			if (dir) {
				console.log(`Removing: ${dir}`);
				fs.rmSync(dir, { recursive: true, force: true });
				console.log(`Successfully removed: ${dir}`);
			}
		});

		console.log("All dist directories have been removed.");
	} catch (error) {
		console.error("Error removing dist directories:", error.message);
		process.exit(1);
	}
}

removeDistDirectories();
