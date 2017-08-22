import { Component } from '@angular/core';
 import { IonicPage, NavController, NavParams,ViewController,AlertController,ModalController,ToastController } from 'ionic-angular';
 import {personService} from '../../providers/personService';
 import {PersonZhifuPage} from '../person-zhifu/person-zhifu';
import {Storage} from '@ionic/storage';
import { LoginPage } from '../login/login';
 /**
 * Generated class for the PersonOrderPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-person-order',
  templateUrl: 'person-order.html',
  providers: [personService]
})
export class PersonOrderPage {
  noOrder;
  okOrder;
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
    public toastCtrl: ToastController
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

        //请求未支付订单
        this.personService.my_noorder(user).then(data => {
          this.noOrder = data;
          // console.log(this.noOrder)
        }, (error) => {
          console.log("哎")
        })

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
  dingdan(ono){
    let model=this.modalCtrl.create(PersonZhifuPage,{
      ono:ono
    });
    model.present();
  }

  delorder(ono){
    let confirm = this.alertCtrl.create({
      // title: '支付成功',
      message: '是否删除订单？',
      buttons: [
        {
          text: '否',
          handler: () => {
            console.log('disagree');
          }
        },
        {
          text: '是',
          handler: () => {
            //删除未付款订单
            this.personService.deleteOrder(ono).then(data => {
              if(data==0){
                let toast2 = this.toastCtrl.create({
                  message: '删除成功.',
                  duration: 2000,
                  position: 'bottom'

                });
                toast2.present();
              }
              this.storage.get('userInfo').then((result) => {
                  let res = JSON.parse(result)
                  // console.log(res);
                  let user = res.id;
                  //请求未支付订单
                  this.personService.my_noorder(user).then(data => {
                    this.noOrder = data;
                    // console.log(this.noOrder)
                  }, (error) => {
                    console.log("哎")
                  })


              });

            }, (error) => {
              console.log("哎")
            })
          }
        }
      ]
    });
    confirm.present();
  }
}
