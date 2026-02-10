const fs = require("fs");
const path = require("path");

const [,, sourceDir, targetDir] = process.argv;

if (!sourceDir || !targetDir) {
  console.log("Usage: node fileSync.js <sourceDir> <targetDir>");
  process.exit(1);
}


function syncDirectories(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  const files = fs.readdirSync(src);

  files.forEach(file => {
    const srcPath = path.join(src, file);
    const destPath = path.join(dest, file);

    const stat = fs.statSync(srcPath);

    if (stat.isDirectory()) {
      syncDirectories(srcPath, destPath);
    } else {
      if (!fs.existsSync(destPath)) {
        fs.copyFileSync(srcPath, destPath);
        console.log(`Copied: ${file}`);
      }
    }
  });
}

try {
  syncDirectories(sourceDir, targetDir);
  console.log("Synchronization complete");
} catch (err) {
  console.error("Sync error:", err.message);
}
