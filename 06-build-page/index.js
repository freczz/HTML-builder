const fs = require('fs')
const path = require('path')
const chalk = require('chalk')
const ncp = require('ncp').ncp

//создание папки project-dist
async function createDir() {
   fs.mkdir('06-build-page/project-dist', err => { })
   console.log(chalk.green('Папка project-dist успешно создана и актуализирована'))
}
//копирование файлов из assets в project-dist
async function copyAssets() {
   fs.rm(path.join(__dirname, 'project-dist/assets'), { recursive: true }, (err) => {
      ncp(path.join(__dirname, 'assets'), path.join(__dirname, 'project-dist/assets'), (err) => { if (err) throw err })
   })
   console.log(chalk.green('Папка assets успешна перенесена'))
}
//объединение стилей в файл
async function createStyle() {
   const styles = await fs.promises.readdir(path.join(__dirname, 'styles'), { withFileTypes: true })

   for (style of styles) {
      let stream = fs.createReadStream(path.join(__dirname, `styles/${style.name}`), { encoding: 'utf-8' })
      fs.writeFile(path.join(__dirname, 'project-dist/style.css'), '', 'utf-8', (err) => { if (err) throw err })
      fs.truncate(path.join(__dirname, 'project-dist/style.css'), 0, (err) => { if (err) throw err })

      if (path.extname(style.name) == '.css') {
         stream.on('data', (data) => {
            fs.appendFile(path.join(__dirname, 'project-dist/style.css'), `${data}\n`, (err) => { if (err) throw err })
         })
      }
   }
   console.log(chalk.green('Файл style.css с объединенными стилями успешно создан'))
}
//создание файла index.html с разметкой из template.html
async function createHTML() {
   let data = ''
   const streamTemplate = fs.createReadStream(path.join(__dirname, 'template.html'), 'utf8')
   for await (const chunk of streamTemplate) { data += chunk }

   const streamIndex = fs.createWriteStream(path.join(__dirname, '/project-dist/index.html'))
   fs.truncate(path.join(__dirname, 'project-dist/index.html'), 0, (err) => { })

   const files = await fs.promises.readdir(path.join(__dirname, 'components'), { withFileTypes: true })

   for (const file of files) {
      let fileData = ''
      const streamFile = fs.createReadStream(path.join(__dirname, `components/${file.name}`), 'utf8')
      const item = path.parse(path.join(__dirname, `components/${file.name}`))

      if (file.isFile() && item.ext.slice(1) === 'html') for await (const chunk of streamFile) fileData += chunk

      data = data.replace(`{{${item.name}}}`, fileData)
   }
   streamIndex.write(data)
   console.log(chalk.green('Файл index.html с объединенными тегами успешно создан'))
}
//запуск всего скрипта
async function run() {
   await createDir()
   copyAssets()
   createStyle()
   createHTML()
}
run()
