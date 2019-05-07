// components/index/music/index.js

import { classicBeh } from '../classic-beh.js'

//获取音乐管理对象
const mMgr = wx.getBackgroundAudioManager()
Component({
  /**
   * 组件的属性列表
   */
  behaviors: [classicBeh],
  properties: {
    src:String,
    title: String
  },

  /**
   * 组件的初始数据
   */
  data: {
    //播放状态图片
    playSrc: '../../../images/player@waitting.png',
    pauseSrc: '../../../images/player@playing.png',
    playIng:false
  },
  attached:function(e){
    this._recoverStatus()
    this._monitorSwit()
  },

  /**
   * 组件的方法列表
   */
  methods: {
    //音乐播放
    onPlay() {
      if (!this.data.playIng) {
        this.setData({
          playIng: true
        })
        mMgr.src = this.properties.src
        mMgr.title = this.properties.title
        
      } else {
        this.setData({
          playIng: false
        })
        mMgr.pause()
      }
    },
    //处理音乐播放的状态 
    _recoverStatus(){
      if(mMgr.paused){
        this.setData({
          playIng: false
        })
        return
      } else if(mMgr.src == this.properties.src){
        if(!mMgr.paused){
          this.setData({
            playIng: true
          })
        }
      }
    },
    //音乐开关
    _monitorSwit(){
      mMgr.onPlay(()=>{
        this._recoverStatus()
      })
      mMgr.onPause(() => {
        this._recoverStatus()
      })
      mMgr.onStop(() => {
        this._recoverStatus()
      })
      mMgr.onEnded(() => {
        this._recoverStatus()
      })
    }
  }
})
