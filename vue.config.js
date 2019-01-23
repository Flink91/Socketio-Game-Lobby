// The Webpack config needs to know where the app lives to change the paths accordingly
module.exports = {
  baseUrl: process.env.NODE_ENV === 'production' ?
    '/GameLobby/' : '/',

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
