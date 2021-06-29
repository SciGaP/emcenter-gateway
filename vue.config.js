module.exports = {
    configureWebpack: config => {
        config.entry.app = [
            './src/main.js',
        ]
    },
    transpileDependencies: ["custos-demo-gateway"],
    pluginOptions: {
        i18n: {
            locale: 'en',
            fallbackLocale: 'en',
            localeDir: 'locales',
            enableInSFC: true
        }
    },
    chainWebpack: config => {
        config.module
            .rule('scss')
            .test(/\.scss$/,)
            .use('sass-loader')
            .loader('css-loader')
            .loader('vue-style-loader')
            .end()
    }
}