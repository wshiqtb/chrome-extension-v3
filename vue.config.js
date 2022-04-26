module.exports = {
  pages: {
    popup: {
      template: 'public/browser-extension.html',
      entry: './src/popup/main.js',
      title: 'Popup'
    }
  },
  filenameHashing: false,
  productionSourceMap: false,
  configureWebpack: {
    devtool: 'source-map',
    entry: {
      'inject-upload': './src/injects/upload.js'
    }
  },
  chainWebpack (config) {
    config.optimization.delete('splitChunks')
  },
  css: {
    extract: false
  },
  pluginOptions: {
    browserExtension: {
      componentOptions: {
        background: {
          entry: 'src/background.js'
        },
        contentScripts: {
          entries: {
            'content-script': [
              'src/content-scripts/content-script.js'
            ]
          }
        }
      }
    }
  }
}
