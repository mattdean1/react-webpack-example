const path = require('path');

const PAGES = {
  page1: path.join(__dirname, 'src/react-pages/page1.js'),
};

const commonConfig = {
  entry: {
    page1: PAGES.page1,
  },
  output: {
    path: path.join(__dirname, 'build/public/js/bundles'),
    filename: '[name].js',
  },
};


module.exports = function (env) {
  console.log('env', env);

  return commonConfig;
};
