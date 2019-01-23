// The Webpack config needs to know where the app lives to change the paths accordingly

// Change the slash if needed for example: '/GameLobby/' : '/',
module.exports = {
  baseUrl: process.env.NODE_ENV === 'production' ?
    '/' : '/',

  // configureWebpack: {
  //   module: {
  //     rules: [{
  //       test: /\.scss?$/,
  //       use: [
  //         'vue-style-loader',
  //         'css-loader',
  //         'sass-loader'
  //       ]
  //     }]
  //   }
  // }
}
