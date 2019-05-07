// components/navi/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    //定义标题的内容 是否为第一个或者最后一个组件
    title:String,
    first:Boolean,
    latest:Boolean
  },

  /**
   * 组件的初始数据
   */
  data: {
    //图片的路径
    disLeftSrc: '../../images/triangle.dis@left.png',
    highLeftSrc: '../../images/triangle@left.png',
    disRightSrc: '../../images/triangle.dis@right.png',
    highRightSrc: '../../images/triangle@right.png'
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onLeft(e){
      if(!this.properties.latest){
        this.triggerEvent('left', {}, {})
      }
    },
    onRight(e) {
      if (!this.properties.first) {
        this.triggerEvent('right', {}, {})
      }
    }
  }
})
