import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController, AlertController, ToastController,ModalController } from 'ionic-angular';
import {Storage} from '@ionic/storage';
import {questionService} from '../../providers/questionService';
import { QuestionDetailPage } from '../question-detail/question-detail';
import { LoginPage } from '../login/login';
/**
 * Generated class for the QuestionDetailAnswerPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-question-detail-answer',
  templateUrl: 'question-detail-answer.html',
  providers: [questionService]
})
export class QuestionDetailAnswerPage {
  rdetail:any;
  qno:any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public questionService: questionService,
    public storage: Storage,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,
    public modalCtrl:ModalController
  ) {

  }

  dismiss(){
    this.viewCtrl.dismiss();
  }

  com(rdetail) {
    this.storage.get('userInfo').then((result) => {
      if (result == null) {
        let model=this.modalCtrl.create(LoginPage);
        model.present();
        this.viewCtrl.dismiss();
      } else {
        let res = JSON.parse(result)
        // console.log(res);
        this.qno=this.navParams.data.qno;
        //请求猿问详情

        var resp = {
          qno:this.qno,
          rdetail: rdetail==undefined ? "" : rdetail ,
          user_id: res.id
        }
        // console.log(resp);

        if (rdetail == undefined) {
          let toast2 = this.toastCtrl.create({
            message: '请输入问题回答',
            duration: 3000,
            position: 'bottom'
          });
          toast2.present();
        } else {
          // console.log(resp)
          this.questionService.insertResponse(resp).then(data => {
            // console.log(data[0])
            if(data.length>=0){
              // let model=this.modalCtrl.create(QuestionDetailPage,{
              //   qno:this.qno
              // });
              // model.present();
              this.viewCtrl.dismiss();
            }

          },(error)=>{

            let toast = this.toastCtrl.create({
              message: '网络错误！',
              duration: 3000
            });
            toast.present();
          })
        }

      }
    });



  }


}
