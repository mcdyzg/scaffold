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

2.2.0

- 更新reflux用法，作为reflux分支一直保存

3.0.0

- 增加redux，删除reflux

3.0.1

- 修改package.json错误

4.0.0

- 使用react-hot-loader 3.0.0,重新组织。

4.0.1

1. 更新包版本
2. 使用babel-preset-env
3. webpack-dev-server 2.10.0使用yarn安装报错，强制使用2.9.7版本

4.1.0

- 使用dll打包

4.1.1

1. 使用AutoDllPlugin替代webpack.dllPlugin.
2. 增加externals配置。

4.1.2

1. 更新webpack-dev-server解决yarn打包错误的问题
2. 修正dll打包路径错误

打包详解->

## 开启组件异步加载(List组件)

### 不使用antd时：

    app.js->15k
    app-list->1.5k
    vendor.js->150k(包含react,react-dom,react-router-dom)

### 使用antd按需引入时:

1. 只在List组件里使用Button组件

        app.js->15k
        app-list->99k
        vendor.js->150k

2. 只在Home组件里使用Button组件

        app.js->113k
        app-list->1.5k
        vendor.js->150k

3. Home和List组件都使用Button组件

        app.js->113k
        app-list->1.63k
        vendor.js->150k

结论：可以看出antd配合异步加载不会带来重复打包

### 将antd打入vendor，同时开启antd按需引入:

    app.js->94k
    app-list->1.64k
    vendor.js->1.38M !!!

结论：也就是说完整的antd被打入vendor，而且按需引用的时候又打包了一次

### 将antd打入vendor，同时关闭antd按需引入:

    app.js->15.2k
    app-list->1.61k
    vendor.js->1.38M !!!

结论：完整的antd被打入vendor，引用Button的时候虽然没有重复打包，但是我们强烈需要按需引入，毕竟antd 990k大。

### 开启dll打包(react,react-dom,react-router-dom)，开启commonChunk(react,react-dom,react-router-dom),开启antd按需引用，antd不打入vendor

    app.js->113k
    app-list->1.61k
    vendor.js->1.6k
    common-1.0.0.js->161k

结论：也就是说vendor被打进了common里，antd没有重复打包,此种情况也就是说可以省掉commonChunk组件打react,react-dom,react-router-dom的步骤了。

### 增加多入口(app.js app2.js),关闭commonChunk插件，开启dll,开启antd按需引用

    app.js->114k(使用Button组件)
    app2.js->4.88k(未使用Button组件)
    app-list->1.63k(使用Button组件)
    app-list2->105k(使用Button组件)
    common-1.0.0.js->161k

### 项目复制一个，然后打包，发现commin-1.0.0.js通用，故取消commonChunks插件

### 使用webpack的externals属性，将react,react-dom,react-router-dom通过script引入，不使用antd任何组件

    app.js->12.4k(不使用Button组件)

### 使用webpack的externals属性，将react,react-dom,react-router-dom通过script引入，使用antd Button组件

    app.js->115.k(使用Button组件)
    app-list->1.63k(使用Button组件)

### 使用webpack的externals属性，将react,react-dom,react-router-dom,antd通过script引入，使用antd Button组件

    app.js->16.6k(使用Button组件)
    app-list->1.61k(使用Button组件)

结论：此种方法成功把antd剥离出去了，但是html里需要引入antd.min.js和antd.min.css和moment.min.js！！！，moment.min.js必须放在antd之前，否则会报错。同时，.babelrc文件里需要去掉babel-plugin-import的使用，如果不去掉，app.js会有115k，也就是说antd的Button组件还是被打进了app.js里。

## 综上：使用AutoDllPlugin插件，避免新建一个打dll包的webpack config文件最好，使用commonChunk插件也不错，只不过不能多项目通用vendor.js。使用extarnals无法使用按需加载，所以加载最慢
