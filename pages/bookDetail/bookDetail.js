// pages/bookDetail/bookDetail.js
import {
  BookModel
} from '../../modules/book.js'
import {
  LikeModel
} from '../../modules/like.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    comments: null,
    book: null,
    likeStatus: false,
    likeCount: 0,
    posting: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.showLoading({
      title: '加载中',
    })
    const id = options.id
    this.initialBookDetail(id)
  },
  initialBookDetail(id){
    let detail = BookModel.getBookDetail(id)
    let comments = BookModel.getBookComment(id)
    let likeStatus = BookModel.getBookLikeStatus(id)
    Promise.all([detail, comments, likeStatus]).then(res => {
      console.log(res)
      wx.hideLoading()
      this.setData({
        book: res[0].data,
        comments: res[1].data.comments,
        likeStatus: res[2].data.like_status,
        likeCount: res[2].data.fav_nums
      })
    })
  },
  onLike: function(data) {
    let behavior = data.detail.behavior
    let {
      id,
      type
    } = this.data.book
    LikeModel.likeTheme(behavior, id, 400)
  },
  postFake: function() {
    this.setData({
      posting: true
    })
  },
  cancelPost: function() {
    this.setData({
      posting: false
    })
  },
  onPostComment: function(event) {
    let comment = event.type === 'tapping' ? event.detail.text : event.detail.value
    console.log(event.type)
    if (!comment) {
      return
    }
    if (comment.length > 12) {
      wx.showToast({
        title: '短评最多12个字',
        icon: 'none'
      })
      return
    }
    const {
      id
    } = this.data.book
    BookModel.postBookComment(this.data.book.id, comment).then(res => {
      console.log(res)
      wx.showToast({
        title: '+1',
        icon: 'none'
      })
      console.log(this.data.comments)
      this.setData({
        comments: [{
          content: comment,
          nums: 1
        }, ...this.data.comments],
        posting: false,
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

  }
})