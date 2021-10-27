const fs = require('fs');
const chalk = require('chalk');
const process = require('process');
const readline = require('readline');

const rl = readline.createInterface({
   input: process.stdin,
   output: process.stdout,
});

let stream;

console.log(chalk.blue('Write yout text: '));

rl.on('line', (data) => {
   if (!stream && data !== 'exit') stream = fs.createWriteStream('02-write-file/text.txt', { encoding: 'utf-8' })
   if (data === 'exit') {
      goodBye();
      process.exit();
   }
   stream.write(`${data} \n`);
   fs.createReadStream('02-write-file/text.txt', { encoding: 'utf-8' })
});

process.on('beforeExit', goodBye);

function goodBye() { console.log(chalk.green('See you next time!')) }
