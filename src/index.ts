import { parseArgs } from "./lib/args";
import { generateTable } from "./lib/console";
import { readFilesSync } from "./lib/reader"
import { classifyFile } from "./lib/stats";
import { sizeToUnit } from "./unit";

const files = readFilesSync("./", false, true);

console.log("Total files:", files.length);

const totalSize = files.reduce((acc, file) => acc + file.size, 0)

console.log("Total size:", sizeToUnit(totalSize).roundToString());

const cat = classifyFile(files);

console.log("Total files in each category:");

const unknownFiles = cat.unknown;
const uniqueUnknownExtensions = [...new Set(unknownFiles)].filter((ext, index, arr) => arr.indexOf(ext) === index);

// console.log("Unknown file extensions:");
// uniqueUnknownExtensions.forEach(ext => console.log((typeof ext == "string" ? ext : ext.name).split(".").pop()));
console.log()
console.log(generateTable(cat))