
import {config} from '../config.js'
//错误码的校验
 const tips = {
   1:'骚瑞 出现了一个未知错误',
   1005:'appkey无效',
   3000:'请求信息失效'
 }
// 作为通用的数据请求方法
class Http {
  // 创建数据请求方法
  request(params){
    if(!params.method){
      params.method = 'GET'
    }
    wx.request({
      url: config.api_blink_url+params.url,
      data: params.data,
      header: {
        'content-Type':'application/json',
        'appkey': config.appkey
      },
      method: params.method,
      dataType: 'json',
      responseType: 'text',
      success: (res) => {
        let code = res.statusCode.toString()
        if(code.startsWith('2')){
          params.success && params.success(res)
        }else{
          let error_code = res.data.error_code
          this._show_error(error_code)
        }
      },
      fail: (res) => {
        this._show_error(1)
      },
      complete: function(res) {},
    })
  }
  //错误信息处理
  _show_error(error_code){
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