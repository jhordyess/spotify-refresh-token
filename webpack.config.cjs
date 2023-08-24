/** @type {import('webpack').Configuration} */

const path = require('path')
const nodeExternals = require('webpack-node-externals')
const NodemonPlugin = require('nodemon-webpack-plugin')
const Dotenv = require('dotenv-webpack')

const NODE_ENV = process.env.NODE_ENV

module.exports = {
  name: 'spotify-refresh-token',
  entry: path.join(__dirname, 'src', 'index.ts'),
  target: 'node',
  mode: NODE_ENV,
  externals: [nodeExternals()],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.cjs'
  },
  resolve: {
    extensions: ['.ts']
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new NodemonPlugin({
      script: './dist/index.cjs'
    }),
    new Dotenv()
  ]
}
