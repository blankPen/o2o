'use strict';
let path = require('path');
let defaultSettings = require('./defaults');

// Additional npm or bower modules to include in builds
// Add all foreign plugins you may need into this array
// @example:
// let npmBase = path.join(__dirname, '../node_modules');
// let additionalPaths = [ path.join(npmBase, 'react-bootstrap') ];
let additionalPaths = [];

module.exports = {
  additionalPaths: additionalPaths,
  port: defaultSettings.port,
  debug: true,
  devtool: 'eval',
  // output: {
  //   path: path.join(__dirname, '/../dist/assets'),
  //   filename: 'app.js',
  //   publicPath: defaultSettings.publicPath
  // },
  output: {
    path: path.resolve(__dirname, '../dist/assets'),
    publicPath: defaultSettings.publicPath,
    filename: "[name].bundle.js"
  },
  devServer: {
    contentBase: './src/',
    historyApiFallback: true,
    hot: true,
    port: defaultSettings.port,
    publicPath: defaultSettings.publicPath,
    noInfo: false,

    historyApiFallback: true,
    stats: {
      colors: true
    },
    proxy: {
      '/rest/*': {
        // target: 'http://o2o.leimingtech.com/leimingtech-front/',
        //target: 'http://115.28.68.78:8888/leimingtech-front/',
        target:'http://testo2o.leimingtech.com/leimingtech-front/',
        changeOrigin: true
      },
      '/sns/*':{
        target:'https://api.weixin.qq.com/',
        changeOrigin: true
      },
      '/oauth2.0/*':{
        target:'https://graph.qq.com/',
        changeOrigin: true
      },
      '/user/get_user_info':{
        target:'https://graph.qq.com/',
        changeOrigin: true
      }
    }
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
    alias: {
      actions: `${defaultSettings.srcPath}/actions/`,
      components: `${defaultSettings.srcPath}/components/`,
      common: `${defaultSettings.srcPath}/common/`,
      stores: `${defaultSettings.srcPath}/stores/`,
      styles: `${defaultSettings.srcPath}/styles/`,
      config: `${defaultSettings.srcPath}/config/` + process.env.REACT_WEBPACK_ENV
    }
  },
  module: {}
};
