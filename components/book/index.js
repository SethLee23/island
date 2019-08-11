// components/book/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    book: Object,
  },

  /**
   * 组件的初始数据
   */
  data: {

  },
  attached() {
    
  },
  /**
   * 组件的方法列表
   */
  methods: {
    getBookDetail() {
      const id = this.properties.book.id
      // 降低组件通用性，方便
      wx.navigateTo({
        url: `/pages/bookDetail/bookDetail?id=${id}`,
      })
    }
  }
})