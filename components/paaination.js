//继承属性 用来封装上拉刷新的数据请求的行为处理

const paginationBev = Behavior({
  data:{
    dataArray:[],
    total: null,
    noneResult:false
  },
  methods:{
    //合并数据
    setMoreData(dataArray){
      const tempArr = this.data.dataArray.concat(dataArray)
      this.setData({
        dataArray: tempArr
      })
    },
    //请求的起始记录数
    getCurrentStart(){
      return this.data.dataArray.length
      
    },
    // 是否有更多数据
    hasMore(){
      if(this.data.dataArray.length >= this.data.total){
        return false
      }
      return true
    },
    //获取数据的最大条数
    setTotal(total){
      this.data.total = total
      if(total == 0){
        this.setData({
          noneResult: true
        })
      }
    },
    //清空之前保存的数据
    initinlize(){
      this.setData({
        dataArray:[],
        noneResult: false
      })
      this.data.total = null
    }
  }
})

export { paginationBev }