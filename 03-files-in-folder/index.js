const fs = require('fs').promises;
const path = require('path');
const dirPath = path.join(__dirname, 'secret-folder');

async function readDir() {
  return fs.readdir(dirPath, {withFileTypes: true});
}

async function getStat(path) {
  return fs.stat(path);
}

async function main() {
  const files = await readDir();
  files.forEach(processFile);
}

async function processFile(file) {
  if(file.isFile()) {
    let filePath = path.join(dirPath, file.name);
    let fileExt = path.extname(filePath);
    let fileName = path.basename(filePath, fileExt);  
    let stat = await getStat(filePath);
    let fileSize = stat.size / 1000;
    console.log(`${fileName} - ${fileExt.slice(1)} - ${fileSize}kb`);
  }
}

main();






