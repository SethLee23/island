
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
    loading: false,
    searchData: {
      historyList: null,
      hotKeyword: null,
      searchedBookList: null,
      loadMore: false,
      value: '',
      finished: false,

      notfound: false
    }
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
      finished,
      total
    } = this.data.searchData 
    let { loading,searchData } = this.data
    if (finished || this._isLocked()) return
    if (value && searchedBookList && searchedBookList.length > 0) {
      let length = searchedBookList.length
      this._locked()
      if (length >= total) {
        
        this.setData({
          searchData: Object.assign(searchData, {
            finished: true,
            loadMore: false
          })

        })
        return
      }
      this._loadMore(length, value, searchedBookList, loading)
    }
    return
  },
  // helper
  _initialData: function() {
    let {searchData } = this.data
    this.setData({
      searchData: Object.assign(searchData, {
        searchedBookList: [],
        total: null,
        loadMore: false,
        notfound: false
      })
    })
  },
  _initialSearchPane: function() {
    let { searchData } = this.data
    this.setData({
      searching: true,
      searchData: Object.assign(searchData, {
        historyList: keyWordModel.getHistory(),
      })
    })
  },
  _initialHotKeyWord() {
    let { searchData } = this.data
    keyWordModel.getHot().then(res => {
      this.setData({
        searchData: Object.assign(searchData, {
          hotKeyword: res.data.hot
        })
      })
    })
  },
  _getsearchingBookList: function(value) {
    let { searchData } = this.data
    BookModel.searchBookList(0, value).then(
      res => {
        if (res.data.books.length == 0) {
          this.setData({
            searchData: Object.assign(searchData, {
              notfound: true
            })
          })
        } else {
          this.setData({
            searchData: Object.assign(searchData, {
              notfound: false
            })
          })
        }
        this.setData({
          searchData: Object.assign(searchData, {
            searchedBookList: res.data.books,
            value: value,
            total: res.data.total
          })
        })
        keyWordModel.addToHistory(value)
        wx.hideLoading()
      }
    )
  },
  _addSearchHistory: function() {
    let { searchData } = this.data
    this.setData({
      searchData: Object.assign(searchData, {
        historyList: keyWordModel.getHistory()
      })
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
    let { searchData } = this.data
    BookModel.searchBookList(length, value).then((res) => {
      this.setData({
        searchData: Object.assign(searchData, {
          searchedBookList: searchedBookList.concat(res.data.books),
        })
      })
      this._unLock()
    }, () => {
      //请求失败依旧需要解锁，防止网络断开成为死锁
      this._unLock()
    })
  },
  _isLocked: function() {
    return this.data.loading ? true : false
  },
  _locked: function() {
    let { searchData } = this.data
    this.setData({
      loading: true,
      searchData: Object.assign(searchData, {
        loadMore: true
      })
    })
  },
  _unLock: function() {
    let { searchData } = this.data
    this.setData({
      loading: false,
      searchData: Object.assign(searchData, {
        loadMore: false
      })
    })
  },
  onShareAppMessage: function() {

  }
})