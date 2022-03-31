const { ipcRenderer } = require('electron')

// ipcRenderer.send('upgrading', url + 'latest.zip') // 用来触发热更新函数

function contrastVersion(loacVasion) {
    console.log(loacVasion);
}

if (false) {
    // 热更新下载进度
    ipcRenderer.on('hotDownloadProgress', (event, percent) => {
    })
    // 资源替换完成，重启app完成更新
    ipcRenderer.on('isUpdateHotNow', (event) => {
        ipcRenderer.send('appRelaunch')
    })
    // 热更新失败
    ipcRenderer.on('hot-updata-error', (event) => {
    })
}

module.exports = contrastVersion
