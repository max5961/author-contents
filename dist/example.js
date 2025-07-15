import fs from "node:fs";
import { flattenData } from "./flattenData.js";
const unsanitized = fs.readFileSync("./test/unsanitized.txt", "utf-8");
const flattened = flattenData(unsanitized);
fs.writeFileSync("/home/max/repos/author-contents/result.txt", flattened, "utf-8");
//# sourceMappingURL=example.js.map