import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController,AlertController,ModalController } from 'ionic-angular';
import {personService} from '../../providers/personService';
import {Storage} from '@ionic/storage';
import { App } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { InfoPage } from '../courseInfo/info';
/**
 * Generated class for the PersonMycoursePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-person-mycourse',
  templateUrl: 'person-mycourse.html',

  providers: [personService]
})
export class PersonMycoursePage {
  myCourse;
  constructor(
    private app:App,
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
        let user = res.id;

        //我的课程
        this.personService.my_course(user).then(data => {
          this.myCourse = data;
          // console.log(this.myCourse)
        }, (error) => {
          console.log("哎")
        })
      }
    });

  }
  goToOtherPage(cno,c_sortname) {
    this.app.getRootNav().push(InfoPage,{
      cno:cno,
      c_sortname:c_sortname
    });
    this.viewCtrl.dismiss();
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
