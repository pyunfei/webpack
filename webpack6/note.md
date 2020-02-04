## dll
> `DllReferencePlugin`与`DllPlugin`一起使用

- 先单独打包`Dll`, 生成对应的描述文件`xxx.manifest.json`与`xx.dll.js`
- 在config中使用插件连接对应的描述文件

**如果打包时 发现存在`xxx.manifest.json`对应的描述文件, 就不会重复打包, 减少打包时间/体积**