// 保持一个对于 window 对象的全局引用，不然，当 JavaScript 被 GC
const { app, BrowserWindow, screen, Menu, MenuItem } = require('electron')
const electron = require('electron')
// 引入路径
const path = require('path')
// 定义图片地址
const iconPath = path.join(__dirname, './src/icon/favicon.png')
// 定义Menu是否可用
const menu = new Menu()
// window 会被自动地关闭
let mainWindow = null;

// 当 Electron 完成了初始化并且准备创建浏览器窗口的时候
// 这个方法就被调用
app.on('ready', function () {
    // 获取屏幕当前宽高
    const { width, height } = screen.getPrimaryDisplay().workAreaSize;
    // 创建浏览器窗口。
    mainWindow = new BrowserWindow({
        width: width / 2,
        height: height / 2,
        icon: iconPath,
        webPreferences: {
            nodeIntegration: true
        }
    });
    // 设置不需要菜单选项
    mainWindow.setMenu(null)

    // 加载应用的 index.html
    mainWindow.loadURL('file://' + __dirname + './src/index.html');

    // 打开开发工具
    mainWindow.openDevTools();
    // 当 window 开始关闭，这个事件会被触发
    mainWindow.on('close', (e) => {
        e.preventDefault(); //阻止默认行为
        electron.dialog.showMessageBox({
            type: 'info',
            title: '关闭当前应用',
            cancelId: 0,
            message: '确定要关闭吗？',
            buttons: ['取消', '最小化', '直接退出']
        }).then((res) => {
            if (res.response == 0) {
                console.log('你又不关，点我干啥？');
            } else if (res.response == 1) {
                mainWindow.hide()
            } else {
                mainWindow = null
                app.exit();
            }
        })
    })

    // 当 window 被关闭，这个事件会被触发
    mainWindow.on('closed', function () {
        // 取消引用 window 对象，如果你的应用支持多窗口的话，
        // 通常会把多个 window 对象存放在一个数组里面，
        // 但这次不是。
        mainWindow = null;
    });
});

// 设置右键功能
menu.append(new MenuItem({ label: '复制', role: 'copy' }))
menu.append(new MenuItem({ label: '粘贴', role: 'paste' }))
menu.append(new MenuItem({ label: '刷新', role: 'reload' }))
menu.append(new MenuItem({ label: '全选', role: 'selectall' }))
menu.append(new MenuItem({ label: '剪切', role: 'cut' }))
menu.append(new MenuItem({ label: '删除', role: 'delete' }))
app.on('context-menu', (e, params) => {
    menu.popup({ browserWindow: app, x: params.x, y: params.y })
})

// 当所有窗口被关闭了，退出。
app.on('window-all-closed', function () {
    // 在 OS X 上，通常用户在明确地按下 Cmd + Q 之前
    // 应用会保持活动状态
    if (process.platform != 'darwin') {
        app.quit();
    }
});
app.on('activate', () => {
    // macOS上,当单击dock图标并且没有其它窗口打开时
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
    }
})