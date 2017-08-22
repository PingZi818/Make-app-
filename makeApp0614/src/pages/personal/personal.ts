import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ModalController,AlertController  } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { PersonOrderPage } from '../person-order/person-order';
import { PersonUserInfoPage } from '../person-user-info/person-user-info';
import { HistoryPage } from '../history/history';
import { PersonMyquestionPage } from '../person-myquestion/person-myquestion';
import { PersonMycoursePage } from '../person-mycourse/person-mycourse';
import { PersonMyactualPage } from '../person-myactual/person-myactual';
import {SearchPage} from '../search/search';
import {Storage} from '@ionic/storage';
import {style} from "@angular/core/src/animation/dsl";

/**
 * Generated class for the PersonalPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-personal',
  templateUrl: 'personal.html',
})
export class PersonalPage {
  // loginStatus: string = this.segmentsArray[0];
  loginStatus: any;
  user:any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl:ModalController,
    public storage: Storage,
    public alertCtrl: AlertController
  ) {
    this.storage.get('userInfo').then((result) => {

    if (result == null) {
      this.loginStatus="flase";
      // let model=this.modalCtrl.create(LoginPage);
      // model.present();
    } else {
      this.user = JSON.parse(result);
      this.loginStatus="true";

    }
  });

}

  Login(){

    let model=this.modalCtrl.create(LoginPage);
    model.present();

  }


  myOrder(){
    let model=this.modalCtrl.create(PersonOrderPage);
    model.present();
  }

  userInfo(){
    let model=this.modalCtrl.create(PersonUserInfoPage);
    model.present();
  }
  history(){
    let model=this.modalCtrl.create(HistoryPage);
    model.present();
  }
  mycourse(){
    let model=this.modalCtrl.create(PersonMycoursePage);
    model.present();
  }
  myactual(){
    let model=this.modalCtrl.create(PersonMyactualPage);
    model.present();
  }

  myquestion(){
    let model=this.modalCtrl.create(PersonMyquestionPage);
    model.present();
  }

  logout(){
    let confirm = this.alertCtrl.create({
      // title: 'Use this lightsaber?',
      message: '确定要登出账号吗?',
      buttons: [
        {
          text: '否',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: '是',
          handler: () => {
            this.storage.remove('userInfo');
            this.loginStatus="flase";
          }
        }
      ]
    });
    confirm.present();
  }
  search(){
    let model=this.modalCtrl.create(SearchPage);
    model.present();
  }

}
