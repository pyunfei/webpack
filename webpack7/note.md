## tree shaking

 - 配置模式为 `mode:'production'`,
 - 配置调试为 `devtool:'none'`,
 - 增加配置插件  `{ modules: false }`,
> 就会自动清除未使用的模块, 必须是es6的静态引入 所以使用`{ modules: false }`来避免babel转化为`require`动态加载
```js
function f1() {
  return 'f1'
}
function f2() {
  return 'f2'
}
export {
  f1, f2
}
import { f1 } from './funcs'
console.log(f1());
```
> 该代码块未使用到, 变为自动清除
```js
if(false){
  console.log('false');
}
```
> 该代码块只导入未使用也会被擦掉
```js
import { f1 } from './funcs'
f1();
```
> 只是单纯的操作变量,未使用也会被擦掉
```js
let str = "1";
str = "2"
str = "3"
```
---
> 要想更好的实现摇树功能
- 尽量使用`esModule`，避免使用`require`,
- 不要改变全局变量
- 不要改变传入参数