## webpack打包
* 启动本地服务命令 npm start
    * 本地起服务打包的js在内存内
* 打包编译命令 npm run build
    * 如果需要把样式模块化引入,则`loader: 'style!css?modules!postcss'`
    * 如果需要js和css分离,则`loader: ExtractTextPlugin.extract('style', 'css!postcss')`,并且在plugin中加上`new ExtractTextPlugin("app.min.css")`
    * 本打包命令实现多文件打包,打包出来的文件在dist文件中



## Explain

### 目录结构 ###

- src:代码文件夹
- src/app:入口js文件夹，打包入口放在本文件夹下
- src/pages:组件文件夹，包括页面，组件等。
- test:html页面文件夹，本地调试的html页面所在文件夹，localhost:8081/#/默认打开test/index.html,可通过修改路由为localhost:8081/other.html打开test/other.html.
- index.tpl.html：打生产环境包时的模板html,会根据HtmlWebpackPlugin插件的配置，写入不同的入口js.
- dist:打包完成后资源输入文件夹。



## CHANGELOG ##

1.0.0

- 初版，windows下打包有问题

1.2.0

- windows下打包正常，增加多入口

1.3.0

- 本地环境增加多入口，通过路由切换不同html
- 由于控制台组件在windows下失效，故停用

1.4.0

- 增加reflux，db模块
- 
1.5.0

- 增加babel-preset-stage-0，支持class内static属性。

2.0.0

- 升级到webpack2, react-router升级到4.0版本, 使用react-hot-loader代替hmr实现热加载。

2.1.0

- 使用异步加载

2.1.1

- 将node包更新到最新版

3.0.0

- 增加redux，删除reflux