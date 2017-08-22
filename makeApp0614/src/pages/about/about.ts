import { Component } from '@angular/core';
import { NavController,ModalController } from 'ionic-angular';
import { App } from 'ionic-angular';
import { DetailPage } from '../courseDetail/detail';
import {CourseService} from '../../providers/courseService';
import {SearchPage} from '../search/search';
@Component({
  selector: 'page-about',
  templateUrl: 'about.html',
  providers: [CourseService]
})
export class AboutPage {
  CourseAll:any;
  C_direction:any;
  C_sort:any;
  constructor(
    public nav: NavController,
    private app:App,
    public CourseService:CourseService,
    public modalCtrl:ModalController
  ) {
    //获取课程页面的所有课程
    this.CourseService.getCourseAll().then(data => {
      this.CourseAll=data;
    },(error)=>{
      console.log("哎")
    })
    //请求课程方向
    this.CourseService.getC_direction().then(data => {
      this.C_direction=data;
    },(error)=>{
      console.log("哎")
    })
    //请求课程方向
    this.CourseService.getC_sort().then(data => {
      this.C_sort=data;
    },(error)=>{
      console.log("哎")
    })
  }
  search(){
    let model=this.modalCtrl.create(SearchPage);
    model.present();
  }

  goToOtherPage(c_sortno,c_sortname) {
    this.nav.push(DetailPage,{
      c_sortno:c_sortno,
      c_sortname:c_sortname

    });
  }
}

