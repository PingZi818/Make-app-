/**
 * Created by kition on 2017/5/22.
 */
//全局的server，项目一启动，http就启动
import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {Headers, RequestOptions} from '@angular/http';

import 'rxjs/add/operator/toPromise';


@Injectable()
export class HttpService {
  constructor(public http: Http) {
  }
  //请求的nodejs的接口地址（总的）
  public static api() {
    return "http://115.159.72.66:3001";
  }

  private toQueryString(obj) {
    let result = [];
    for (let key in obj) {
      key = encodeURIComponent(key);
      let values = obj[key];
      if (values && values.constructor == Array) {
        let queryValues = [];
        for (let i = 0, len = values.length, value; i < len; i++) {
          value = values[i];
          queryValues.push(this.toQueryPair(key, value));
        }
        result = result.concat(queryValues);
      } else {
        result.push(this.toQueryPair(key, values));
      }
    }
    return result.join('&');
  }

  private toQueryPair(key, value) {
    if (typeof value == 'undefined') {
      return key;
    }
    return key + '=' + encodeURIComponent(value === null ? '' : String(value));
  }

  // public httpGetWithAuth(url: string) {
  // public httpGetWithAuth(url: string, user: any) {
  //
  //   var headers = new Headers();
  //   headers.append('Content-Type', 'application/json');
  //   headers.append('Authorization', user.ID + '-' + user.UserToken);
  //   let options = new RequestOptions({headers: headers});
  //   // return 'i am from httpGetWithAuth';
  //   return this.http.get(url, options).toPromise()
  //     .then(res => res.json())
  //     .catch(err => {
  //       this.handleError(err);
  //     });
  // }
  public httpGetWithAuth(url: string, body: any) {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization',body.qno);
    let options = new RequestOptions({headers: headers});
    return this.http.get(url, options).toPromise()
      .then(res => res.json())
      .catch(err => {
        this.handleError(err);
      });
  }


  public httpGetNoAuth(url: string) {

    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({headers: headers});
    return this.http.get(url, options).toPromise()
      .then(res => res.json())
      .catch(err => {
        this.handleError(err);
      });
  }
  //
  // public httpPostNoAuth(url: string, body: any) {
  //   console.log('在httpservice里url: '+url);
  //   console.log('在httpservice里body:'+body);
  //   var headers = new Headers();
  //   headers.append('Content-Type', 'application/json');
  //   let options = new RequestOptions({headers: headers});
  //   return this.http.post(url, body, options).toPromise()
  //     .then(res => res.json())
  //     .catch(err => {
  //       this.handleError(err);
  //     });
  // }

  public httpPostWithAuth(body: any, url: string) {


    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    // headers.append("Access-Control-Allow-Origin", "*");
    // headers.append("Access-Control-Allow-Headers", "X-Requested-With");
    // headers.append("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    // headers.append("X-Powered-By",' 3.2.1')
    // headers.append("Content-Type", "application/x-www-form-urlencoded;charset=utf-8");
    // headers.append('Authorization', result.ID + '-' + result.UserToken);
    let options = new RequestOptions({headers: headers});


    return this.http.post(url, this.toQueryString(body),options).toPromise()
      .then(res => res.json())
      .catch(err => {
        this.handleError(err);
      });
  }


  private handleError(error: Response) {
    console.log(error);
    return Observable.throw(error.json().error || 'Server Error');
  }
}
