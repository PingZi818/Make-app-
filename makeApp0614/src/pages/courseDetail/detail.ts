import { Component } from '@angular/core';
import { NavController,NavParams} from 'ionic-angular';
import { App } from 'ionic-angular';
import { InfoPage } from '../courseInfo/info';
import {CourseService} from '../../providers/courseService';
@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html',
  providers: [CourseService]
})
export class DetailPage{
  c_sortno:any;
  c_sortname:any;
  CoursesDetail:any;
  newcourse_Details:any;
  newcourse_Detail:any;
  segmentsArray = ['segmentOne','segmentTwo','segmentThree'];
  segmentModel: string = this.segmentsArray[0];

  constructor(
    public nav: NavController,
    public navParams: NavParams,
    private app:App,
    public CourseService:CourseService
  ) {
    this.c_sortno=navParams.data.c_sortno;
    this.c_sortname=navParams.data.c_sortname;
    // console.log( "c_sortno:"+this.c_sortno);
    // console.log("c_sortname:"+ this.c_sortname);
    //获取课程页面的所有课程
    this.CourseService.getCoursesDetail(this.c_sortno).then(data => {
      this.CoursesDetail=data;
      this.newcourse_Detail=[];
      this.newcourse_Details=[];
        for(var i=0;i<this.CoursesDetail.length;i++){
          if(this.CoursesDetail[i].c_typeno==1){
            this.newcourse_Detail.push(this.CoursesDetail[i])
          }
          else{
            this.newcourse_Details.push(this.CoursesDetail[i])
          }
        }
    },(error)=>{
      console.log("哎")
    })
  }
  goToOtherPage(cno,c_sortname) {
    this.nav.push(InfoPage,{
      cno:cno,
      c_sortname:c_sortname
    });
  }
  doRefresh(refresher) {
    // console.log('Begin async operation', refresher);

    setTimeout(() => {
      // console.log('Async operation has ended');
      refresher.complete();
    }, 2000)}
  swipeEvent(event) {
    //向左滑
    if (event.direction == 2) {
      if (this.segmentsArray.indexOf(this.segmentModel) < 2) {
        this.segmentModel = this.segmentsArray[this.segmentsArray.indexOf(this.segmentModel) + 1];
      }
    }
//向右滑
    if (event.direction == 4) {
      if (this.segmentsArray.indexOf(this.segmentModel) > 0) {
        this.segmentModel = this.segmentsArray[this.segmentsArray.indexOf(this.segmentModel) - 1];
      }
    }
  }
}
