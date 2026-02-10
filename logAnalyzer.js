const fs = require("fs");
const readline = require("readline");

const logFile = process.argv[2];

if (!logFile) {
  console.log("Usage: node logAnalyzer.js <logfile>");
  process.exit(1);
}

let totalLines = 0;
let errorCount = 0;
let warningCount = 0;

const rl = readline.createInterface({
  input: fs.createReadStream(logFile),
  crlfDelay: Infinity
});

rl.on("line", (line) => {
  totalLines++;
  if (line.includes("ERROR")) errorCount++;
  if (line.includes("WARNING")) warningCount++;
});

rl.on("close", () => {
  console.log("Log File Summary");
  console.log("----------------");
  console.log("Total Lines:", totalLines);
  console.log("Errors:", errorCount);
  console.log("Warnings:", warningCount);
});
