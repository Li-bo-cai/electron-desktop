const path = require('path');
const { BrowserWindow } = require('electron')

function test(url) {
    // const btn = document.querySelector('#btn');
    // setTimeout(() => {
    win = new BrowserWindow({
        width: 500,
        height: 400,
        webPreferences: {
            nodeIntegration: true
        }
    })
    win.loadURL(url)
    // win.loadURL(path.join('file://', __dirname, '../../test.html'));
    win.on('close', () => { win = null });
    // }, 1000)

}

module.exports = test