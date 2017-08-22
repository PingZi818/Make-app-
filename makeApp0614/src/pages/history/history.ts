import { Component } from '@angular/core';
import { IonicPage,  NavController, NavParams,ViewController,AlertController,ModalController } from 'ionic-angular';
import {Storage} from '@ionic/storage';
import { LoginPage } from '../login/login';
import {personService} from '../../providers/personService';
/**
 * Generated class for the HistoryPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-history',
  templateUrl: 'history.html',
  providers: [personService]
})
export class HistoryPage {
  dongtai:any=[];
  user:any;
  lala:number;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public alertCtrl: AlertController,
    public modalCtrl: ModalController,
    public personService: personService,
    public storage: Storage
  ) {
    this.storage.get('userInfo').then((result) => {

      if (result == null) {
        let model=this.modalCtrl.create(LoginPage);
        model.present();
        this.viewCtrl.dismiss();
      } else {
        this.user = JSON.parse(result)
        // console.log(res);
        let user =  this.user.id;

        //请求未支付订单
        this.personService.my_dongtai(user).then(data => {
          this.dongtai = data;
          for(var i = 0;i< this.dongtai.length;i++){
            this.lala=new Date( this.dongtai[i].sendtime).getTime();
            this.dongtai[i].sendtime=this.lala;
          }

          this.dongtai.sort(getSortFun('desc', 'sendtime'));
          function getSortFun(order, sortBy) {
            var ordAlpah = (order == 'asc') ? '>' : '<';
            var sortFun = new Function('a', 'b', 'return a.' + sortBy + ordAlpah + 'b.' + sortBy + '?1:-1');
            return sortFun;
          }
          console.log( this.dongtai);
          for(var i = 0;i< this.dongtai.length;i++){
            this.dongtai[i].sendtime=new Date( this.dongtai[i].sendtime).toLocaleString();
          }



          // console.log(this.noOrder)
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
