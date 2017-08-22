import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController, AlertController, ToastController,ModalController} from 'ionic-angular';
import {questionService} from '../../providers/questionService';
import {Storage} from '@ionic/storage';
import { LoginPage } from '../login/login';
import { TabsPage } from '../tabs/tabs';
/**
 * Generated class for the QuestionTiwenPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-question-tiwen',
  templateUrl: 'question-tiwen.html',
  providers: [questionService]
})
export class QuestionTiwenPage {
  c_sortno: string;
  qdetail: any
  qtitle: any

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public viewCtrl: ViewController,
              public questionService: questionService,
              public storage: Storage,
              public alertCtrl: AlertController,
              public toastCtrl: ToastController,
              public modalCtrl:ModalController
  ) {

  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  tiwen(qtitle, c_sortno, qdetail) {
    // this.storage.get('userInfo',JSON.stringify(userInfo) );


    this.storage.get('userInfo').then((result) => {
      // console.log(result);
      if (result == null) {
        // let alert = this.alertCtrl.create({
        //   title: '请先登录!',
        //   // subTitle: '请您先登陆',
        //   buttons: ['确定']
        // });
        // alert.present();
        let model=this.modalCtrl.create(LoginPage);
        model.present();
        this.viewCtrl.dismiss();
      } else {
        let res = JSON.parse(result)
        // console.log(res);
        var question = {
          c_sortno: c_sortno==undefined ? "" : c_sortno  ,
          qdetail: qdetail==undefined ? "" : qdetail ,
          qtitle: qtitle==undefined ? "" : qtitle ,
          user_id: res.id
        }

        if (c_sortno == undefined  || qtitle == undefined) {
          let toast2 = this.toastCtrl.create({
            message: '请输入问题标题或选择问题类型',
            duration: 4000,
            position: 'bottom'
            // ,
            // showCloseButton: true,
            // closeButtonText: '关闭'
          });
          toast2.present();
        } else {
          console.log(question);
          this.questionService.insertQuestion(question).then(data => {
            if (data.result===1)//登录成功
            {
              //请求用户信息

              // this.navCtrl.push(TabsPage,{
              //   id:3
              // });
              this.viewCtrl.dismiss();
              // this.viewCtrl.dismiss();

              // this.navCtrl.parent.select(3);
              // console.log(this.navCtrl)

            }
            else {
              let toast2 = this.toastCtrl.create({
                message: '问题提交失败，请重试',
                duration: 3000,
                position: 'bottom'
                // ,
                // showCloseButton: true,
                // closeButtonText: '关闭'
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
      }
    });


    // alert(JSON.stringify(values))
    // this.questionService.insertQuestion(user).then(data => {
    //
    //   }
  }

}
