
import { config } from '../config.js'
//错误码的校验
const tips = {
  1: '骚瑞 出现了一个未知错误',
  1005: 'appkey无效',
  3000: '请求信息失效'
}
// 作为通用的数据请求方法
class Http {
  // Promise封装的请求
  request({ url, data = {}, method = "GET"}){
    return new Promise((resolve,reject)=>{
      this._request(url,resolve,reject,data,method)
    })
  }
  // 创建数据请求方法
  _request(url,resolve,reject,data = {},method="GET") {
    wx.request({
      url: config.api_blink_url + url,
      data: data,
      header: {
        'content-Type': 'application/json',
        'appkey': config.appkey
      },
      method:method,
      dataType: 'json',
      responseType: 'text',
      success: (res) => {
        let code = res.statusCode.toString()
        if (code.startsWith('2')) {
          resolve(res.data)
        } else {
          reject()
          let error_code = res.data.error_code
          this._show_error(error_code)
        }
      },
      fail: (res) => {
        reject()
        this._show_error(1)
      },
      complete: function (res) { },
    })
  }
  //错误信息处理
  _show_error(error_code) {
    if (!error_code) {
      error_code = 1
    }
    const tip = tips[error_code]
    wx.showToast({
      title: tip ? tip : tips[1],
      icon: 'none',
      image: '',
      duration: 1900
    })
  }
}


export { Http }