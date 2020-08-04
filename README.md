# Webpack
webpack入门(以官网指南为指导)

# 安装与起步
## 基本安装
npm init -y
npm install webpack webpack-cli --save-dev
调整package.json文件，以便确保我们安装包是私有的(private),并且移除main入口，这可以防止意外发布你的代码
## 模块
import与export
## 使用一个配置文件
创建webpack.config.js
## NPM脚本(NPM Scripts)
考虑到用 CLI 这种方式来运行本地的 webpack 不是特别方便，我们可以设置一个快捷方式。在 package.json 添加一个 npm 脚本(npm script),
然后可以用`npm run build`命令来代替`npx`命令

# 管理资源

