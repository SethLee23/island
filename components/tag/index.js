// components/tab/index.js
Component({
  options: {
    multipleSlots: true,
  },
  properties: {
    text: String,
    num: Number
  },
  attached() {
    // console.log(this.properties.text)
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
    onTag(options){
      const text = this.properties.text
     this.triggerEvent('tapping',{text})
    }
  }
})