const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: './src/index.js',
  // output: {
  //   filename: 'bundle.js',
  //   path: path.resolve(__dirname, 'dist'),
  // },
  resolve: {
    fallback: {
      "zlib": false,
    },
  },
  plugins: [
    new webpack.ProvidePlugin({
      process: 'process/browser',
    }),
  ],
};
