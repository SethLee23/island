// 重构代码，初始化参数，封装私有request函数
import {
  config
} from '../config.js'

const tips = {
  1: '抱歉，出现了一个错误',
  1005: 'appkey 无效',
  3000: '期刊不存在'
}
// 错误提示
const showError = (error_code) => {
  if (!error_code) {
    error_code = 1
  }
  const tip = tips[error_code]
  wx.showToast({
    title: tip?tip:tips[1],
    icon: 'none',
    duration: 2000
  })
}
// 封装私有 request
const _request = (url, resolve, method = 'GET', data = {},reject) => {
  wx.request({
    url: config.baseUrl + url,
    method,
    data,
    header: {
      'content-type': 'application/json',
      appkey: config.appkey
    },
    // 小程序中服务器错误4xx，也会走 success 的路径，因此需要判断状态码
    success: (res) => {
      // 返回的状态码是数字，需要转化为字符串
      let code = res.statusCode + ''
      if (code.startsWith('2')) {
        resolve(res)
      } else {
        let error_code = res.data.error_code
        showError(error_code)
        reject(res)
      }
    },
    fail: (err) => {
      showError(1)
      reject(err)
    }
  })
}

class fetch {
  static request({url, data, method}) {
    return new Promise((resolve, reject) => {
      _request(url, resolve, method, data,reject)
    })
  }
}
export {
  fetch
}