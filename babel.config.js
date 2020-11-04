const IS_PROD = ['production'].includes(process.env.VUE_APP_ENV)
// 生产 去除console
const plugins = []
if (IS_PROD) {
  plugins.push('transform-remove-console')
}
module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  plugins
}
