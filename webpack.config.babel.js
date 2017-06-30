import webpack from 'webpack'
import path from 'path'
import HtmlWebpackPlguin from 'html-webpack-plugin'

export default {
  entry: {
    app: [
      'webpack-dev-server/client?http://localhost:8080',
      './src/js/app.js',
    ],
  },
  resolve: {
    modules: [
      'node_modules',
      path.join(__dirname, 'src'),
    ],
    extensions: ['', '.js', '.jsx'],
  },
  output: {
    path: path.join(__dirname, 'docs'),
    filename: 'js/[name].js',
    publicPath: '/',
  },
  resolve: {
    modules: [
      'node_modules',
      path.join(__dirname, 'src'),
    ],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        include: [
          path.resolve(__dirname, 'src/js'),
        ],
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: false,
            },
          },
          {
            loader: 'eslint-loader',
            options: {
            },
          },
        ],
      },
      {
        test: /\.scss$/,
        include: path.resolve(__dirname, 'src/scss/'),
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: (loader) => [
                require('postcss-normalize')(),
                require('autoprefixer')(),
                require('cssnano')(),
              ],
            }
          },
          {
            loader: 'sass-loader',
          },
        ],
      },
    ],
  },
  devServer: {
    contentBase: './docs',
    publicPath: '/',
    port: 8080,
  },
  plugins: [
    new HtmlWebpackPlguin({
      filename: 'index.html',
      inject: false,
      template: './src/templates/index.ejs',
    }),
    new webpack.LoaderOptionsPlugin({
      options: {
        postcss: [
          require('autoprefixer')(),
          require('cssnano')(),
        ],
      },
    }),
  ],
}
