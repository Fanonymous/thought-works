'use strict'
const path = require('path')
const defaultSettings = require('./src/config/index')
const resolve = dir => path.join(__dirname, dir)
const name = defaultSettings.title
// 是否生产
const IS_PROD = ['production'].includes(process.env.MODE_ENV)
module.exports = {
  publicPath: './', // history模式、多页面不可用
  outputDir: 'dist',
  assetsDir: 'static', // 打包静态资源
  lintOnSave: !IS_PROD,
  productionSourceMap: false, // 生产环境的 source map
  devServer: {
    port: 9007, // 端口
    open: true, // 打开浏览器
    overlay: {
      // 编译错误时在浏览器显示
      warning: false,
      error: true
    }
  },
  css: {
    extract: IS_PROD, // 是否将组件中的 CSS 提取至一个独立的 CSS 文件中 (而不是动态注入到 JavaScript 中的 inline 代码)
    sourceMap: false, // 是否为 CSS 开启 source map
    loaderOptions: {
      scss: {
        // 向全局sass样式传入共享的全局变量, $src可以配置图片cdn前缀
        prependData: `
          @import "assets/css/mixin.scss";
          @import "assets/css/variables.scss";
          `
      }
    }
  },
  configureWebpack: config => {
    config.name = name
  },
  chainWebpack: config => {
    config.plugins.delete('preload') // 禁止预加载js
    config.plugins.delete('prefetch') // 禁止预请求
    // 别名
    config.resolve.alias
      .set('@', resolve('src'))
      .set('assets', resolve('src/assets'))
      .set('components', resolve('src/components'))
      .set('api', resolve('src/api'))
    // 保留空格
    config.module
      .rule('vue')
      .use('vue-loader')
      .loader('vue-loader')
      .tap(options => {
        options.compilerOptions.preserveWhitespace = true
        return options
      })
    // svg 组件
    const svgRule = config.module.rule("svg")
    svgRule.uses.clear()
    svgRule
      .test(/\.svg$/)
      .include.add(path.resolve(__dirname, './src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
    const fileRule = config.module.rule('file')
    fileRule.uses.clear()
    fileRule
      .test(/\.svg$/)
      .exclude.add(path.resolve(__dirname, './src/icons'))
      .end()
      .use('file-loader')
      .loader('file-loader')

    config.when(!IS_PROD, config => config.devtool('cheap-source-map'))
    config.when(IS_PROD, config => {
      config.optimization.splitChunks({
        chunks: 'all',
        cacheGroups: {
          // cacheGroups 下可以可以配置多个组，每个组根据test设置条件，符合test条件的模块
          commons: {
            name: 'chunk-commons',
            test: resolve('src/components'),
            minChunks: 3, //  被至少用三次以上打包分离
            priority: 5, // 优先级
            reuseExistingChunk: true // 表示是否使用已有的 chunk，如果为 true 则表示如果当前的 chunk 包含的模块已经被抽取出去了，那么将不会重新生成新的。
          },
          node_vendors: {
            name: 'chunk-libs',
            chunks: 'initial', // 只打包初始时依赖的第三方
            test: /[\\/]node_modules[\\/]/,
            priority: 10
          }
        }
      })
      config.optimization.runtimeChunk('single')
    })
  }
}