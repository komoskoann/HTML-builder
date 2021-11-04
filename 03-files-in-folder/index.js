const fs = require('fs').promises;
const path = require('path').join(__dirname, 'secret-folder');;


async function readDir() {
  return fs.readdir(path, {withFileTypes: true});
}

async function main() {
  const files = await readDir();
  datas.forEach(data => {
    console.log(data.isFile);
    console.log(data.isDirectory);
  })
}

main()






