/**
 * Convert:
 * John, Smith  587
 * John, Smith  373
 *
 * To:
 * John, Smith  587, 373
 */
export function flattenData(contents) {
    const data = contents.split("\n");
    let result = "";
    const last = { firstName: "", lastName: "" };
    for (const line of data) {
        const rgx = new RegExp(/(\w+),\s+(\w+)\s+(\d+)/gm);
        const lineData = rgx.exec(line);
        if (!lineData) {
            throw new Error(`Possible invalid line format: '${line}'`);
        }
        const [firstName, lastName, pageNumber] = lineData.slice(1);
        const isDup = last.firstName === firstName && last.lastName === lastName;
        if (isDup) {
            result += `, ${pageNumber}`;
        }
        else {
            const prependNL = result !== "" && !result.endsWith("\n");
            result += `${prependNL ? "\n" : ""}${line}`;
        }
        last.firstName = firstName;
        last.lastName = lastName;
    }
    return result;
}
//# sourceMappingURL=flattenData.js.map