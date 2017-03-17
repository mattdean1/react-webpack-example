const path = require('path');

const PATHS = {
  homepage: path.join(__dirname, 'src/react-pages/homepage.jsx'),
};

const commonConfig = {
  entry: {
    homepage: PATHS.homepage,
  },
  output: {
    path: path.join(__dirname, 'build/public/js/bundles'),
    filename: '[name].bundle.js',
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      include: path.join(__dirname, 'src'),
      loaders: ['babel-loader'],
    }],
  },
};


module.exports = function (env) {
  console.log('env', env);

  return commonConfig;
};
