/**
 * Created by kition on 2017/5/22.
 */
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { HttpService } from "./HttpServices";

@Injectable()
export class UserService {
  API_URL = HttpService.api();
  // API_URL = "http://localhost:3001";
  constructor(
    private httpService: HttpService
  ) { }

  login(user) {
    var url = this.API_URL + "/users/loginApp";
    return this.httpService.httpPostWithAuth(user,url);
    // return this.httpService.httpGetWithAuth(url);
  }
  loginGetAll(tel){
    var url = this.API_URL + "/users/getall?user_tel="+tel;
    return this.httpService.httpGetNoAuth(url);
  }

  regist(user){
    var url = this.API_URL + "/users/regist?user_tel="+user.user_tel+"&user_password="+user.user_password;
    return this.httpService.httpGetNoAuth(url);
  }
}
