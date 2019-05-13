// pages/book-detail/book-detail.js

import { BookModel } from '../../models/book.js' 
import { LikeModel } from '../../models/like.js'
const bookModel = new BookModel()
let likeModel = new LikeModel()

Page({

  /**
   * 页面的初始数据 
   */
  data: {
    // 书籍的短评 书名 喜欢的状态  喜欢的数量 评论的输入框
    comments:[],
    book:null,
    likeStatus:false,
    likeCount:0,
    posting:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading()
    const bid = options.bid
    //获取书籍信息 点赞 短评
    // const detail = bookModel.getDetail(bid).then(res=>{
    //   this.setData({
    //     book:res
    //   })
    // })
    // const comments = bookModel.getComments(bid).then(res => {
    //   this.setData({
    //     comments: res.comments
    //   })
    // })  
    // const likeStatu = bookModel.getLikeStatus(bid).then(res => {
    //   this.setData({
    //     likeStatus: res.like_status,
    //     likeCount: res.fav_nums
    //   })
    // })
    //Promise.all
    const detail = bookModel.getDetail(bid)
    const comments = bookModel.getComments(bid)
    const likeStatus = bookModel.getLikeStatus(bid)
    Promise.all([detail, comments, likeStatus]).then(res=>{
      this.setData({
        book: res[0],
        comments: res[1].comments,
        likeStatus: res[2].like_status,
        likeCount: res[2].fav_nums
      })
      wx.hideLoading()
    })  
  },
  //点击喜欢按钮
  onLike(e){
    const like_or_cancel = e.detail.behavior
    likeModel.like(like_or_cancel, this.data.book.id, 400)
  },
  //点击评论输入框
  onFakePost(e){
    this.setData({
      posting: true
    })
  },
  //点击取消按钮
  onCancel(e){
    this.setData({
      posting: false
    })
  },
  //点击小标签提交
  onPost(e){
    const comment = e.detail.text || e.detail.value
    
    if(comment.length>12){
      wx.showToast({
        title: '短评最多12个字',
        icon: 'none'
      })
      return
    }else if(!comment){
      return
    }
    bookModel.postComment(this.data.book.id,comment).then(res=>{
      wx.showToast({
        title: '评论成功',
        icon: ''
      })
      this.data.comments.unshift({
        content:comment,
        nums:1
      })
      this.setData({
        comments: this.data.comments,
        posting:false
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