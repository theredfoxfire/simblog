/*eslint-env node */
var path = require('path');

module.exports = {
  entry: {
    blog: './src/blog.js',
  },
  output: {
    path: path.join(__dirname, 'assets/dist'),
    publicPath: '/assets/dist/',
    filename: '[name].js',
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        loader: 'babel',
        query: {
          presets: ['react', 'es2015', 'stage-0'],
        },
      },
    ],
  },
};
