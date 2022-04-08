# 安装依赖包

1. npm install

# 安装全局依赖

2. npm i nodemon -g  
3. npm i asar -g   全局环境安装asar 在asar文件所在目录执行   asar extract app.asar ./

# 本地测试

3. npm run test

# 打包

4. npm run build

5.  网络问题
建议切换到国内镜像
npm config set  electron_mirror  "https://npmmirror.com/mirrors/electron/"

npm config set  electron_builder_binaries_mirror  "https://mirrors.huaweicloud.com/electron-builder-binaries/"