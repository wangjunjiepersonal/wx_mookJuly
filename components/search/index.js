// components/search/index.js

import { KeywordModel } from '../../models/keyword.js'
import { BookModel } from '../../models/book.js'
import { paginationBev } from '../paaination.js'

const keyModel = new KeywordModel()
const bookModel = new BookModel()
Component({
  /**
   * 组件的属性列表
   */
  behaviors: [paginationBev],
  properties: {
    //第三个参数 监听该值的变化 如果变化则触发方法
    more:{
      type:String,
      observer: '_load_more'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    //意义 获取历史搜索 获取热门搜索 获取搜索框控制变量 获取搜索框value值 锁
    historyWords:[],
    hotKeys:[],
    searching:false,
    q:'',
    loading:false,
    loadingCenter:false
  },
  attached(){
    const historyWords = keyModel.getHistory()
    this.setData({
      historyWords
    })  
    const hotWords = keyModel.getHot().then(res=>{
      this.setData({
        hotKeys:res.hot
      })
    })
  },
  /**
   * 组件的方法列表
   */
  methods: {
    //点击取消按钮
    onCancel(e){
      this.triggerEvent('cancel',{

      })
      this.initinlize()
    },
    //搜索框输入事件
    onConfirm(e){
      this.setData({
        searching:true,
        dataArray: []  
      })
      this._showload()
      //清空
      // this.initinlize()  
      const q = e.detail.value || e.detail.text
      bookModel.search(0,q).then(res=>{
        this.setMoreData(res.books)
        this.setTotal(res.total)
        this.setData({
          q
        })
        keyModel.addToHistory(q)
        this._hideload()
      })
    },
    //点击xx删除搜索
    onDelete(){
      this.setData({
        searching:false,
        q:''
      })
      this.initinlize()
    },
    // observer方法
    _load_more(){
      if(!this.data.q){return}
      if(this.data.loading){return}
      if(this.hasMore()){
        this.setData({
          loading : true
        })
        bookModel.search(this.getCurrentStart(), this.data.q).then(res => {
          this.setMoreData(res.books)
          this.setData({
            loading: false
          })
        },()=>{
          this.setData({
            loading: false
          })
        })
      }
    },
    //load加载
    _showload(){
      this.setData({
        loadingCenter: true
      })
    },
    _hideload(){
      this.setData({
        loadingCenter: false
      })
    }
  }
})
