import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController,AlertController,LoadingController,ModalController } from 'ionic-angular';
import {personService} from '../../providers/personService';
import {Storage} from '@ionic/storage';
import {PersonOrderPage} from '../person-order/person-order';
/**
 * Generated class for the PersonZhifuPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-person-zhifu',
  templateUrl: 'person-zhifu.html',
  providers: [personService]
})
export class PersonZhifuPage {
  ok:any;
  ono:any;
  acover_img;
  price:any;
  aname;
  ano;
  otime;
  orderzhifu:any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public personService: personService,
    public storage: Storage,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
  public modalCtrl: ModalController,
  ) {
    this.ono=navParams.data.ono;
    // console.log(this.ono)
    //请求未支付订单
    this.personService.get_zhifu(this.ono).then(data => {
      this.acover_img = data[0].acover_img;
      this.aname = data[0].aname;
      this.price = data[0].price;
      this.ano = data[0].ano;
      this.otime = data[0].otime;

      let date=new Date(this.otime );
      this.otime=date.toLocaleString();
      // console.log(this.ano)
      this.storage.get('userInfo').then((result) => {
        let res = JSON.parse(result);
        this.orderzhifu={
          ano:this.ano,
          user_id:res.id
        }
      },(error)=>{
        console.log("orderzhifu");
      })
      // console.log(this.okOrder)
    }, (error) => {
      console.log("哎")
    })



  }
  dismiss() {
    this.viewCtrl.dismiss();
  }
  payforit(){
    let loader = this.loadingCtrl.create({
      content: "Please wait...",
      duration: 3000
    });
    this.personService.updateOrder(this.orderzhifu).then(data => {
      loader.present();
      console.log(data.result);
      if(data.result==1){
          let confirm = this.alertCtrl.create({
            title: '支付成功',
            message: '是否前去学习？',
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
                  this.viewCtrl.dismiss();
                  // this.navCtrl.push(PersonOrderPage);
                  let model=this.modalCtrl.create(PersonOrderPage);
                  model.present();
                }
              }
            ]
          });
          confirm.present();
      }},(error) => {
        console.log("实战")
      })


  }

}
