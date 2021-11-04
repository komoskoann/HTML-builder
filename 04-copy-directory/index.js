const fs = require('fs').promises;
const path = require('path');
const srcDirPath = path.join(__dirname, 'files');
const destDirPath = path.join(__dirname, 'files-copy');

async function main() {
  const delDir = await deleteNewDir(destDirPath);
  const newDir = await createNewDir(destDirPath);
  const files = await readDir(srcDirPath);
  files.forEach(processFile);
}

async function deleteNewDir(path) {
  return fs.rmdir(path, {recursive: true});
}

async function createNewDir(path) {
  return fs.mkdir(path, {recursive: true});
}

async function readDir(path) {
  return fs.readdir(path);
}

async function copyFile(src, dest) {
  return fs.copyFile(src, dest)
}

async function processFile(file) {
  let srcFilePath = path.join(srcDirPath, file);
  let destFilePath = path.join(destDirPath, file);
  await copyFile(srcFilePath, destFilePath);
}

main();