import {
  fetch
} from '../utils/fetch.js'
class LikeModel extends fetch {
  static likeTheme(behavior, id, category) {
    let url = behavior === 'like' ? '/like' : '/like/cancel'
    return this.request({
      url: url,
      method: 'POST',
      data: {
        art_id: id,
        type: category
      }
    })
  }
  static getClassicFavorStatus(artId, category) {
    return this.request({
  url: `/classic/${category}/${artId}/favor`
})
  }

}
export {
  LikeModel
}