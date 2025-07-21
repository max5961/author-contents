/**
 * Convert:
 * John, Smith  587
 * John, Smith  373
 *
 * To:
 * John, Smith  587, 373
 */
export function flattenData(contents) {
    const lines = getLines(contents);
    const errors = [];
    let result = "";
    let lineNum = 0;
    const last = { firstName: "", lastName: "" };
    for (let line of lines) {
        // In case file contents contains anything like "\n\r" or "\r\r"
        if (!line || line === "\r" || line === "\n")
            continue;
        ++lineNum;
        if (line.endsWith("\r")) {
            line = pop(line);
        }
        const rgx = new RegExp(/(.*),\s+(.*)\s+(\d+)/gm);
        const lineData = rgx.exec(line);
        if (!lineData) {
            errors.push(`Possible invalid line format on line ${lineNum}: '${line}'.  Line pushed as is.`);
            result += `\r${line}\r`;
            continue;
        }
        const [firstName, lastName, pageNumber] = lineData.slice(1);
        const isDup = last.firstName === firstName && last.lastName === lastName;
        if (isDup) {
            if (result.endsWith("\r") || result.endsWith("\n")) {
                result = pop(result);
            }
            result += `, ${pageNumber}`;
        }
        else {
            const prependCR = result !== "" && !result.endsWith("\r");
            result += `${prependCR ? "\r" : ""}${line}`;
        }
        last.firstName = firstName;
        last.lastName = lastName;
    }
    return { result, errors };
}
function pop(s) {
    return s.slice(0, s.length - 1);
}
/**
 * In case file contains \n instead of \r
 */
export function getLines(contents) {
    const data = contents.replace(/\n/gm, "\r");
    return data.split("\r");
}
//# sourceMappingURL=flattenData.js.map