// components/img-btn/index.js
Component({
  /**
   * 组件的属性列表
   */
  //开启插槽
  options: { multipleSlots:true},
  properties: {
    openType:{
      type:String
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
    //获取用户信息
    onGetUserInfo(e){
      this.triggerEvent('getuserinfo',e.detail)
    }
  }
})
