import { describe, test, expect } from "vitest";
import { flattenData } from "../src/flattenData.js";
import fs from "node:fs";

describe("flattenData", () => {
    test("example file", () => {
        const unsanitized = fs.readFileSync("./test/unsanitized.txt", "utf-8");
        const sanitized = fs.readFileSync("./test/sanitized.txt", "utf-8");

        const flattened = flattenData(unsanitized);

        expect(flattened).toEqual(sanitized);
    });
});
