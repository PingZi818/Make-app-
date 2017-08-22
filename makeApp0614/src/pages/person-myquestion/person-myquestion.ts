import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController,AlertController,ModalController } from 'ionic-angular';
import {personService} from '../../providers/personService';
import { QuestionDetailPage } from '../question-detail/question-detail';
import {Storage} from '@ionic/storage';
import { LoginPage } from '../login/login';
/**
 * Generated class for the PersonMyquestionPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-person-myquestion',
  templateUrl: 'person-myquestion.html',
  providers: [personService]
})
export class PersonMyquestionPage {
  my_res;
  user_name;
  my_yuanwen;
  segmentsArray = ['segmentOne','segmentTwo'];
  segmentModel: string = this.segmentsArray[0];
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public personService: personService,
    public storage: Storage,
    public alertCtrl: AlertController,
    public modalCtrl: ModalController,
  ) {
    this.storage.get('userInfo').then((result) => {
      // console.log(result);
      if (result == null) {
        // let alert = this.alertCtrl.create({
        //   // title: '请先登录!',
        //   subTitle: '请您先登陆',
        //   buttons: ['确定']
        //
        // });
        // this.viewCtrl.dismiss();
        // alert.present();
        let model=this.modalCtrl.create(LoginPage);
        model.present();
        this.viewCtrl.dismiss();
      } else {
        let res = JSON.parse(result)
        // console.log(res);
        this.user_name=res.user_name;
        let user = res.id;

        //我的回答
          this.personService.my_res(user).then(data => {
            this.my_res = data;
           // console.log(this.my_res)
            // if(this.my_res.length!=)
            for(var i = 0;i<this.my_res.length;i++){
              let rde=this.my_res[i].rdetail;
              if(rde.length>=45){
                this.my_res[i].rdetail=rde.substring(0,45)+"..."
              }else{
                this.my_res[i].rdetail=rde;
              }
            }

          // console.log(this.myCourse)
        }, (error) => {
          console.log("哎")
        })
        //我的提问
        this.personService.my_yuanwen(user).then(data => {
          this.my_yuanwen = data;
          // console.log(this.myCourse)
        }, (error) => {
          console.log("哎")
        })

      }
    });


  }

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
  dismiss() {
    this.viewCtrl.dismiss();
  }
  questionDetail(qno){
    let model=this.modalCtrl.create(QuestionDetailPage,{
      qno:qno
    });
    model.present();
  }
}
