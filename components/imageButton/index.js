// components/imageButton/index.js
Component({
options: {
  multipleSlots: true
},
  properties: {
    openType: {
      type: String,
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onGetUserInfo(event){
this.triggerEvent('deliverUserInfo',event.detail,{})
    }
  }
})
