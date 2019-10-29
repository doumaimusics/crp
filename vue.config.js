module.exports = {
    // 基本路径
    publicPath: './', // 设置打包文件相对路径
    // 输出文件目录
    outputDir: 'dist',
    // build时放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录
    assetsDir: 'static',
    // eslint-loader 是否在保存的时候检查
    lintOnSave: false,
    // webpack配置
    chainWebpack: () => { },
    configureWebpack: () => { },
    // 生产环境是否生成 sourceMap 文件
    productionSourceMap: true,
    // css相关配置
    css: {
        // 是否使用css分离插件 ExtractTextPlugin
        extract: true,
        // 开启 CSS source maps?
        sourceMap: false,
        // css预设器配置项
        loaderOptions: {},
        // 启用 CSS modules for all css / pre-processor files.
        modules: false
    },
    parallel: require('os').cpus().length > 1,
    pwa: {},
    // webpack-dev-server 相关配置
    devServer: {
        open: true, //配置自动启动浏览器
        // host: 'localhost',
        port: 8080, // 端口号
        https: false,
        hotOnly: false, // https:{type:Boolean}
        proxy: { // 配置跨域
            '/api': {
                target: 'http://39.97.181.73:8081', //源地址
                // target: 'http://192.168.1.234:8080',
                changeOrigin: true, //在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求的数据，这样服务端和服务端进行数据的交互就不会有跨域问题
                ws: true, //是否代理websockets
                pathRewrite: {
                    '^/api': ''
                }
            }
        }, // 配置跨域处理,只有一个代理
        before: app => { }
    },
    // 第三方插件配置
    pluginOptions: {
    }
}