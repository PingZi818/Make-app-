import { Component } from '@angular/core';
import {NavController, NavParams, ViewController, AlertController, ToastController,ModalController} from 'ionic-angular';
import {CourseService} from '../../providers/courseService';
import {questionService} from '../../providers/questionService';
import {VideoInsertComPage} from '../video-insert-com/video-insert-com';
import {SafeResourceUrl, DomSanitizer} from '@angular/platform-browser';
import {Storage} from '@ionic/storage';
//import { LoginPage } from '../login/login';
@Component({
  selector: 'page-video',
  templateUrl: 'video.html',
  providers: [CourseService,questionService]
})
export class VideoPage {
  cno:any;
  c_sortname:any;
  sectionvideolinks:SafeResourceUrl;
  CourseDetail:any;
  Chapter:any;
  Section:any;
  SectionVideo:any;
  comments:any;
  style:any;
  CourseQuestion:any;
  results:any;
  newComment:any;
  newComment1:any;
  segmentsArray = ['segmentOne','segmentTwo','segmentThree','segmentFour'];
  segmentModel: string = this.segmentsArray[0];
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public questionService: questionService,
    public CourseService: CourseService,
    public storage: Storage,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,
    public modalCtrl:ModalController,
    private domSanitizer: DomSanitizer
  )
  {
    this.sectionvideolinks = this.domSanitizer.bypassSecurityTrustResourceUrl(navParams.data.sectionvideolinks);
    this.cno=navParams.data.cno;
    this.c_sortname=navParams.data.c_sortname;
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

    this.storage.get('userInfo').then((result) => {
      if (result == null) {
        this.questionService.getallcomment(this.cno).then(data => {
          this.comments=data;
        },(error)=>{
          console.log("请求某一个课程的评论失败")
        });

      } else {
        let res = JSON.parse(result)
        var Likedata = {
          cno:this.cno,
          user_id: res.id
        }
        console.log(Likedata);
        //请求某用户某一个课程的评论
        //获取dianzanxinxi
        this.questionService.getcomment(this.cno,res.id).then(data => {
          this.comments=data;
        },(error)=>{
          console.log("请求某一个课程的评论失败")
        });
      }
    });

    //请求某一类课程的问答
    this.questionService.getCourseQuestion(this.c_sortname).then(data => {
      this.CourseQuestion=data;
    },(error)=>{
      console.log("喔嚯")
    })
  }
  like($event,ccno){
    this.storage.get('userInfo').then((result) => {
      if (result == null) {
        let alert = this.alertCtrl.create({
          title: '请先登录!',
          buttons: ['确定']
        });
        alert.present();
      } else {
        let res = JSON.parse(result)
        var Likedata = {
          ccno:ccno,
          user_id: res.id
        }
        var Likedatas = {
          ccno:ccno,
          user_id: res.id,
          cno:this.cno
        }
        console.log(Likedata);
        console.log(Likedatas);
      //请求某用户某一个课程的评论
            //获取dianzanxinxi
            this.questionService.getLike(Likedata).then(data => {
              this.results=data;
              //是否点过赞？
              if(this.results.result==1){
                //如果存在
                //执行取消点赞
                this.questionService.deleteLike(Likedatas).then(data => {
                  this.newComment=data;
                  // 请求成功执行代码
                  this.comments=this.newComment;
                },(error)=>{
                  console.log("执行取消点赞失败")
                });
              }else{
                //否则添加点赞
                this.questionService.insertLike(Likedatas).then(data => {
                  this.newComment1=data;
                  this.comments=this.newComment1;
                },(error)=>{
                  console.log("添加点赞失败")
                });
              }

            },(error)=>{
              console.log("请求某一个课程的评论失败")
            });
      }
    });

  }

  dismiss(){
    this.viewCtrl.dismiss();
  }

  swipeEvent(event){
    //向左滑
    if(event.direction==2){
      if(this.segmentsArray.indexOf(this.segmentModel)<3){
        this.segmentModel = this.segmentsArray[this.segmentsArray.indexOf(this.segmentModel)+1];
      }
    }
//向右滑
    if(event.direction==4){
      if(this.segmentsArray.indexOf(this.segmentModel)>0){
        this.segmentModel = this.segmentsArray[this.segmentsArray.indexOf(this.segmentModel)-1];
      }
    }
  }

  playSectionVideo($event,chapterno,sectionno){
    var SectionVideos = {
      cno:this.cno,
      chapterno:chapterno,
      sectionno:sectionno
    }
    // console.log(SectionVideos);
    //获取课程章节的小节
    this.CourseService.getSectionApp(SectionVideos).then(data => {
      this.SectionVideo=data;
      this.sectionvideolinks=this.domSanitizer.bypassSecurityTrustResourceUrl(this.SectionVideo[0].sectionvideolink);
      console.log(" this.sectionvideolinks:"+this.SectionVideo[0].sectionvideolink);
    },(error)=>{
      console.log("喔嚯")
    });
  }
  doRefresh(refresher) {
    // console.log('Begin async operation', refresher);

    setTimeout(() => {

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

      this.storage.get('userInfo').then((result) => {
        if (result == null) {
          this.questionService.getallcomment(this.cno).then(data => {
            this.comments=data;
          },(error)=>{
            console.log("请求某一个课程的评论失败")
          });
        } else {
          let res = JSON.parse(result)
          var Likedata = {
            cno:this.cno,
            user_id: res.id
          }
          console.log(Likedata);
          //请求某用户某一个课程的评论
          //获取dianzanxinxi
          this.questionService.getcomment(this.cno,res.id).then(data => {
            this.comments=data;
          },(error)=>{
            console.log("请求某一个课程的评论失败")
          });
        }
      });

      //请求某一类课程的问答
      this.questionService.getCourseQuestion(this.c_sortname).then(data => {
        this.CourseQuestion=data;
      },(error)=>{
        console.log("喔嚯")
      })
      // for (var i = 0; i < 50; i++) {
      //   this.tuijianQuestion.push( this.newtuijianQuestion );
      // }
      console.log('Async operation has ended');
      refresher.complete();
    }, 1000);
  }
  insertCom(){
    let model=this.modalCtrl.create(VideoInsertComPage,{
      cno:this.cno
    });
    model.present();
  }
}
