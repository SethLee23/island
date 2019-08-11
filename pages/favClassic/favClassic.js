
import {
  ClassicModel
} from '../../modules/classic.js'
import {
  LikeModel
} from '../../modules/like.js'
Page({
  data: {
    classicData: null,
    likeCount: 0,
    likeStatus: false
  },
  onLoad: function ({type,id}) {
    ClassicModel.getFavClassicDetail(type, id).then(res=>{
      this.setData({
        classicData: res.data,
        likeCount: res.data.fav_nums,
        likeStatus: res.data.like_status
      })
    })
  },
  onLike: function (data) {
    let {behavior} = data.detail
    let { id,type } = this.data.classicData
    LikeModel.likeTheme(behavior, id, type)
  }
})