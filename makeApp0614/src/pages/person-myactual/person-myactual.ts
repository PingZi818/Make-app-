import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController,AlertController,ModalController } from 'ionic-angular';
import {personService} from '../../providers/personService';
import {Storage} from '@ionic/storage';
import { LoginPage } from '../login/login';
/**
 * Generated class for the PersonMyactualPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-person-myactual',
  templateUrl: 'person-myactual.html',
  providers: [personService]
})
export class PersonMyactualPage {
  okOrder;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public personService: personService,
    public storage: Storage,
    public alertCtrl: AlertController,
    public modalCtrl: ModalController
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
        // alert.present();
        let model=this.modalCtrl.create(LoginPage);
        model.present();
        this.viewCtrl.dismiss();


      } else {
        let res = JSON.parse(result)
        // console.log(res);
        let user = res.id;

        //请求已经付款课程
        this.personService.okorder(user).then(data => {
          this.okOrder = data;
          // console.log(this.noOrder)
          for(var i = 0;i<this.okOrder.length;i++){
            let date=new Date(this.okOrder[i].sendtime)
            this.okOrder[i].sendtime=date.toLocaleString();
            // console.log($scope.comments[i].cctime)
          }

        }, (error) => {
          console.log("哎")
        })

      }
    });

  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
