/**
 * Created by kition on 2017/5/22.
 */
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import {Http, Response} from '@angular/http';
// import { Observable } from 'rxjs/Observable';
import { HttpService } from "./HttpServices";
// import {Headers, RequestOptions} from '@angular/http';
@Injectable()
export class personService {
  API_URL = HttpService.api();
  // API_URL = "http://localhost:3001";
  constructor(
    private httpService: HttpService,
    public http: Http
  ) { }

//请求未付款课程
  my_noorder(id) {
    var url = this.API_URL + "/person/my_noorder?user_id="+id;
    return this.httpService.httpGetNoAuth(url);
    // return this.httpService.httpGetWithAuth(url);
  }

  //请求已经付款课程
  okorder(id) {
    var url = this.API_URL + "/person/my_ac/?user_id="+id;
    return this.httpService.httpGetNoAuth(url);
    // return this.httpService.httpGetWithAuth(url);
  }

  //订单页面请求实战详情
  get_zhifu(ono) {
    var url = this.API_URL + "/person/get_zhifu/?ono="+ono;
    return this.httpService.httpGetNoAuth(url);
    // return this.httpService.httpGetWithAuth(url);
  }

  //我的课程 my_course
  my_course(user_id) {
    var url = this.API_URL + "/person/my_course/?user_id="+user_id;
    return this.httpService.httpGetNoAuth(url);
    // return this.httpService.httpGetWithAuth(url);
  }

  //我的猿问 _我的提问my_yuanwen
  my_yuanwen(user_id) {
    var url = this.API_URL + "/person/my_yuanwen/?user_id="+user_id;
    return this.httpService.httpGetNoAuth(url);
    // return this.httpService.httpGetWithAuth(url);
  }
  //我的猿问 _我的回答 my_res
  my_res(user_id) {
    var url = this.API_URL + "/person/my_res/?user_id="+user_id;
    return this.httpService.httpGetNoAuth(url);
    // return this.httpService.httpGetWithAuth(url);
  }
  my_dongtai(user_id) {
    var url = this.API_URL + "/person/my_dongtai/?user_id="+user_id;
    return this.httpService.httpGetNoAuth(url);
    // return this.httpService.httpGetWithAuth(url);
  }


  //支付
  updateOrder(body){
    var url = this.API_URL + "/person/updateOrder/?ano="+body.ano+"&user_id="+body.user_id+"";
    return this.httpService.httpGetNoAuth(url);
  }

  //支付
  deleteOrder(ono){
    var url = this.API_URL + "/person/deleteOrder/?ono="+ono
    return this.httpService.httpGetNoAuth(url);
  }
}
