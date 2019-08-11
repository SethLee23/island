let paginationBeh = Behavior({
  data: {
    dataArray: null,
    total: 0,
  },
  methods: {
    getMoreData(dataArray){
      const tempArray = this.data.dataArray.concat(dataArray)
      this.setData({
        dataArray: tempArray
      })
    },
    getCurrentStart(){
      return this.data.dataArray.length
    },
    setTotal(total){
      this.data.total = total
    },
    hasMore(){
      let { total, dataArray} = this.data
      if (dataArray && dataArray.length<=total){
        return true
      }else{
        return fasle
      }
    },
    isLocked: function () {
      return this.data.loading ? true : false
    },
    locked: function () {
      this.setData({
        loading: true,
        more: true
      })
    },
    unLock: function () {
      this.setData({
        loading: false,
        more: false
      })
    },
  }
})
export { paginationBeh }