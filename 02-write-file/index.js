const fs = require('fs');
const path = require('path').join(__dirname, 'text.txt');
const stdout = process.stdout;
const readlinePromises = require('readline');
const rl = readlinePromises.createInterface({
  input: process.stdin,
  output: process.stdout,
});

fs.writeFile(
  path,
  '',
  (err) => {
    if (err) throw err;
  }
);

async function writeToFile(path, answer) {
  if(answer !== 'exit') {
    fs.appendFile(
      path,
      `${answer}\n`,
      (err) => {
        if (err) throw err;
      }
    )    
  } else {
    sayGoodBuy();
  }
}

rl.question(`Hi! Enter some text, please\n`, (answer) => {
  writeToFile(path, answer);
})

rl.on('line', (answer) => {
  writeToFile(path, answer);
})

async function sayGoodBuy() {
  stdout.write('Good bye');
  rl.close();
}

rl.on('SIGINT', () => {
  sayGoodBuy();
})