module.exports = {
  entry: './src/ld-avartar/index.js',
  output: {
    path: `${__dirname}/dist`,
    filename: 'index.js',
    library: 'ld-avartar',
    libraryTarget: 'window'
  },
  mode: 'production',
  module: {
    rules: [{
      test: /\.js$/,
      loader: 'babel-loader'
    }, {
      test: /\.scss$/,
      use: [
        'style-loader',
        {
          loader: 'css-loader',
          options: {
            importLoaders: 1,
            minimize: true
          }
        },
        'postcss-loader',
        'sass-loader'
      ]
    }]
  },
  optimization: {
    // minimize: true
  }
}

