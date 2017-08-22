/**
 * Created by hp on 2017/6/1.
 */
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { HttpService } from "./HttpServices";

@Injectable()
export class CourseService {
  API_URL = HttpService.api();

  // API_URL = "http://localhost:3001";
  // API_URL = "http://10.40.8.4:3001";
  constructor(
    private httpService: HttpService
  ) { }

  //获取课程页面的所有课程
  getCourseAll() {
    var url = this.API_URL + "/course/index";
    // console.log(this.API_URL)
    return this.httpService.httpGetNoAuth(url);
  }

  //请求某一个课程详情
  getCourseDetail(cno) {
    var url = this.API_URL + "/course/getCourseDetail?cno="+cno;
    return this.httpService.httpGetNoAuth(url);
  }
  //请求某一类课程详情
  getCoursesDetail(c_sortno) {
    var url = this.API_URL + "/course/getCoursesDetail?c_sortno="+c_sortno;
    return this.httpService.httpGetNoAuth(url);
  }
  //获取课程章节
  getChapter(cno) {
    var url = this.API_URL + "/course/getChapter?cno="+cno;
    return this.httpService.httpGetNoAuth(url);
  }

//获取课程章节的小节
  getSection(cno) {
    var url = this.API_URL + "/course/getSection?cno="+cno;
    return this.httpService.httpGetNoAuth(url);
  }
  //获取某课程某章节某小节的课程
  getSectionApp(body) {
    // console.log(body)
    var url = this.API_URL + "/course/getSectionApp?cno="+body.cno+"&chapterno="+body.chapterno+"&sectionno="+body.sectionno;
    return this.httpService.httpGetNoAuth(url);
  }
//请求课程方向
  getC_direction() {
    var url = this.API_URL + "/course/c_direction";
    return this.httpService.httpGetNoAuth(url);
  }

//请求课程分类
  getC_sort() {
    var url = this.API_URL + "/course/c_sort";
    return this.httpService.httpGetNoAuth(url);
  }
//开始学习添加到course_study表
  insertCourseStudy(body) {
    var url = this.API_URL + "/course/insertCourseStudy?user_id="+body.user_id+"&cno="+body.cno;
    return this.httpService.httpGetNoAuth(url);
  }
}
