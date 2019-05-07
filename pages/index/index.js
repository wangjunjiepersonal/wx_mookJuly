//index.js

import { ClassicModel } from '../../models/classic.js'
import { LikeModel } from '../../models/like.js'

let classicModel = new ClassicModel()
let likeModel = new LikeModel()

//获取应用实例
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    //接收数据参数 是否为第一个 是否为最后一个
    classic:null,
    first:false,
    latest:true,
    likeCount:0,
    likeStatus:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 封装后的请求方法
    classicModel.getLatest((res)=>{
      this.setData({
        classic: res,
        likeStatus: res.like_status,
        likeCount: res.fav_nums
      })
      console.log(res)
    })
    
  },
  //点击喜欢还是不喜欢
  onLike(e){
    let behavior = e.detail.behavior
    likeModel.like(behavior,this.data.classic.id,this.data.classic.type)
  },
  // 点击左右切换按钮
  onNext(e){
    this._updataClassic('next')
  },
  onPrev(e) {
    this._updataClassic('previous')
  },
  //这是按钮的请求封装方法
  _updataClassic(norp){
    let index = this.data.classic.index
    classicModel.getClassic(index,norp, (res) => {
      this._getLikeStatus(res.id,res.type)
      this.setData({
        classic: res,
        latest: classicModel.isLatest(res.index),
        first: classicModel.isFirst(res.index)
      })
    })
  },
  //更新喜欢还是不喜欢的状态
  _getLikeStatus(artID, category){
    likeModel.getClassicLike(artID,category,(res)=>{
      this.setData({
        likeStatus:res.data.like_status,
        likeCount:res.data.fav_nums
      })
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
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})