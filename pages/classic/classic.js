// pages/classic/classic.js
// import { fetch } from '../../utils/fetch.js'
import {
  ClassicModel
} from '../../modules/classic.js'
import {
  LikeModel
} from '../../modules/like.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    classicData: null,
    latest: true,
    first: false,
    likeCount: 0,
    likeStatus: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    ClassicModel.getLatest().then(res => {
      this.setData({
        classicData: res.data,
        likeCount: res.data.fav_nums,
        likeStatus: res.data.like_status
      })
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

  },

  onLike: function(data) {
    console.log(data)
    let behavior = data.detail.behavior
    let {
      id,
      type
    } = this.data.classicData
    LikeModel.likeTheme(behavior, id, type).then(res => {
      console.log(res.data)
    }).catch(err => {
      console.log(err)
    })
  },
  triggerPrevious: function() {
    this.updatePane('previous')
  },
  triggerNext: function() {
    this.updatePane('next')
  },
  _getLikeStatus: function(artId, category) {
    LikeModel.getClassicFavorStatus(artId, category).then(res => {
     this.setData({
       likeCount: res.data.fav_nums,
       likeStatus: res.data.like_status
     })
    })
  },
  // helper
  updatePane(nextOrPrev) {
    let index = this.data.classicData.index
    ClassicModel.getClassic(index, nextOrPrev).then(
      res => {
        this.setData({
          classicData: res,
          first: ClassicModel.isFirst(res.index),
          latest: ClassicModel.isLatest(res.index)
        })
        console.log('更新')
        this._getLikeStatus(res.id,res.type)
      }
    )
  },
})