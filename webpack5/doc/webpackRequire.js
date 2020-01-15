// 模拟 __webpack_require__
(function (modules) {
  /** i->moduleId l->是否加载
   * {"./src/index.js": { i: "./src/index.js", l: true, exports: {} }}
   * {"./src/title.js": { i: "./src/title.js", l: true, exports: "title" }}
   */
  var cacheModules = {};

  function __webpack_require__(moduleId) {
    if (cacheModules[moduleId]) {
      return cacheModules[moduleId].exports;
    }
    var module = cacheModules[moduleId] = {
      i: moduleId,
      l: false,
      exports: {}
    };

    modules[moduleId].call(module.exports, module, module.exports, __webpack_require__)

    module.l = true;

    return module.exports;
  }
  return __webpack_require__("./src/index.js");
})({
  "./src/index.js": function (module, exports, __webpack_require__) {
    var title = __webpack_require__(/*! ./title */ "./src/title.js");
    console.log(title);
  },
  "./src/title.js": function (module, exports) {
    module.exports = "title";
  }
});
