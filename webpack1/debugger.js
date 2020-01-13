const path = require("path");
// .bin/webpack.cmd/webpack-cli/bin/webpack.js
const pkgPath = require.resolve(`webpack-cli/package.json`);
// eslint-disable-next-line node/no-missing-require
const pkg = require(pkgPath);
// eslint-disable-next-line node/no-missing-require
require(path.resolve(
  path.dirname(pkgPath),
  // webpack-cli/package.json/bin:"bin/cli.js"
  // pkg.bin['webpack-cli'] 等价于下面的 核心逻辑cli.js
  './bin/cli.js'
));