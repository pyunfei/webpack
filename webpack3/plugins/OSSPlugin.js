const fs = require('fs')
// const OSS = require('ali-oss')

const imgPath = 'dist'

function sleep() { // 延迟睡眠函数
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve()
    }, 500)
  })
}

async function uploadImg(files) {
  const client = new OSS({ // OSS相关的参数
    region: 'xxxxxxxxxxxxxxxx',
    accessKeyId: 'xxxxxxxxxxxxxxxx',
    accessKeySecret: 'xxxxxxxxxxxxxxxx',
    bucket: 'xxxxxxxxxxxxxxxx',
  })

  for (let i = 0, len = files.length; i < len; i++) { // 将dist包中common下存放的图片全部上传oss
    await client.put(`common/${files[i]}`, `${imgPath}/common/${files[i]}`)
    await sleep()
  }

  for (let i = 0, len = files.length; i < len; i++) { // 删除dist包中的图片
    fs.unlinkSync(`${imgPath}/common/${files[i]}`) 
  }

  console.log('\x1B[44m%s\x1B[49m', 'upload img fished>>>>>>>>>>>>>>>')
}

class OssPlugin {
  apply(compiler) {
    compiler.hooks.afterEmit.tapAsync('done', (compilation, callback) => {
      fs.readdir(`${imgPath}/common`, (err, files) => { // 读取dist/common下的全部图片
        if (err) {
          console.error(err)
        } else {
          console.log('files============', files);
          uploadImg(files)
        }
      })
      callback()
    })
  }
}

module.exports = OssPlugin