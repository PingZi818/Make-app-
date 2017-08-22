/**
 * Created by kition on 2017/5/22.
 */
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import {Http, Response} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { HttpService } from "./HttpServices";
import {Headers, RequestOptions} from '@angular/http';
@Injectable()
export class questionService {
  API_URL = HttpService.api();
  //API_URL = "http://localhost:3001";
  // API_URL = "http://localhost:3001";
  constructor(
    private httpService: HttpService,
    public http: Http
  ) { }

//请求最新课程
  getIndexquestionData() {
    var url = this.API_URL + "/question/getIndexquestionData";
    return this.httpService.httpGetNoAuth(url);
    // return this.httpService.httpGetWithAuth(url);
  }

//请求等待回答
  getwaitquetion() {
    var url = this.API_URL + "/question/getwaitquetion";
    return this.httpService.httpGetNoAuth(url);
    // return this.httpService.httpGetWithAuth(url);
  }
  //请求全部回答
  getAllquestion() {
    var url = this.API_URL + "/question/getAllquestion";
    return this.httpService.httpGetNoAuth(url);
    // return this.httpService.httpGetWithAuth(url);
  }

  //请求猿问详情
  getYuanwenDetail(qno) {
    var url = this.API_URL + "/question/getYuanwenDetail?qno="+qno;
    return this.httpService.httpGetNoAuth(url);
  }

  //请求猿问详情 c_sortno,user_id,qtitle,qdetail
  insertQuestion(body) {
    var url = this.API_URL + "/question/insertQuestion";
    return this.httpService.httpPostWithAuth(body,url);
  }
  //添加问题回答
  insertResponse(body) {
    var url = this.API_URL + "/question/insertResponse";
    return this.httpService.httpPostWithAuth(body,url);
  }
  //请求某一个课程的评论
  getallcomment(cno) {
    var url = this.API_URL + "/question/getcomment?cno="+cno;
    return this.httpService.httpGetNoAuth(url);
  }

  //请求某一个课程的评论(带id)
  getcomment(cno,user_id) {
    var url = this.API_URL + "/question/getcomment?cno="+cno+"&user_id="+user_id;
    return this.httpService.httpGetNoAuth(url);
  }
  //请求某一个课程的问答
  getCourseQuestion(c_sortname) {
    var url = this.API_URL + "/question/getCourseQuestion?c_sortname="+c_sortname;
    return this.httpService.httpGetNoAuth(url);
  }
  //请求某一评论的点赞信息
  getLike(body) {
    var url = this.API_URL + "/question/getLike?ccno="+body.ccno+"&user_id="+body.user_id;
    return this.httpService.httpGetNoAuth(url);
  }
  //请求删除某一评论的点赞信息
  deleteLike(body) {
    var url = this.API_URL + "/question/deleteLike?ccno="+body.ccno+"&user_id="+body.user_id+"&cno="+body.cno;
    return this.httpService.httpGetNoAuth(url);
  }
  //请求添加某一评论的点赞信息
  insertLike(body) {
    var url = this.API_URL + "/question/insertLike?ccno="+body.ccno+"&user_id="+body.user_id+"&cno="+body.cno;
    return this.httpService.httpGetNoAuth(url);
  }
  //请求添加某一评论的点赞信息
  insertComment(body) {
    var url = this.API_URL + "/question/insertComment?ccdetail="+body.ccdetail+"&cno="+body.cno+"&user_id="+body.user_id;
    return this.httpService.httpGetNoAuth(url);
  }
}
