import { randomUUID } from "crypto";
import { getLines } from "./flattenData.js";
import fs from "node:fs";
export function flattenSort(data) {
    const lines = getLines(data);
    const authors = {};
    let i = 0;
    for (const line of lines) {
        ++i;
        const rgx = new RegExp(/(.*),\s+(.*)\s+(\d+)/gm);
        const lineData = rgx.exec(line);
        if (!lineData) {
            authors[line] = [];
            console.warn(`Possible invalid line format on line ${i}: ${line}`);
        }
        else {
            const [lastName, firstName, pageNumber] = lineData.slice(1);
            const concat = `${lastName}, ${firstName}`;
            authors[concat] = authors[concat] ?? [];
            authors[concat].push(Number(pageNumber));
        }
    }
    const names = Object.keys(authors).sort();
    let result = "";
    console.log(names);
    // names.forEach((name) => {
    //     result += `${name}\t${authors[result].join(", ")}`;
    // });
    //
    // // return result;
    // fs.writeFileSync(`sanitized-${randomUUID()}.txt`, result, "utf-8");
}
//# sourceMappingURL=flattenSort.js.map