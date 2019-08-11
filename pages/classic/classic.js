// pages/classic/classic.js
// import { fetch } from '../../utils/fetch.js'
import {
  ClassicModel
} from '../../modules/classic.js'
import {
  LikeModel
} from '../../modules/like.js'
Page({

  data: {
    classicData: null,
    latest: true,
    first: false,
    likeCount: 0,
    likeStatus: false
  },

  onLoad: function(options) {
    ClassicModel.getLatest().then(res => {
      this.setData({
        classicData: res.data,
        likeCount: res.data.fav_nums,
        likeStatus: res.data.like_status
      })
    })
  },

  onLike: function(data) {
    let behavior = data.detail.behavior
    let {
      id,
      type
    } = this.data.classicData
    LikeModel.likeTheme(behavior, id, type)
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
        // console.log('更新')
        this._getLikeStatus(res.id,res.type)
      }
    )
  },
})