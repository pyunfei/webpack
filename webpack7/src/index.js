console.log('tree shaking')
// (function () {
//   const r1 = { id: 0 };
//   const r2 = [];
//   for (let i = 0; i < 10; i++) {
//     r1.id++;
//     r2.push(r1)
//   }
//   console.log(r2)
// })()
import { f1 } from './funcs'
console.log(f1())