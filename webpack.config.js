// const path = require('path');

// const SRC_DIR = path.resolve(__dirname, './client');
// const BUILD_DIR = path.resolve(__dirname, './static');

// module.exports = {
//   entry: path.resolve(SRC_DIR, 'index.jsx'),
//   output: {
//     filename: 'bundle.js',
//     path: BUILD_DIR
//   },
//   module: {
//     rules: [
//       {
//         test: /\.(js|jsx)$/,
//         exclude: [/node_modules/],
//         use: [{
//           loader: 'babel-loader',
//           options: { presets: ['es2015', 'react', 'env'] }
//         }],
//       },
//       {
//         test: /\.css$/,
//         loader: 'style-loader'
//       }, {
//         test: /\.css$/,
//         loader: 'css-loader',
//         query: {
//           modules: true,
//           localIdentName: '[name]__[local]___[hash:base64:5]'
//         }
//       }
//     ]
//   }
// }

const webpack = require('webpack');
const path = require('path');

// See: https://stackoverflow.com/questions/37788142/webpack-for-back-end

const common = {
  context: __dirname + '/client',
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015', 'env']
        },
      },
    ],
  }
};

const client = {
  entry: './client.js',
  output: {
    path: __dirname + '/static',
    filename: 'app.js'
  }
};

const server = {
  entry: './server.js',
  target: 'node',
  output: {
    path: __dirname + '/static',
    filename: 'app-server.js',
    libraryTarget: 'commonjs-module'
  }
};

module.exports = [
  Object.assign({}, common, client),
  Object.assign({}, common, server)
];