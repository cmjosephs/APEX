const path = require('path');
const SRC_DIR = path.join(__dirname, "/client/src");
const DIST_DIR = path.join(__dirname, "/client/dist");
const CompressionPlugin = require("compression-webpack-plugin");
const zlib = require("zlib");
var BrotliPlugin = require('brotli-webpack-plugin');


module.exports = {
  entry: `${SRC_DIR}/index.jsx`,
  mode: "development",
  output: {
    filename: 'bundle.js',
    path: DIST_DIR,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)?/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"]
          }
        }
      },
      {
        test: /\.(png|jpe?g|svg|gif)$/i,
        loader: 'file-loader',
        options: {
          name: 'images/[name].[ext]',
        },
      }
    ]
  },
  // plugins: [new CompressionPlugin({
  //   filename: "[path][base].gz",
  //   algorithm: "gzip",
  //   test: /\.js$|\.css$|\.html$/,
  //   threshold: 840,
  //   minRatio: 0.8,
  // })],
  plugins: [
    new CompressionPlugin({
      filename: "[path][base].br",
      algorithm: "brotliCompress",
      test: /\.(js|css|html|svg)$/,
      compressionOptions: {
        params: {
          [zlib.constants.BROTLI_PARAM_QUALITY]: 11,
        },
      },
      threshold: 10240,
      minRatio: 0.8,
      deleteOriginalAssets: false,
    }),
    new BrotliPlugin({
      asset: '[file].br',
      test: /\.(js)$/
    })
  ],
};