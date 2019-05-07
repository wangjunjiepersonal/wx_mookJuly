//srarch 组件模块js

import { Http } from '../utils/http-p.js'
const key = 'q'
const max = 10
class KeywordModel extends Http {
  
  getHistory() {
    const words = wx.getStorageSync(key)
    if (!words) {
      return []
    }
    return words
  }

  getHot() {
    return this.request({
      url: '/book/hot_keyword'
    })
  }
  addToHistory(word) { // 关键字写入缓存中
    let keywords = this.getHistory()
    // const has = keywords.inlcludes(word)
    let index = keywords.indexOf(word)
    if (index == -1) {
      let length = keywords.length
      if (length >= max) {
        keywords.pop(word)
      }
      keywords.unshift(word)
      wx.setStorageSync(key, keywords)
    }
  }
}

export { KeywordModel }
