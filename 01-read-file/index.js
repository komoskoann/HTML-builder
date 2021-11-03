const stdout = process.stdout;
const fs = require('fs');
const path = require('path').join(__dirname, 'text.txt');
const stream = fs.createReadStream(path, 'utf-8');

async function readFile(fileName) {
  let data = '';
  stream.on('data', partData => data += partData);
  stream.on('end', () => stdout.write(data));
}
readFile(path);