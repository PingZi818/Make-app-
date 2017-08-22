/**
 * Created by Administrator on 2017/6/1.
 */
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import {Http, Response} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { HttpService } from "./HttpServices";
import {Headers, RequestOptions} from '@angular/http';
@Injectable()
export class actualcombService {
  // API_URL = "http://localhost:3001";
  API_URL = HttpService.api();
  constructor(
    private httpService: HttpService,
    public http: Http
  ) { }

//请求全部实战
  getAllActualcomb_info() {
    var url = this.API_URL + "/actualcomb/";
    return this.httpService.httpGetNoAuth(url);
    // return this.httpService.httpGetWithAuth(url);
  }

  //请求实战详情
  getA_details(ano) {
    var url = this.API_URL + "/actualcomb/a_details?ano="+ano;
    return this.httpService.httpGetNoAuth(url);
  }
  getA_chapter(ano) {
    var url = this.API_URL + "/actualcomb/a_chapter?ano="+ano;
    return this.httpService.httpGetNoAuth(url);
  }
  getA_comments(ano) {
    var url = this.API_URL + "/actualcomb/a_comments?ano="+ano;
    return this.httpService.httpGetNoAuth(url);
  }
  getOrder(body){
    var ano=body.ano;
    var user_id=body.user_id;
    var url = this.API_URL + "/person/getOrder?ano="+ano+"&&user_id="+user_id+"";
    return this.httpService.httpGetNoAuth(url);
  }
  insertOrder(body){
    var ano=body.ano;
    var user_id=body.user_id;
    var url = this.API_URL + "/person/insertOrder?ano="+ano+"&&user_id="+user_id+"";
    return this.httpService.httpGetNoAuth(url);
  }

}
