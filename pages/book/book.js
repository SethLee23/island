// pages/book/book.js
import {
  BookModel
} from '../../modules/book.js'
import {
  keyWordModel
} from '../../modules/keyword.js'

Page({
  data: {
    book: null,
    searching: false,
    historyList: null,
    hotKeyword: null,
    searchedBookList: null,
    more: false,
    value: '',
    finished: false,
    loading: false,
    notfound: false
  },
  onLoad: function(options) {
    wx.showLoading({
      title: '加载中',
    })
    this._getHotBookList()
  },

  onSearch: function() {
    this._initialSearchPane()
    this._initialHotKeyWord()
  },

  cancelSearch: function() {
    this._initialData()
    this.setData({
      searching: false
    })
  },

  searchBook: function(e) {
    this._initialData()
    wx.showLoading({
      title: '加载中',
    })
    const value = e.detail.value
    this._getsearchingBookList(value)
    this._addSearchHistory()
  },
  
  onReachBottom: function() {
    let {
      value,
      searchedBookList,
      loading,
      finished,
      total
    } = this.data
    if (finished || this._isLocked()) return
    if (value && searchedBookList && searchedBookList.length > 0) {
      let length = searchedBookList.length
     this._locked()
      if (length >= total) {
        this.setData({
          finished: true,
          more: false
        })
        return
      }
      this._loadMore(length, value, searchedBookList, loading)
    }
    return
  },
  // helper
  _initialData: function() {
    this.setData({
      searchedBookList: [],
      total: null,
      more: false,
      notfound: false
    })
  },
  _initialSearchPane: function() {
    this.setData({
      searching: true,
      historyList: keyWordModel.getHistory(),
    })
  },
  _initialHotKeyWord() {
    keyWordModel.getHot().then(res => {
      this.setData({
        hotKeyword: res.data.hot
      })
    })
  },
  _getsearchingBookList: function(value) {
    BookModel.searchBookList(0, value).then(
      res => {
        if (res.data.books.length==0){
          this.setData({
            notfound: true
          })
        }else{
          this.setData({
            notfound: false
          })
        }
        this.setData({
          searchedBookList: res.data.books,
          value: value,
          total: res.data.total
        })
        keyWordModel.addToHistory(value)
        wx.hideLoading()
      }
    )
  },
  _addSearchHistory: function() {
    this.setData({
      historyList: keyWordModel.getHistory()
    })
  },
  _getHotBookList: function() {
    BookModel.getHotBookList().then(res => {
      this.setData({
        book: res.data
      })
      wx.hideLoading()
    })
  },
  _loadMore: function(length, value, searchedBookList) {
    BookModel.searchBookList(length, value).then((res) => {
      this.setData({
        searchedBookList: searchedBookList.concat(res.data.books),
      })
      this._unLock()
    },()=>{
      //请求失败依旧需要解锁，防止网络断开成为死锁
      this._unLock()
    })
  },
  _isLocked: function () {
    return this.data.loading ? true : false
  },
  _locked: function () {
    this.setData({
      loading: true,
      more: true
    })
  },
  _unLock: function () {
    this.setData({
      loading: false,
      more: false
    })
  },
  onShareAppMessage: function() {

  }
})