import webpack from 'webpack'
import path from 'path'

const name = 'Sign'

const production = process.env.NODE_ENV === 'production'

const config = {
  target: 'web',
  entry: [
    './src/Sign.js'
  ],
  output:{
    path: path.join(__dirname,
      './build/me.wanglong.PawExtensions.Sign'),
    pathInfo: true,
    publicPath: '/build/',
    filename: name+'.js'
  },
  module: {
    loaders: [
      {
        loader: 'babel-loader',
        include: [
          path.resolve(__dirname, 'src'),
        ],
        test: /\.jsx?$/,
      }
    ]
  }
}
module.exports = config
