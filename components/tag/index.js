// components/tag/index.js bind  bind 
Component({
  /**
   * 组件的属性列表
   */
  externalClasses: ['tag-class'], // 组件外部传入的样式
  properties: {
    text:String,
    // tag:Number
  },
  // 启动slot插槽
  options:{ multipleSlots: true },
  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    onTap(e){
      //自定义事件
      this.triggerEvent('tapping',{
        text:this.properties.text
      })
    }
  }
})
