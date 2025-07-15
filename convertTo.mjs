#!/usr/bin/env node

/**
 * Because indesign needs carriage returns instead of newlines, its impossible
 * to view results in a practical way on Linux.  Since flattenData sanitizes with
 * \r, we also need a valid test file that has \r instead of \n
 */

import fs from "node:fs";

const lineDelimiter = process.argv[2] === "n" ? "\n" : "\r";
const fpath = process.argv[3];
const resultpath = process.argv[4];

const contents = fs.readFileSync(fpath, "utf-8");

let lastWasDelim = false;
let result = "";
for (let i = 0; i < contents.length; ++i) {
    if (contents[i] === "\n" || contents[i] === "\r") {
        if (lastWasDelim) {
            continue;
        }

        lastWasDelim = true;
        result += lineDelimiter;
    } else {
        lastWasDelim = false;
        result += contents[i];
    }
}

fs.writeFileSync(resultpath, result, "utf-8");
