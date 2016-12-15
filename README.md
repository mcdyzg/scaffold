## webpack打包
* 启动本地服务命令 npm start
    * 本地起服务打包的js在内存内
* 打包编译命令 npm run build
    * 如果需要把样式模块化引入,则`loader: 'style!css?modules!postcss'`
    * 如果需要js和css分离,则`loader: ExtractTextPlugin.extract('style', 'css!postcss')`,并且在plugin中加上`new ExtractTextPlugin("app.min.css")`
    * 本打包命令实现多文件打包,打包出来的文件在dist文件中

## CHANGELOG ##

1.0.0

- 初版，windows下打包有问题

1.2.0

- windows下打包正常，增加多入口