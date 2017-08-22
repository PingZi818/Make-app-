import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController, AlertController ,ToastController,ModalController} from 'ionic-angular';
import {Storage} from '@ionic/storage';
import {LoginPage} from '../login/login';
import {PersonOrderPage} from '../person-order/person-order';
import {actualcombService} from '../../providers/actualcombService';
import {personService} from '../../providers/personService';
import {PersonZhifuPage} from '../person-zhifu/person-zhifu';


/**
 * Generated class for the CreateorderPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-createorder',
  templateUrl: 'createorder.html',
  providers: [actualcombService,personService]
})
export class CreateorderPage {
  ano:any;
  a_details:any;
  ono:any;
  newOno:any;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public viewCtrl: ViewController,
              public actualcombService: actualcombService,
              public personService:personService,
              public storage: Storage,
              public alertCtrl: AlertController,
              public toastCtrl: ToastController,
              public modalCtrl:ModalController
  ) {
    this.ano=navParams.data.ano;
    let ano=this.ano;
    // console.log(this.ano)
    this.actualcombService.getA_details(this.ano).then(data => {
      this.a_details = data;
      // console.log(this.a_details)
    }, (error) => {
      console.log("实战")
    })


  }


 createOrder(ano){
   this.storage.get('userInfo').then((result) => {
     if (result == null) {
       let alert = this.alertCtrl.create({
         title: '请先登录!',
         // subTitle: '请您先登陆',
         buttons: ['确定']
       });
       alert.present();
       this.navCtrl.push(LoginPage);
     }
     else {
       let res = JSON.parse(result);
       var order = {
         user_id: res.id,
         ano:this.ano
       };
       // console.log(order)
       this.actualcombService.getOrder(order).then(data =>{
         if(data.result==1){
           let confirm = this.alertCtrl.create({
             title: '提示',
             message: '订单已存在，是否前往个人中心?',
             buttons: [
               {
                 text: '暂不',
                 handler: () => {
                   console.log('disagree');
                 }
               },
               {
                 text: '立即前往',
                 handler: () => {
                  // this.navCtrl.push(PersonOrderPage);
                   let model=this.modalCtrl.create(PersonOrderPage);
                   model.present();
                 }
               }
             ]
           });
           confirm.present();
         }
         else {
           // console.log(data.result);
           this.actualcombService.insertOrder(order).then(data => {
             if (data.result===1)
             {
               this.personService.my_noorder(order.user_id).then(data =>{
                 // console.log(data[0].ono)
                 this.newOno = data[0].ono;
                 // console.log(this.newOno )
                 this.navCtrl.push(PersonZhifuPage,{
                   ono:this.newOno
                 })
               },(error)=>{
                 let toast = this.toastCtrl.create({
                   message: '网络错误！',
                   duration: 3000
                 });
                 toast.present();
               })
                // console.log(this.newOno )

               //跳到支付页

             }
             else {
               let toast2 = this.toastCtrl.create({
                 message: '订单失败',
                 duration: 3000,
                 position: 'bottom'
               });
               toast2.present();
             }

           },(error)=>{
             let toast = this.toastCtrl.create({
               message: '网络错误！',
               duration: 3000
             });
             toast.present();
           })
         }
       })
       }
   })
 }
}
