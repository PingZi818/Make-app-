import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ModalController } from 'ionic-angular';
import { QuestionDetailPage } from '../question-detail/question-detail';
import { QuestionTiwenPage } from '../question-tiwen/question-tiwen';
import {questionService} from '../../providers/questionService';
import {SearchPage} from '../search/search';
/**
 * Generated class for the QuestionIndexPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-question-index',
  templateUrl: 'question-index.html',
  providers: [questionService]
})
export class QuestionIndexPage {
  items = [];
  segmentsArray = ['segmentOne','segmentTwo','segmentThree'];
  segmentModel: string = this.segmentsArray[0];
  tuijianQuestion;
  newtuijianQuestion;
  allQuestion;
  waitQuestion:any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl:ModalController,
    public questionService:questionService
  ) {

      //请求猿问推荐
      this.questionService.getIndexquestionData().then(data => {
        this.tuijianQuestion=data;
        for(var i = 0;i<this.tuijianQuestion.length;i++){
          let rde=this.tuijianQuestion[i].rdetail;
          if(rde.length>=45){
            this.tuijianQuestion[i].rdetail=rde.substring(0,45)+"..."
          }else{
            this.tuijianQuestion[i].rdetail=rde;
          }
        }
      },(error)=>{
        console.log("哎")
      })
      //请求等待回答
      this.questionService.getwaitquetion().then(data => {
        this.waitQuestion=data;
      },(error)=>{
        console.log("哎")
      })
      //请求全部回答
    this.questionService.getAllquestion().then(data => {
      this.allQuestion=data;
      // for(var i = 0;i<this.allQuestion.length;i++){
      //   let rde=this.allQuestion[i].rdetail;
      //   if(rde.length>=45){
      //     this.allQuestion[i].rdetail=rde.substring(0,45)+"..."
      //   }else{
      //     this.tuijianQuestion[i].rdetail=rde;
      //   }
      // }

    },(error)=>{
      console.log("哎")
    })

  }
  swipeEvent(event){
    // console.log(event)
    // console.log(this.segmentModel)
    //向左滑
    if(event.direction==2){
      if(this.segmentsArray.indexOf(this.segmentModel)<2){
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
  questionDetail(qno){
    let model=this.modalCtrl.create(QuestionDetailPage,{
      qno:qno
    });
    model.present();
  }
  questionTiwen(){
    let model=this.modalCtrl.create(QuestionTiwenPage);
    model.present();
  }
  search(){
  let model=this.modalCtrl.create(SearchPage);
  model.present();
}

  doRefresh(refresher) {
    // console.log('Begin async operation', refresher);

    setTimeout(() => {
      this.questionService.getIndexquestionData().then(data => {
        this.newtuijianQuestion=data;
        this.tuijianQuestion = this.newtuijianQuestion
        for(var i = 0;i<this.tuijianQuestion.length;i++){
          let rde=this.tuijianQuestion[i].rdetail;
          if(rde.length>=45){
            this.tuijianQuestion[i].rdetail=rde.substring(0,45)+"..."
          }else{
            this.tuijianQuestion[i].rdetail=rde;
          }
        }
        // console.log(this.newtuijianQuestion)
      },(error)=>{
        console.log("哎")
      })

      //请求等待回答
      this.questionService.getwaitquetion().then(data => {
        this.waitQuestion=data;
      },(error)=>{
        console.log("哎")
      })

      //请求全部回答
      this.questionService.getAllquestion().then(data => {
        this.allQuestion=data;
      },(error)=>{
        console.log("哎")
      })

      this.items = [];

      // for (var i = 0; i < 50; i++) {
      //   this.tuijianQuestion.push( this.newtuijianQuestion );
      // }
      console.log('Async operation has ended');
      refresher.complete();
    }, 1000);
  }
}
