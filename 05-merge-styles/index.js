const fs = require('fs').promises;
const path = require('path');
const dirStylesPath = path.join(__dirname, 'styles');
const fileBundlePath = path.join(__dirname, 'project-dist', 'bundle.css');

async function main() {
  let bundledData = [];
  try { 
    await deleteFile(fileBundlePath);
  } catch {
  }
  await createFile(fileBundlePath, '');
  const styles = await readDirStyles(dirStylesPath);
  for (let style of styles) {
    let stylePath = path.join(dirStylesPath, style.name);
    let styleExt = path.extname(stylePath);
    if(style.isFile() && styleExt === '.css') {
      bundledData.push(await readStyleFile(stylePath));
    }
  }
  await writeBundleStyles(fileBundlePath, bundledData.join('\n'))
}

async function deleteFile(path) {
  return fs.rm(path, {recursive:true});
}

async function createFile(path, data) {
  return fs.writeFile(path, data);
}

async function readDirStyles(path) {
  return fs.readdir(path, {withFileTypes: true});
}

async function readStyleFile(path) {
  return fs.readFile(path, 'utf-8');
}

async function writeBundleStyles(path, data) {
  return fs.appendFile(path, data);
}

main();