type Person = { firstName: string; lastName: string };

/**
 * Convert:
 * John, Smith  587
 * John, Smith  373
 *
 * To:
 * John, Smith  587, 373
 */
export function flattenData(contents: string): string {
    const data = contents.split("\n");

    let result = "";
    const last: Person = { firstName: "", lastName: "" };
    for (let line of data) {
        if (!line) continue;

        if (line.endsWith("\n")) {
            line = pop(line);
        }

        const rgx = new RegExp(/(.*),\s+(.*)\s+(\d+)/gm);
        const lineData = rgx.exec(line);
        if (!lineData) {
            throw new Error(`Possible invalid line format: '${line}'`);
        }

        const [firstName, lastName, pageNumber] = lineData.slice(1);
        const isDup = last.firstName === firstName && last.lastName === lastName;

        if (isDup) {
            if (result.endsWith("\r") || result.endsWith("\n")) {
                result = pop(result);
            }

            result += `, ${pageNumber}`;
        } else {
            const prependCR = result !== "" && !result.endsWith("\r");
            result += `${prependCR ? "\r" : ""}${line}`;
        }

        last.firstName = firstName;
        last.lastName = lastName;
    }

    return result;
}

function pop(s: string) {
    return s.slice(0, s.length - 1);
}
