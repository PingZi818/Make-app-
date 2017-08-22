import { Component } from '@angular/core';
import { NavController,AlertController,NavParams } from 'ionic-angular';
import { App } from 'ionic-angular';
import { VideoPage } from '../video/video';
import {CourseService} from '../../providers/courseService';
import {Storage} from '@ionic/storage';
import { LoginPage } from '../login/login';
@Component({
  selector: 'page-info',
  templateUrl: 'info.html',
  providers: [CourseService]
})
export class InfoPage{
  cno:any;
  c_sortname:any;
  sectionvideolinks:any;
  CourseDetail:any;
  Chapter:any;
  Section:any;
  SectionVideo:any;
  SectionVideos:any;
  startStudys:any;
  constructor(
    public nav: NavController,
    public navParams: NavParams,
    private app:App,
    public storage: Storage,
    public alertCtrl: AlertController,
    public CourseService:CourseService
  ) {
    this.cno=navParams.data.cno;
    this.c_sortname=navParams.data.c_sortname;
    // console.log( "c_sortname:"+this.c_sortname);
    // console.log("cno::"+ this.cno)
    //请求某一个课程详情
    this.CourseService.getCourseDetail(this.cno).then(data => {
      this.CourseDetail=data;
    },(error)=>{
      console.log("喔嚯")
    }) ;
    //获取课程章节
    this.CourseService.getChapter(this.cno).then(data => {
      this.Chapter=data;
    },(error)=>{
      console.log("喔嚯")
    });
    //获取课程章节的小节
    this.CourseService.getSection(this.cno).then(data => {
      this.Section=data;
    },(error)=>{
      console.log("喔嚯")
    });
  }
  startStudy(){
    this.storage.get('userInfo').then((result) => {
      if (result == null) {
        // let alert = this.alertCtrl.create({
        //   title: '请先登录!',
        //   buttons: ['确定']
        // });
        // alert.present();
        console.log("该用户未登录")
        //this.app.getRootNav().push(LoginPage,{
        //});
      }
      else {
        let res = JSON.parse(result)
        var startStudy = {
          user_id: res.id,
          cno:this.cno}
        console.log(startStudy);

        this.CourseService.insertCourseStudy(startStudy).then(data => {
          this.startStudys=data;
          //console.log(this.startStudys)
        },(error)=>{
          console.log("添加课程失败")
        });


      }
    });
  }
  playSectionVideo($event,cno,c_sortname,sectionvideolinks,chapterno,sectionno){
    var SectionVideos = {
      cno:this.cno,
      chapterno:chapterno,
      sectionno:sectionno
    }
    // console.log(SectionVideos);
    //获取课程章节的小节
    this.CourseService.getSectionApp(SectionVideos).then(data => {
      this.SectionVideo=data;
      console.log(data);
      // console.log("this.SectionVideo----------"+this.SectionVideo);
      this.sectionvideolinks=this.SectionVideo[0].sectionvideolink;
      // console.log("sectionvideolinks----haha------------" +
      //   "---------------------------------------:"+ this.sectionvideolinks);
      this.nav.push(VideoPage,{
        cno:cno,
        c_sortname:c_sortname,
        sectionvideolinks:this.sectionvideolinks
      });
    },(error)=>{
      console.log("喔嚯")
    });

  }

  videoPage(cno,c_sortname,sectionvideolinks) {
    var SectionVideoss = {
      cno:this.cno,
      chapterno:1,
      sectionno:1
    }
    this.CourseService.getSectionApp(SectionVideoss).then(data => {
      this.SectionVideos=data;
      this.sectionvideolinks=this.SectionVideos[0].sectionvideolink;
      console.log(" this.sectionvideolinks:"+ this.sectionvideolinks);
      this.nav.push(VideoPage,{
        cno:cno,
        c_sortname:c_sortname,
        sectionvideolinks:this.sectionvideolinks
      });
    },(error)=>{
      console.log("喔嚯")
    });

  }
}
