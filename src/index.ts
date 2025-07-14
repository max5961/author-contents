import fs from "node:fs";
import { flattenData } from "./flattenData.js";
import { randomUUID } from "node:crypto";

const fpath = process.argv[2];
if (!fpath) throw new Error("Provide a file path argument");

const contents = fs.readFileSync(fpath, "utf-8");

const results = flattenData(contents);
const newFileName = `sanitized-${randomUUID().split("-")[0]}.txt`;

fs.writeFileSync(newFileName, results, "utf-8");

console.log(`Results written to: ${newFileName}`);
