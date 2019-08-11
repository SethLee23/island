import {
  BookModel
} from '../../modules/book.js'
import {
 ClassicModel
} from '../../modules/classic.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    authorized: false,
    defaultSrc: '/images/my/my.png',
    userInfo: null,
    favCount: 0,
    classics: null,
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.userAuthorized()
    this.getFavCount()
    this.getFavItem()
  },
  getFavCount: function(){
    BookModel.getBookCount().then(res=>{
      console.log(res.data.count)
      this.setData({
        favCount: res.data.count
      })
    })
  },
  userAuthorized() {
    wx.getSetting({
      success: data => {
        if (data.authSetting['scope.userInfo']) {
          console.log('已授权')
          wx.getUserInfo({
            success: (data) => {
              console.log(data.userInfo)
              this.setData({
                userInfo: data.userInfo,
                authorized: true
              })
            }
          })
        } else {
          console.log('未授权')
        }
      }
    })
  },
  onGetUserInfo(e) {
    const userInfo = e.detail.userInfo
    if (userInfo) {
      this.setData({
        userInfo: userInfo,
        authorized: true
      })
    }
  },
  onPreviewTap: function () { },
  getFavItem: function () {
    ClassicModel.getFavItem().then(res => {
      this.setData({
        classics: res.data
      })
    })
  },
  onJumpToAbout(e) {
    wx.navigateTo({
      url: '/pages/about/about',
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})