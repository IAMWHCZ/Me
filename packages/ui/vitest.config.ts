import path from "node:path";
import { defineConfig } from "vitest/config";

export default defineConfig({
	test: {
		globals: true,
		environment: "jsdom",
		setupFiles: ["./src/test/setup.ts"],
	},
	resolve: {
		alias: {
			"@me/icons": path.resolve(__dirname, "../../icons/src"),
			"@me/shared": path.resolve(__dirname, "../../shared"),
		},
	},
});
