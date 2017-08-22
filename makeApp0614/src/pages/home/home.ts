import { Component,ViewChild } from '@angular/core';
import { NavController,App,ModalController,NavParams } from 'ionic-angular';
import {IndexService} from '../../providers/indexService';
import {SearchPage} from '../search/search';
import { AcdetailPage } from '../acdetail/acdetail';
//测试用
// import {CeshiPage} from '../ceshi/ceshi';
import { InfoPage } from '../courseInfo/info';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [IndexService]
})
export class HomePage {
  @ViewChild('ionSlides') slides;
  newDataCourse:any;
  newDataActualcomb:any;
  newDataTeacher:any
  newInActualcomb:any;
  newInCourse:any;
  constructor(
    public navCtrl: NavController,
    public modalCtrl:ModalController,
    private app:App,
    public IndexService:IndexService
  ) {
    //请求课程推荐
      this.IndexService.getIndexCourseCover().then(data => {
         this.newDataCourse=new Array().slice.call(data,1,5)
         this.newDataTeacher=new Array().slice.call(data,1,4)
      },(error)=>{
        console.log("哎")
      })
    //请求精品实战
    this.IndexService.getIndexActualcomb().then(data => {
      this.newDataActualcomb=new Array().slice.call(data,1,4)
    },(error)=>{
      console.log("哎")
    })
    //请求最新实战
    this.IndexService.getIndexMan().then(data => {
      this.newInActualcomb=new Array().slice.call(data,1,4)
    },(error)=>{
      console.log("哎")
    })
    //请求最新实战
    this.IndexService.getIndexNewCourse().then(data => {
      this.newInCourse=data;
    },(error)=>{
      console.log("哎")
    })

  }
  autoPlay(){
    this.slides.startAutoplay();
  //页面进入时启动自动播放
    }
  goToOtherPage(cno,c_sortname) {
    this.navCtrl.push(InfoPage,{
      cno:cno,
      c_sortname:c_sortname
    });
  }
  // video(){
  //   let model=this.modalCtrl.create(CeshiPage);
  //   model.present();
  // }

  search(){
    let model=this.modalCtrl.create(SearchPage);
    model.present();
  }
  itemTapped(event,ano) {
    //以页面跳转的方式打开页面
    this.navCtrl.push(AcdetailPage,{
      ano:ano
    });
  }
}
