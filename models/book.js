import { Http } from '../utils/http-p.js'

class BookModel extends Http {
  //获取书籍接口
  getHotList(){
    return this.request({
      url:'book/hot_list'
    })
  }
  //获取书籍数量
  getMyBookCount(){
    return this.request({
      url: 'book/favor/count'
    })
  }
  //获取书籍的详细信息
  getDetail(bid){
    return this.request({
      url: `book/${bid}/detail`
    })
  }
  //获取书籍点赞状态
  getLikeStatus(bid){
    return this.request({
      url: `book/${bid}/favor`
    })
  }
  //获取书籍的短评
  getComments(bid){
    return this.request({
      url: `book/${bid}/short_comment`
    })
  }
  // 提交短评内容
  postComment(bid,comment){
    return this.request({
      url:'book/add/short_comment',
      method:"POST",
      data:{
        book_id:bid,
        content:comment
      }
    })
  }
  //搜索书籍信息
  search(start, q){
    return this.request({
      url: 'book/search?summary=1',
      data:{
        q:q,
        start:start
      }
    })
  }
}
export { BookModel }