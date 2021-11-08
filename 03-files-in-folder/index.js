const fs = require('fs')
const path = require('path')

async function getFiles() {
   const items = await fs.promises.readdir(path.join(__dirname, 'secret-folder'), { withFileTypes: true });
   for (const item of items) {
      if (item.isFile()) {
         const file = path.join(__dirname, `secret-folder/${item.name}`)
         await fs.stat(file, async (err, data) => {
            console.log(`<${path.parse(file).name}>-<${path.parse(file).ext.slice(1)}>-<${Math.round(data.size / 1024)}kb>`)
            console.log('----------------------')
         })
      }
   }
   console.log('Result:\n----------------------')
}
getFiles()
