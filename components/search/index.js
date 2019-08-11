// components/search/index.js
Component({

  properties: {
    searchData: {
      type: Object
    }
  },

  data: {
    searching: false,
    value: '',
  },

  methods: {
    detached: function() {
      this._removeSearchValue()
    },

    onCancel() {
      this.triggerEvent('cancel')
      this._removeSearchValue()
    },

    onDelete() {
      this._removeSearchValue()
      this.setData({
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

    _removeSearchValue() {
      this.setData({
        value: '',
      })
    },
  }
})