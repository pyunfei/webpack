function d(obj, name, get) {
  Object.defineProperty(obj, name, { get })
}

const obj = {};
const age = 100;
d(obj, 'age', function () {
  return age;
})
console.log(obj)
console.log(obj.age)