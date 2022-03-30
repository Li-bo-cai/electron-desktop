const path = require('path')
const http = require('http')
const fs = require('fs')
const dir = path.resolve(__dirname, '../')
const AdmZip = require('adm-zip')
// const { beforeWriteAppLog } = require('./export.js')

const upgradeFn = function (appResourcesUrl) {
  var destUrl = `${dir}/latest.zip`
  downloadFile(appResourcesUrl, destUrl, (state, data) => {
    if (state === 'progress') {
      global.mainWindow.webContents.send('hotDownloadProgress', data)  // 通知渲染进程更新资源下载进度
    } else if (state === 'Download completed') {
    } else if (state === 'finish') {
      try {
        var zip = new AdmZip(destUrl)
        zip.getEntries()
        zip.extractAllTo(dir, true)
        deleteFile(destUrl)
        global.mainWindow.webContents.send('isUpdateHotNow') // 通知渲染进程更新资源下载完成
      } catch (err) {
        errorFn('AdmZip', err)
        global.mainWindow.webContents.send('hot-updata-error') // 通知渲染进程更新资源下载错误
      }
    } else if (state === 'error') {
      errorFn('hot-updata-downloadFile', 'stream error' + data)
      global.mainWindow.webContents.send('hot-updata-error')
    }
  })
}
/*
 * url 网络文件地址
 * dest 文件存储位置
 * cb 回调函数
 */
const downloadFile = (url, dest, cb = () => { }) => {
  const stream = fs.createWriteStream(dest)
  http.get(url, (res) => {
    if (res.statusCode !== 200) {
      cb('error', 'response.statusCode error:' + res.statusCode)
      return
    }
    // 进度
    const len = parseInt(res.headers['content-length']) // 文件总长度
    let cur = 0
    const total = (len / 1048576).toFixed(2) // 转为M 1048576 - bytes in  1Megabyte
    res.on('data', function (chunk) {
      cur += chunk.length
      const progress = (100.0 * cur / len).toFixed(2) // 当前下载进度百分比
      const currProgress = (cur / 1048576).toFixed(2) // 当前下载大小
      console.log(progress, currProgress, total)
      cb('progress', progress)
    })
    res.on('end', () => {
      cb('Download completed')
    })
    // 超时,结束等
    stream.on('finish', () => {
      stream.close(cb('finish'))
    }).on('error', (err) => {
      deleteFile(dest)
      if (cb) cb('error', 'stream error:' + err.message)
    })
    res.pipe(stream)
  })
}
/*
 *  删除文件
 */
function deleteFile(url) {
  fs.unlink(url, function (err) {
    if (err) {
      errorFn('deleteFile', JSON.stringify(err))
    }
  })
}

module.exports = upgradeFn 