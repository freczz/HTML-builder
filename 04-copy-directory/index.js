const fs = require('fs')
const path = require('path');

async function copyFiles() {
   const items = await fs.promises.readdir(__dirname, { withFileTypes: true })
   for (item of items) {
      if (!item.isFile() && item.name != path.join('files-copy')) {
         fs.mkdir('04-copy-directory/files-copy', err => {
            if (err) {
               console.log('Папка успешно актуализирована')
               return
            }
            console.log('Папка успешно создана и актуализирована')
         })
      }
   }

   const filesCopy = await fs.promises.readdir(path.join(__dirname, 'files-copy'))
   for (fileCopy of filesCopy) {
      fs.unlink(path.join(__dirname, `files-copy/${fileCopy}`), err => { if (err) throw err })
   }

   const files = await fs.promises.readdir(path.join(__dirname, 'files'))
   for (file of files) {
      fs.copyFile(path.join(__dirname, `files/${file}`), path.join(__dirname, `files-copy/${file}`), err => { if (err) throw err })
   }
}
copyFiles()
