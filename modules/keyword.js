import {
  fetch
} from '../utils/fetch.js'
const maxLength = 10
class keyWordModel extends fetch {
  static getHistory() {
    return wx.getStorageSync('q')
  }
  static getHot() {
    return this.request({
      url: '/book/hot_keyword'
    })
  }
  static addToHistory(keyword) {
    let words = this.getHistory() || []
    if (!words.includes(keyword)) {
      if (words.length >= maxLength) {
        words.pop()
      }
      words.unshift(keyword)
      wx.setStorageSync('q', words)
    }
    return
  }
}
export {
  keyWordModel
}