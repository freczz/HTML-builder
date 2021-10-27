const fs = require('fs')
const path = require('path')
const chalk = require('chalk')

async function getFiles() {
   const items = await fs.promises.readdir(path.join(__dirname, 'secret-folder'), { withFileTypes: true });
   for (const item of items) {
      if (item.isFile()) {
         const file = path.join(__dirname, `secret-folder/${item.name}`)
         await fs.stat(file, async (err, data) => {
            console.log(chalk.green(`<${path.parse(file).name}>-<${path.parse(file).ext.slice(1)}>-<${Math.round(data.size / 1024)}kb>`))
            console.log(chalk.blue('----------------------'))
         })
      }
   }
   console.log(chalk.blue('Result:\n----------------------'))
}
getFiles()
