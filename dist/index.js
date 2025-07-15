import fs from "node:fs";
import { flattenData } from "./flattenData.js";
import { randomUUID } from "node:crypto";
const unsanitizedFilePath = process.argv[2];
const resultFile = process.argv[3] ?? `sanitized-${randomUUID().split("-")[0]}.txt`;
if (!unsanitizedFilePath)
    throw new Error("Provide a file path argument");
const contents = fs.readFileSync(unsanitizedFilePath, "utf-8");
const results = flattenData(contents);
fs.writeFileSync(resultFile, results, "utf-8");
console.log(`Results written to: ${resultFile}`);
//# sourceMappingURL=index.js.map