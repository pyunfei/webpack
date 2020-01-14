console.log(1)
const button = document.createElement('button');
button.innerHTML = "测试"
button.addEventListener('click', () => {
  import(/*webpackPrefetch: true*/ /*webpackChunkName: 'hello'*/'./hello').then(res => {
    console.log(res)
  })
  import(/*webpackPrefetch: true*/ /*webpackChunkName: 'world'*/'./world').then(res => {
    console.log(res)
  })
})

document.body.appendChild(button)