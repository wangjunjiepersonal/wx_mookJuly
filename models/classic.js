
import {Http} from '../utils/http.js'

class ClassicModel  extends Http{
  // 请求最新下一张的内容
  getLatest(callback){
    this.request({
      url: 'classic/latest',
      success: (res) => {
        let key = this._getKey(res.data.index)
        wx.setStorageSync(key, res.data)
        this._setLatestIndex(res.data.index)
        callback(res.data)
      }
    })
  }
  //请求上一张下一张的合写方法 方法请求路径一致 只是后缀不同
  getClassic(index,norp,callback){
    let key = norp == 'next' ? this._getKey(index + 1) : this._getKey(index - 1)
    let classic = wx.getStorageSync(key)
    
    if(!classic){
      this.request({
        url: `classic/${index}/${norp}`,
        success: (res) => {
          wx.setStorageSync(this._getKey(res.data.index), res.data)
          callback(res.data)
        }
      })
    }else{
      callback(classic)
    }
    
  }

  //判断是第一张还是最后一张
  isFirst(index){
    return index === 1 ? true : false
  }
  isLatest(index){
    let latestIndex = this._getLatestIndex()
    
    return latestIndex === index ? true : false 
  }
  //缓存当前的classicIndex
  _setLatestIndex(index){
    wx.setStorageSync('latest', index)
  }
  _getLatestIndex(){
    let index = wx.getStorageSync('latest')
    return index
  }
  //获取key值进行缓存 
  _getKey(index){
    let key = `classic-${index}`
    return key
  }
  //获取喜欢的图书
  getMyFavor(success){
    const params = {
      url:'classic/favor',
      success:success
    }
    this.request(params)
  }
}

export { ClassicModel }