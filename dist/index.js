import fs from "node:fs";
import { flattenData } from "./flattenData.js";
import { randomUUID } from "node:crypto";
import { flattenSort } from "./flattenSort.js";
const unsanitizedFilePath = process.argv[2];
const resultFile = process.argv[3] ?? `sanitized-${randomUUID().split("-")[0]}.txt`;
if (!unsanitizedFilePath)
    throw new Error("Provide a file path argument");
const contents = fs.readFileSync(unsanitizedFilePath, "utf-8");
const { result, errors } = flattenData(contents);
fs.writeFileSync(resultFile, result, "utf-8");
if (errors) {
    errors.forEach((err) => console.log(err));
}
console.log("Also creating sorted file");
flattenSort(contents);
console.log(`\nResults written to: ${resultFile}`);
//# sourceMappingURL=index.js.map