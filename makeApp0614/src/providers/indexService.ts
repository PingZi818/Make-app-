/**
 * Created by kition on 2017/5/22.
 */
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { HttpService } from "./HttpServices";

@Injectable()
export class IndexService {
  API_URL = HttpService.api();
  // API_URL = "http://localhost:3001";
  constructor(
    private httpService: HttpService
  ) { }
//请求课程推荐
  getIndexCourseCover() {
    var url = this.API_URL + "/course/getIndexCourseCover";
    return this.httpService.httpGetNoAuth(url);
    // return this.httpService.httpGetWithAuth(url);
  }

  //请求精品实战
  getIndexActualcomb() {
    var url = this.API_URL + "/actualcomb/getIndexActualcomb";
    return this.httpService.httpGetNoAuth(url);
    // return this.httpService.httpGetWithAuth(url);
  }
//请求最新实战课程
  getIndexMan() {
    var url = this.API_URL + "/actualcomb/getIndexMan";
    return this.httpService.httpGetNoAuth(url);
    // return this.httpService.httpGetWithAuth(url);
  }
//请求最新实战
  getIndexNewCourse() {
    var url = this.API_URL + "/course/getIndexNewCourse";
    return this.httpService.httpGetNoAuth(url);
    // return this.httpService.httpGetWithAuth(url);
  }

}
