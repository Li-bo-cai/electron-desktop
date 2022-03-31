const { Notification } = require('electron')

function showMessage() {
    let notification = new Notification({
        // 通知的标题, 将在通知窗口的顶部显示
        title: '放假通知',
        // 通知的副标题, 显示在标题下面 macOS
        subtitle: '重要消息',
        // 通知的正文文本, 将显示在标题或副标题下面
        body: '@所有人 放假！！！',
        // false有声音，true没声音
        silent: false,
        icon: '../../icon/favicon.png',
        // 通知的超时持续时间 'default' or 'never'
        timeoutType: 'default',
    })
    notification.show()
}

// module.exports = showMessage
