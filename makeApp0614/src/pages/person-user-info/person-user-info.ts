import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController,AlertController,ModalController  } from 'ionic-angular';
import {Storage} from '@ionic/storage';
import {UserService} from '../../providers/userService';
import { LoginPage } from '../login/login';
/**
 * Generated class for the PersonUserInfoPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-person-user-info',
  templateUrl: 'person-user-info.html',
  providers: [UserService]
})
export class PersonUserInfoPage {
  // user:any;
  user:any=[];
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public storage: Storage,
    public alertCtrl: AlertController,
    public modalCtrl: ModalController,
    public userService:UserService
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

        this.userService.loginGetAll(res.user_tel).then(data => {
          let user=data[0]
          this.user = data[0];

          console.log(this.user)
        },(error)=>{
          console.log("哎")
        })




      }
    });

  }
  dismiss() {
    this.viewCtrl.dismiss();
  }
  itemSelected(item) {
    console.log("Selected Item", item);
  }

}
