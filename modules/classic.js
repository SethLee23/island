import {
  fetch
} from '../utils/fetch.js'
// 存入并获取 storage 中的 index
const _setLatestClassic = (index) => {
  wx.setStorageSync('latest', index)
}
const _getLatestClassic = () => {
  let index = wx.getStorageSync('latest')
  return index
}
const _getKey = (index) => {
  let key = `classic-${index}`
  return key
}
class ClassicModel extends fetch {
  static getLatest() {
    return new Promise((resolve, reject) => {
      this.request({
        url: '/classic/latest'
      }).then(res => {
        // 传递 res，设置localStorage
        resolve(res)
        _setLatestClassic(res.data.index)
        let key = _getKey(res.data.index)
        wx.setStorageSync(key, res.data)
      })
    })
  }
  static getClassic(index, nextOrPrevious) {
    // 缓存中寻找 or API 写到缓存中
    let key = nextOrPrevious === 'next' ? _getKey(index + 1) : _getKey(index - 1)
    console.log(key)
    let classic = wx.getStorageSync(key)
    if(!classic) {
      // 不存在于缓存，存储在缓存中
     return new Promise((resolve,reject)=>{
        this.request({
         url: `/classic/${index}/${nextOrPrevious}`
       }).then(res=>{
         resolve(res.data)
         wx.setStorageSync(_getKey(res.data.index), res.data)
       })
     })
    }else{
      // 存在于缓存，直接读取缓存
      return new Promise ((resolve,reject)=>{
        resolve(classic)
      })
    }
   
  }
  static getFavItem() {
    return this.request({
      url: '/classic/favor'
    })
  }
  static isFirst(index) {
    return index === 1 ? true : false
  }
  static isLatest(index) {
    let latestIndex = _getLatestClassic()
    return index === latestIndex ? true : false
  }
}
export {
  ClassicModel
}