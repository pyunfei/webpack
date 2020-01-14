const path = require("path");
const ejs = require("ejs");
const fs = require("fs");
const babylon = require("babylon"); // source->ast
const types = require("babel-types"); // 生成节点(是否存在节点)
const traverse = require("babel-traverse").default; // 遍历节点 CURD
const generator = require("babel-generator").default; // ast->source
const { join, dirname } = require("path").posix; //不同操作系统下的分隔符的唯一性
const mainTemplate = fs.readFileSync("./template/main.ejs", "utf8");

class Compiler {
  constructor(config) {
    this.config = config;
  }
  /**
   * 1. 获取入口问价
   * 2. 存放所有的文件模块
   * 3. 编译模块
   * 4. 产生bundle文件
   */
  run(callback) {
    const { entry } = this.config;
    this.entry = entry;
    this.modules = {};
    this.buildModule(entry);
    this.emitFiles();
  }
  /**
   // 编译(读取)模块内容 使用(模块ID)
   * 1, babylon(源代码/source) 生成语法树(ast)
   * 2, traverse遍历语法树, 查找所需节点
   * 3, types生成新节点替换老节点
   * 4, generator语法树(ast) 生成(源代码/source)
   * 5, https://astexplorer.net/
   */
  buildModule(moduleId) {
    const dependencies = []; // 本模块依赖ID数组
    const originSource = fs.readFileSync(moduleId, "utf8");
    const ast = babylon.parse(originSource);
    traverse(ast, {
      CallExpression: nodePath => {
        if (nodePath.node.callee.name == "require") {
          let node = nodePath.node;
          node.callee.name = "__webpack_require__";
          let moduleName = node.arguments[0].value;
          // ./hello.js -> ./src/hello.js
          let dependencyModuleId = "./" + join(dirname(moduleId), moduleName);
          dependencies.push(dependencyModuleId);
          node.arguments = [types.stringLiteral(dependencyModuleId)];
        }
      }
    });

    const { code } = generator(ast);
    this.modules[moduleId] = code;

    // 日常noop模块依赖
    dependencies.forEach(dependency => this.buildModule(dependency));

  }
  emitFiles() {
    const { output } = this.config;
    const outputFile = join(output.path, output.filename);
    const bundle = ejs.compile(mainTemplate)({
      entry: this.entry,
      modules: this.modules
    });
    fs.writeFileSync(outputFile, bundle)
  }
}

const webpack = (config, callback) => {
  const compiler = new Compiler(config);
  compiler.run(callback);
  return compiler;
};

module.exports = webpack;
