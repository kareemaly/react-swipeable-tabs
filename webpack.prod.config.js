var path = require('path');
var webpack = require('webpack');
var webpackUMDExternal = require('webpack-umd-external');

module.exports = {
  devtool: 'sourcemap',
  entry: {
    index: './src/Tabs/index.js'
  },
  output: {
    path: path.join(__dirname, 'build'),
    publicPath: 'build/',
    filename: 'react-swipeable-tabs.js',
    sourceMapFilename: 'react-swipeable-tabs.map',
    library: 'ReactSwipeableTabs',
    libraryTarget: 'umd'
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false },
      output: { comments: false }
    })
  ],
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel'
    }]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  externals: webpackUMDExternal({
    'react': 'React',
    'react-hammerjs': 'Hammerjs',
    'react-motion': 'ReactMotion',
    'lodash.differenceby': 'LodashDifferenceBy',
    "inline-style-prefixer": "InlineStylePrefixer",
  }),
};
