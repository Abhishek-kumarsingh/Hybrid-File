const { override, addBabelPresets, babelInclude, useBabelRc } = require('customize-cra');
const path = require('path');

module.exports = override(
  // Use .babelrc file for configuration
  useBabelRc(),

  // Include problematic node_modules in Babel transpilation
  babelInclude([
    path.resolve('src'),
    path.resolve('node_modules/apexcharts'),
    path.resolve('node_modules/react-apexcharts'),
    path.resolve('node_modules/react-quill-new')
  ])
);
