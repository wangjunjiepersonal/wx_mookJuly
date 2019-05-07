// pages/book/book.js

import { BookModel } from '../../models/book.js'
import { random } from '../../utils/random.js'
const bookModel = new BookModel()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    //意义 页面渲染数据 控制搜索页面切换  控制上拉刷新
    books:[],
    searching:false,
    more: false
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    bookModel.getHotList().then(res=>{
      this.setData({
        books : res
      })
    })
  },
  //点击搜索框
  onSearching(e) {
    this.setData({
      searching: true
    })
  },
  //子组件的关闭按钮
  onCancel(){
    this.setData({
      searching: false
    })
  },
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
    
    this.setData({
      more: random(10)
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})