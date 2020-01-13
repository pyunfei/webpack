const hello = require('./hello');
import(/* webpackChunkName: "lazy" */'./lazy').then(r => {
  console.log(r.default)
});