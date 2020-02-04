## dll
> `DllReferencePlugin`与`DllPlugin`一起使用

- 先单独打包`Dll`, 生成对应的描述文件`xxx.manifest.json`与`xx.dll.js`
- 在`webpack.config`中使用插件连接对应的描述文件
- **最重要的是必须要在html中手动引入`xx.dll.js`**

**如果打包时 发现存在`xxx.manifest.json`对应的描述文件, 就不会重复打包, 减少打包时间/体积**

```js
import React form 'react';
let React = _dll_react.React
// 扫描 xxx.manifest.json中的键值对 赋值到全局变量上就不需要打包了
// 作如下转换
- import ReactDOM form 'react-dom';
- import ReactDOM form '/node_modules/_react-dom@16.12.0@react-dom/index.js';

