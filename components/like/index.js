// components/like/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    like: {
      type: Boolean,
    },
    count: {
      type: Number,
      value: 100
    },
    readOnly: {
      type: Boolean
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    likeIt: false,
    yesSrc: '../images/like.png',
    noSrc: '../images/like@dis.png',
    count: 0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onLike(event) {
      if(this.properties.readOnly) return
      let {
        like,
        count
      } = this.properties
      count = like ? count - 1 : count + 1
      this.setData({
        like: !like,
        count,
      })
      // 自定义事件，自定义参数
      let behavior = this.properties.like ? 'like' : 'cancle'
      this.triggerEvent('like', {
        behavior
      })
    }
  }
})