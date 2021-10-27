const fs = require('fs');
const chalk = require('chalk')
let stream = fs.createReadStream('01-read-file/text.txt', { encoding: 'utf-8' });
stream.on('data', (data) => { console.log(chalk.green(data)) })
