module.exports = {
    configureWebpack: config => {
        config.entry.app = [
            './src-emc/main.js'
        ]
    }
}