import {Http} from '../utils/http.js' 
//继承http的数据请求方法

class LikeModel extends Http {
  like(behavior,artID,category){
    let url = behavior=='like'?'like':'like/cancel'
    this.request({
      url: url,
      data: {
        art_id: artID,
        type: category
      },
      method: 'POST'
    })
  }
  //喜欢按钮的单独请求 
  getClassicLike(artID,category,callback){
    this.request({
      url: `classic/${category}/${artID}/favor`,
      success:callback
    })
  }
}
export { LikeModel }