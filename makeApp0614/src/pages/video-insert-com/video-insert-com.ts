import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController, AlertController, ToastController,ModalController } from 'ionic-angular';
import {Storage} from '@ionic/storage';
import {questionService} from '../../providers/questionService';
import { QuestionDetailPage } from '../question-detail/question-detail';
import { LoginPage } from '../login/login';
/**
 * Generated class for the VideoInsertComPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-video-insert-com',
  templateUrl: 'video-insert-com.html',
  providers: [questionService]
})
export class VideoInsertComPage {
  ccdetail: any;
  cno: any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public viewCtrl: ViewController,
              public questionService: questionService,
              public storage: Storage,
              public alertCtrl: AlertController,
              public toastCtrl: ToastController,
              public modalCtrl: ModalController) {
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  com(ccdetail) {
    this.storage.get('userInfo').then((result) => {
      if (result == null) {
        let model = this.modalCtrl.create(LoginPage);
        model.present();
        this.viewCtrl.dismiss();
      } else {
        let res = JSON.parse(result)
        // console.log(res);
        this.cno = this.navParams.data.cno;
        //请求猿问详情

        var resp = {
          cno: this.cno,
          ccdetail: ccdetail == undefined ? "" : ccdetail,
          user_id: res.id
        }
        // console.log(resp);

        if (ccdetail == undefined) {
          let toast2 = this.toastCtrl.create({
            message: '请输入问题回答',
            duration: 3000,
            position: 'bottom'
          });
          toast2.present();
        } else {
          // console.log(resp)
          this.questionService.insertComment(resp).then(data => {
            // console.log(data)
            if (data.length >= 0) {
              // let model=this.modalCtrl.create(QuestionDetailPage,{
              //   qno:this.qno
              // });
              // model.present();
              let toast2 = this.toastCtrl.create({
                message: '评论成功',
                duration: 1500,
                position: 'middle'
              });
              toast2.present();
              this.viewCtrl.dismiss();
            }

          }, (error) => {

            let toast = this.toastCtrl.create({
              message: '网络错误！',
              duration: 3000
            });
            toast.present();
          })
        }

      }
    });
  }
}
