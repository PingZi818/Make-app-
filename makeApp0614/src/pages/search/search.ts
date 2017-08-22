import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController,AlertController,ModalController,App } from 'ionic-angular';
import {questionService} from '../../providers/questionService';
import {CourseService} from '../../providers/courseService';
import {actualcombService} from '../../providers/actualcombService';
import {Storage} from '@ionic/storage';
import { AcdetailPage } from '../acdetail/acdetail';
import { InfoPage } from '../courseInfo/info';
import { QuestionDetailPage } from '../question-detail/question-detail';
/**
 * Generated class for the SearchPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
  providers: [questionService,CourseService,actualcombService]
})
export class SearchPage {
  questionStatus;
  courseStatus;
  actualStatus;
  arr_course:String[]=[];
  arr_question:String[]=[];
  arr_actual:String[]=[];
  cname1:any=[];
  cname_actual:any=[];
  cname_question:any=[];
  cname_out;
  aname_out;
  qtitle_out;
  question;
  fourQuestion;
  actualcomb;
  fourActualcomb;
  course;
  fourCourse;
  items;
  cno;
  ano;
  c_sortname;
  qno;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public questionService: questionService,
    public CourseService: CourseService,
    public actualcombService: actualcombService,
    public storage: Storage,
    public alertCtrl: AlertController,
    public modalCtrl:ModalController,
    private app:App

  ) {
    //请求课程
    this.CourseService.getCourseAll().then(data => {
      this.course = data;

      this.fourCourse = new Array().slice.call(this.course,0,4)
      console.log(this.fourCourse)
    },(error)=>{
      console.log("哎")
    })
    //请求实战
    this.actualcombService.getAllActualcomb_info().then(data => {
      this.actualcomb = data;
      this.fourActualcomb = new Array().slice.call(this.actualcomb,0,4)
      console.log(this.fourActualcomb)
    },(error)=>{
      console.log("哎")
    })
      //请求猿问
    this.questionService.getAllquestion().then(data => {
      this.question=data;
      this.fourQuestion = new Array().slice.call(this.question,0,4)
      console.log(this.fourQuestion);
    },(error)=>{
      console.log("哎")
    })

  }

  itemTapped(event,ano) {
    this.viewCtrl.dismiss();
    this.navCtrl.push(AcdetailPage,{
      ano:ano
    });

  }
  goToOtherPage(cno,c_sortname) {
    this.viewCtrl.dismiss();
    this.navCtrl.push(InfoPage,{
      cno:cno,
      c_sortname:c_sortname
    });
  }
  questionDetail(qno){
    // let model=this.modalCtrl.create(QuestionDetailPage,{
    //   qno:qno
    // });
    // model.present();
    this.viewCtrl.dismiss();
    // this.app.getRootNav().push(QuestionDetailPage,{
    this.navCtrl.push(QuestionDetailPage,{
      qno:qno
    });
  }

  getItems(ev) {

    var val = ev.target.value; //输入框中内容
    // console.log(val)
    if (val && val.trim() != '') {
      this.arr_course=[];
      this.arr_actual=[];
      this.arr_question=[];
      for(let i =0 ;i<this.course.length;i++) {
        this.arr_course.push(this.course[i].cname)
      }
      for(let i =0 ;i<this.actualcomb.length;i++) {
        this.arr_actual.push(this.actualcomb[i].aname)
      }
      for(let i =0 ;i<this.question.length;i++) {
        this.arr_question.push(this.question[i].qtitle)
      }
      this.cname1=this.arr_course
      this.cname_actual=this.arr_actual;
      this.cname_question=this.arr_question;

      this.cname_out = this.cname1.filter((i) => {
        return (i.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
      this.aname_out = this.cname_actual.filter((i) => {
        return (i.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
      this.qtitle_out = this.cname_question.filter((i) => {
        return (i.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
      // console.log(this.cname_out)
      this.fourCourse=[];
      this.fourActualcomb=[];
      this.fourQuestion=[];
      for (let j=0;j<this.cname_out.length;j++){
        for(let i=0;i<this.course.length; i++){
          if(this.cname_out[j]==this.course[i].cname){
              this.fourCourse.push(this.course[i]);
          }
        }
      }
      if(this.fourCourse.length==0){
        this.courseStatus="flase";
      }else if(this.fourCourse.length>0){
        this.courseStatus="true";
      }
      for (let j=0;j<this.aname_out.length;j++){
        for(let i=0;i<this.actualcomb.length; i++){
          if(this.aname_out[j]==this.actualcomb[i].aname){
            this.fourActualcomb.push(this.actualcomb[i]);

          }
        }
      }
      if(this.fourActualcomb.length==0){
        this.actualStatus="flase";
      }else if(this.fourActualcomb.length>0){
        this.actualStatus="true";
      }
      for (let j=0;j<this.qtitle_out.length;j++){
        for(let i=0;i<this.question.length; i++){
          if(this.qtitle_out[j]==this.question[i].qtitle){
            this.fourQuestion.push(this.question[i]);
          }
        }
      }

      if(this.fourQuestion.length==0){
        this.questionStatus="flase";
      }else if(this.fourCourse.length>0){
        this.questionStatus="true";
      }
    }else{
      this.fourCourse = new Array().slice.call(this.course,0,4);
      this.fourActualcomb = new Array().slice.call(this.actualcomb,0,4);
      this.fourQuestion = new Array().slice.call(this.question,0,4);
      this.actualStatus="true";
      this.questionStatus="true";
      this.courseStatus="true";
    }

  }

  dismiss(){
    this.viewCtrl.dismiss();
  }
}
