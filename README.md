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
资源包括样式、图片、字体等
webpack最出色的功能之一就是，除了JavaScript，还可以通过loader引入任何其他类型的文件
## 加载CSS
为了从JavaScript模块中 `import` 一个CSS文件，你需要在 `module配置中`安装并添加`style-loader`和`css-loader`
然后再webpack.config.js里添加module属性

现有的 loader 可以支持任何你可以想到的 CSS 处理器风格 - postcss, sass 和 less 等

## 加载图片
使用file-loader

## 加载字体
file-loader 和 url-loader 可以接收并加载任何文件，然后将其输出到构建目录。这就是说，我们可以将它们用于任何类型的文件，包括字体

## 加载数据
比如JSON文件，CSV、TSV和XML，JSON支持是内置的，其他三个需要使用csv-loader和xml-loader



# 管理输出
## 设定 HtmlWebpackPlugin
首先安装插件，并且调整 webpack.config.js 文件：
`npm install --save-dev html-webpack-plugin`

## 清理 /dist 文件夹
通常，在每次构建前清理 /dist 文件夹，是比较推荐的做法，因此只会生成用到的文件。让我们完成这个需求
clean-webpack-plugin 是一个比较普及的管理插件，让我们安装和配置下

`npm install clean-webpack-plugin --save-dev`

## Manifest
通过 manifest，webpack 能够对「你的模块映射到输出 bundle 的过程」保持追踪

通过使用 WebpackManifestPlugin，可以直接将数据提取到一个 json 文件，以供使用