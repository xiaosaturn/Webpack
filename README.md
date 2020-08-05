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



# 开发
## 使用source map
可以方便的定位到错误是哪个源文件导致的，在webpack.config.js中新增一个属性devtool，值为`inline-source-map`

## 选择一个开发工具
每次要编译代码时，手动运行 npm run build 就会变得很麻烦。

webpack 中有几个不同的选项，可以帮助你在代码发生变化后自动编译代码：
* webpack's Watch Mode
* webpack-dev-server
* webpack-dev-middleware

多数场景中，都是用`webpack-dev-server`

### 使用观察模式
package.json的scripts里添加一个watch属性，值为`webpack --watch`
### 使用webpack-dev-server
webpack-dev-server 为你提供了一个简单的 web 服务器，并且能够实时重新加载(live reloading)。

`npm install --save-dev webpack-dev-server`

### 使用webpack-dev-middleware
webpack-dev-middleware 是一个容器(wrapper)，它可以把 webpack 处理后的文件传递给一个服务器(server)。 webpack-dev-server 在内部使用了它，同时，它也可以作为一个单独的包来使用，以便进行更多自定义设置来实现更多的需求

`npm install --save-dev express webpack-dev-middleware`

# 模块热替换
## 启用HMR
webpack.config.js的devServer添加hot属性，值为true。注意，我们还添加了NamedModulesPlugin，以便更容易查看要修补(patch)的依赖。

然后在index.js里添加如下代码
``` JavaScript
if (module.hot) {
    module.hot.accept('./print.js', function() {
        console.log('Accepting the updated printMe module!');
        printMe();
    });
}
```
## 通过Node.js API
当使用 webpack dev server 和 Node.js API 时，不要将 dev server 选项放在 webpack 配置对象(webpack config object)中。而是，在创建选项时，将其作为第二个参数传递。

想要启用 HMR，还需要修改 webpack 配置对象，使其包含 HMR 入口起点。webpack-dev-server package 中具有一个叫做 `addDevServerEntrypoints` 的方法，你可以通过使用这个方法来实现。这是关于如何使用的一个小例子：
`new WebpackDevServer(compiler, options)`
``` JavaScript
//dev-server.js
const webpackDevServer = require('webpack-dev-server');
const webpack = require('webpack');

const config = require('./webpack.config.js');
const options = {
  contentBase: './dist',
  hot: true,
  host: 'localhost'
};

webpackDevServer.addDevServerEntrypoints(config, options);
const compiler = webpack(config);
const server = new webpackDevServer(compiler, options);

server.listen(5000, 'localhost', () => {
  console.log('dev server listening on port 5000');
});
```
## HMR修改样式表
用`style-loader`和`css-loader`

# 代码分离
代码分离是 webpack 中最引人注目的特性之一。此特性能够把代码分离到不同的 bundle 中，然后可以按需加载或并行加载这些文件。代码分离可以用于获取更小的 bundle，以及控制资源加载优先级，如果使用合理，会极大影响加载时间。

三种方法：
* 入口起点：使用`entry`配置手动地分离代码
* 防止重复：使用`CommonsChunkPlugin`去重和分离chunk
* 动态导入：通过模块的内联函数调用来分离代码

## 入口起点(entry point)
`lodash`模块在两个bundle中造成重复引用

## 防止重复(prevent duplication)
可以使用`CommonsChunkPlugin`插件将公共的依赖模块提取到已有的入口 chunk 中，或者提取到一个新生成的 chunk。

webpack.optimize.CommonsChunkPlugin has been removed, please use config.optimization.splitChunks instead.

在webpack.config.js里添加optimization属性，如下所示
``` JavaScript
module.exports = {
    mode: 'development',
    entry: {
        app: './src/index.js',
        another: './src/another-module.js',
    },
    devtool: 'inline-source-map', //方便调试的
    devServer: {
        contentBase: './dist', //方便实时刷新的
        hot: true
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title: 'Output Management'
        }),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
    ],
    //抽取公共的模块
    optimization: {
        splitChunks: {
            chunks: 'all'
        }
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
        ]
    }
};
```

## 动态导入(Dynamic Imports)
``` JavaScript
// src/index.js
function getComponent() {
    return import(/* webpackChunkName: 'lodash' */ 'lodash').then(({ default: _ }) => {
        const element = document.createElement('div');
        element.innerHTML = _.join(['Hello', 'Webpack'], ' ');
        return element;
    }).catch(error => 'An error occurred while loading the component');
}

getComponent().then(component => {
    document.body.appendChild(component);
})
/*
The reason we need default is that since webpack 4, when importing a CommonJS module, the import will no longer resolve to the value of module.exports, it will instead create an artificial namespace object for the CommonJS module. For more information on the reason behind this, read webpack 4: import() and CommonJs @{https://medium.com/webpack/webpack-4-import-and-commonjs-d619d626b655} 
*/
```

## Prefetching/Preloading modules
`import(/* webpackPrefetch: true */ 'LoginModal');·`

## bundle分析(Bundle Analysis)

# 缓存
## 输出文件的文件名(Output Filenames)
``` JavaScript
//webpack.config.js
module.exports = {
    output: {
        filename: '[name].[hash].js' //添加一个hash
    }
};
```

## 提取模板(Extracting Boilerplate)
``` JavaScript
//webpack.config.js
module.exports = {
    optimization: {
        moduleIds: 'hashed',
        splitChunks: {
            // chunks: 'all',
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all'
                }
            }
        },
        runtimeChunk: 'single' // Set it to single to create a single runtime bundle for all chunks
    },
};
```

## 模块标识符(Module Identifiers)

# 创建 library(Authoring Library)
## 创建一个 library
新建一个ref.json文件

* ES2015 module import:
``` JavaScript
import * as webpackNumbers from 'webpack-numbers';
// ...
webpackNumbers.wordToNum('Two');
```
* CommonJS module require:
``` JavaScript
const webpackNumbers = require('webpack-numbers');
// ...
webpackNumbers.wordToNum('Two');
```
* AMD module require:
``` JavaScript
require(['webpackNumbers'], function (webpackNumbers) {
// ...
    webpackNumbers.wordToNum('Two');
});
```
## 基本配置(Base Configuration)

## 外部化lodash
