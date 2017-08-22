import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController,ModalController } from 'ionic-angular';
import { QuestionDetailAnswerPage } from '../question-detail-answer/question-detail-answer';
import {questionService} from '../../providers/questionService';
import { TabsPage } from '../tabs/tabs';

/**
 * Generated class for the QuestionDetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-question-detail',
  templateUrl: 'question-detail.html',
  providers: [questionService]
})
export class QuestionDetailPage {
  qno:any;
  quest:any;
  detail:any;
  answerStatus:any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public modalCtrl:ModalController,
    public questionService:questionService
  ) {
    this.qno=navParams.data.qno;
    //请求猿问详情
    let qno=this.qno
    this.questionService.getYuanwenDetail(qno).then(data => {
      // console.log(data);
      if(data[0].rdetail!=null){
        this.answerStatus="true";
        this.quest=new Array().slice.call(data,0,1);
        // console.log(this.quest);
        this.detail=data;
        for(var i = 0;i<this.detail.length;i++){
          let date=new Date(this.detail[i].rtime)
          this.detail[i].rtime=date.toLocaleString();
          // console.log($scope.comments[i].cctime)
        }
      }else{
        this.quest=new Array().slice.call(data,0,1);
        this.answerStatus="flase";
      }

   })
  }
  dismiss(){
    this.viewCtrl.dismiss();
  }
  questionAnswer(){
    let model=this.modalCtrl.create(QuestionDetailAnswerPage,{
      qno:this.qno
    });
    model.present();
    // this.viewCtrl.dismiss();
  }

  doRefresh(refresher) {
    // console.log('Begin async operation', refresher);

    setTimeout(() => {
      this.qno=this.navParams.data.qno;
      //请求猿问详情
      let qno=this.qno
      this.questionService.getYuanwenDetail(qno).then(data => {
        // console.log(data);
        if(data[0].rdetail!=null){
          this.answerStatus="true";
          this.quest=new Array().slice.call(data,0,1);
          // console.log(this.quest);
          this.detail=data;
          for(var i = 0;i<this.detail.length;i++){
            let date=new Date(this.detail[i].rtime)
            this.detail[i].rtime=date.toLocaleString();
            // console.log($scope.comments[i].cctime)
          }
        }else{
          this.quest=new Array().slice.call(data,0,1);
          this.answerStatus="flase";
        }

      })



      refresher.complete();
    }, 1000);
  }

}
