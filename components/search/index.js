// components/search/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    historyList: Array,
    hotKeyword: Array,
    searchedBookList: Array,
    loadMore: Boolean,
    finished: Boolean,
    notfound: Boolean
  },

  /**
   * 组件的初始数据
   */
  data: {
    searching: false,
    value: '',
  },
  attached() {
    console.log(this.properties.historyList)
  },
  /**
   * 组件的方法列表
   */
  methods: {
    onCancel() {
      this.triggerEvent('cancel')
      this.setData({
        value: '',
      })
    },
    onDelete() {
      this.setData({
        value: '',
        searching: false
      })
    },
    searchBook(e) {
      let value = e.detail.value || e.detail.text
      if (value && value.length > 0) {
        this.setData({
          searching: true,
          value,
        })
        this.triggerEvent('search', {
          value: value
        })
      }
      return
    },
  }
})