const { app } = require('electron')
const path = require('path')
const fs = require('fs')
const os = require('os')
const http = require('http')
const AdmZip = require('adm-zip')

const downLoadZip = () =>
  new Promise((resolve, reject) => {
    const tmpDir = os.tmpdir() // 电脑的缓存目录
    const filename = path.resolve(tmpDir, `update-${new Date().getTime()}.zip`)
    const file = fs.createWriteStream(filename)
    http.get('更改成自己的下载地址', res => {
      res.pipe(file)
      res.on('end', () => {
        resolve(filename)
      })
      res.on('error', err => {
        reject(err)
      })
    })
  })

const hotUpdate = () => {
  const appPath = app.getAppPath() // 该方法可以获取程序app.asar的目录
  const replacePath = path.resolve(appPath, '../app.asar.unpacked/dist/electron') // 通过path.resolve组装成我们需要的路径
  downLoadZip().then(filename => {
    const zip = new AdmZip(filename) // 该工具可以压缩和解压，具体请自己去查看
    zip.extractAllTo(replacePath, true)
    app.relaunch()
    app.exit()
  })
}

module.exports = {
  hotUpdate
}