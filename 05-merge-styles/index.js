const fs = require('fs')
const path = require('path');

async function merge() {
   const items = await fs.promises.readdir(path.join(__dirname, 'styles'), { withFileTypes: true })
   for (item of items) {
      let stream = fs.createReadStream(path.join(__dirname, `styles/${item.name}`), { encoding: 'utf-8' })

      fs.writeFile(path.join(__dirname, 'project-dist/bundle.css'), '', 'utf-8', (err) => { if (err) throw err })

      fs.truncate(path.join(__dirname, 'project-dist/bundle.css'), 0, (err) => { if (err) throw err; })

      if (path.extname(item.name) == '.css') {
         stream.on('data', (data) => {
            fs.appendFile(path.join(__dirname, 'project-dist/bundle.css'), data, (err) => { if (err) throw err })
         })
      }
   }
   console.log('Файл создан')
}
merge()
