import { describe, expect, it } from "vitest";

describe("Example test", () => {
	it("should pass", () => {
		expect(1 + 1).toBe(2);
	});

	it("should handle async operations", async () => {
		const promise = Promise.resolve(42);
		await expect(promise).resolves.toBe(42);
	});
});
