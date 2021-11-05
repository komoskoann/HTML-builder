const fs = require('fs').promises;
const path = require('path');

const projectDistPath = path.join(__dirname, 'project-dist');
const templatePath = path.join(__dirname, 'template.html');
const indexPath = path.join(projectDistPath, 'index.html');
const stylePath = path.join(projectDistPath, 'style.css');
const destAssetsPath = path.join(projectDistPath, 'assets');
const srcAssetsPath = path.join(__dirname, 'assets');
const dirStylesPath = path.join(__dirname, 'styles');
const dirComponentsPath = path.join(__dirname, 'components');

async function main() {
  
  await deleteNewDir(projectDistPath);
  await createNewDir(projectDistPath);
  await createFile(indexPath, '');
  await createFile(stylePath, '');
  await createNewDir(destAssetsPath);

  await copyAssets();
  await fillStyleFile();
  await fillIndexFile();
}

async function deleteNewDir(path) {
  return fs.rmdir(path, {recursive: true});
}

async function createNewDir(path) {
  return fs.mkdir(path, {recursive: true});
}

async function createFile(path, data) {
  return fs.writeFile(path, data);
}

async function readDir(path) {
  return fs.readdir(path, {withFileTypes: true});
}

async function readFile(path) {
  return fs.readFile(path, 'utf-8');
}

async function copyFile(src, dest) {
  return fs.copyFile(src, dest)
}

async function writeToFile(path, data) {
  return fs.appendFile(path, data);
}

async function processFile(file, srcAssetsPath, destAssetsPath) {
  let srcFilePath = path.join(srcAssetsPath, file.name);
  let destFilePath = path.join(destAssetsPath, file.name);
  if(file.isFile()) {
    await copyFile(srcFilePath, destFilePath);
  } else if(file.isDirectory()) {
    await createNewDir(destFilePath);
    const files = await readDir(srcFilePath);
    files.forEach(file => processFile(file, srcFilePath, destFilePath));
  }
}

async function copyAssets() {
  const files = await readDir(srcAssetsPath);
  files.forEach(file => processFile(file, srcAssetsPath, destAssetsPath));
}

async function fillStyleFile() {
  let data = [];
  const styles = await readDir(dirStylesPath);
  for (let style of styles) {
    let stylePath = path.join(dirStylesPath, style.name);
    let styleExt = path.extname(stylePath);
    if(style.isFile() && styleExt === '.css') {
      data.push(await readFile(stylePath));
    }
  }
  await writeToFile(stylePath, data.join('\n'));
}

async function fillIndexFile() {
  let templateText = await readFile(templatePath);
  let components = await readDir(dirComponentsPath);
  for(let component of components) {
    let filePath = path.join(dirComponentsPath, component.name);
    let fileExt = path.extname(filePath);
    let fileName = path.basename(filePath, fileExt);
    let componentText = await readFile(filePath);
    templateText = templateText.replace(new RegExp(`{{${fileName}}}`,'g'), componentText);
  }
  await writeToFile(indexPath, templateText);
}

main();