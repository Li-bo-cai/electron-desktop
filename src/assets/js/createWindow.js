const { app, BrowserWindow, screen } = require('electron')
// window 会被自动地关闭
let mainWindow = null;
// 定义一个托盘
let tray = null
function createWindow(url, iconPath) {
    // 获取屏幕当前宽高
    const { width, height } = screen.getPrimaryDisplay().workAreaSize;
    // 创建浏览器窗口。
    mainWindow = new BrowserWindow({
        width: width / 2,
        height: height / 2,
        icon: iconPath,
        webPreferences: {
            nodeIntegration: true,
        }
    });
    // 设置不需要菜单选项
    mainWindow.setMenu(null)

    // 打开开发工具
    mainWindow.openDevTools();

    // 窗口中间打开
    mainWindow.center()

    // 加载应用的 index.html
    mainWindow.loadURL(url);
}

module.exports = createWindow