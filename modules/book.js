import {
  fetch
} from '../utils/fetch.js'

class BookModel extends fetch {
  static getHotBookList() {
    return this.request({
      url: '/book/hot_list'
    })
  }
  static getBookCount() {
    return this.request({
      url: '/book/favor/count'
    })
  }
  static getBookDetail(id) {
    return this.request({
      url: `/book/${id}/detail`
    })
  }
  static getBookComment(id) {
    return this.request({
      url: `/book/${id}/short_comment`
    })
  }
  static getBookLikeStatus(id) {
    return this.request({
      url: `/book/${id}/favor`
    })
  }
  static postBookComment(
    id,
    comment
  ) {
    return this.request({
      url: '/book/add/short_comment',
      method: "post",
      data: {
        book_id: id,
        content: comment
      }
    })
  }
  static searchBookList(start = 0, q) {
    return this.request({
      url: '/book/search?summary=1',
      data: {
        q,
        start
      }
    })
  }
}
export {
  BookModel
}