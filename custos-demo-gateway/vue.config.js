module.exports = {
    configureWebpack: config => {
        config.entry.app = [
            './src-emc/main.js'
        ]
    },
    pluginOptions: {
        i18n: {
            locale: 'en',
            fallbackLocale: 'en',
            localeDir: 'locales',
            enableInSFC: true
        }
    }
}
