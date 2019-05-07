
import { ClassicModel } from '../../models/classic.js'
import { BookModel } from '../../models/book.js'

let classicModel = new ClassicModel()
let bookModel = new BookModel()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //意义 切换用户头像 用户信息
    hasUserInfo:false,
    userInfo:null,
    bookCount:0,
    classics:[]
  },
 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.userAuthorized()
    this.getMyBookCount()
    this.getMyFavor()
  },
  //
  //检测用户是否授权
  userAuthorized(){
    wx.getSetting({
      success: (res) => {
        if(res.authSetting['scope.userInfo']){
          wx.getUserInfo({
            success: (res) => {
              this.setData({
                hasUserInfo: true,
                userInfo: res.userInfo
              })
            },
            fail: function(res) {},
            complete: function(res) {},
          })
        }
      },
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  //获取用户信息
  onGetUserInfo(e) {
    const userInfo = e.detail.userInfo
    if(userInfo){
      this.setData({
        userInfo,
        hasUserInfo: true
      })
    }
  },
  //跳转到其他页面
  onJumpToAbout(e){
    wx.navigateTo({
      url: '/pages/about/about',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  onStudy(){
    wx.navigateTo({
      url: '/pages/course/course',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  //获取书籍数量
  getMyBookCount(){
    bookModel.getMyBookCount().then(res => {
      this.setData({
        bookCount: res.count
      })
    })
  },
  //获取喜欢的图书
  getMyFavor: function () {
    classicModel.getMyFavor(res => {
      this.setData({
        classics: res.data
      })
      console.log(res.data)
    })
  },
  //进入喜欢的页面
  // onPreviewTap(event){
  //   const cid = event.detail.cid
  //   const typs = event.detail.typs
  //   wx.navigateTo({
  //     url: `/pages/book-detail/book-detail?bid=${cid}&type=${typs}`
  //   })
  // },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})