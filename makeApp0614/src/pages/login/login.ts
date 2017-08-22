import { Component } from '@angular/core';
import { IonicPage,ViewController ,NavController,ModalController, NavParams,ToastController } from 'ionic-angular';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
//导入本地缓存
import {Storage} from '@ionic/storage';
import {UserService} from '../../providers/userService';
//需要跳转的页面
import { TabsPage } from '../tabs/tabs';
import { LRigistPage } from '../l-rigist/l-rigist';

/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers: [UserService]
})
export class LoginPage {
  loginForm:FormGroup;
  user_tel:any;
  user_password:any;


  constructor(
    public viewCtrl: ViewController,
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl:ModalController,
    public formBuilder:FormBuilder,
    public storage: Storage,
    public toastCtrl: ToastController,
    public userService:UserService
  ) {
    //表单验证
    this.loginForm=formBuilder.group({
      user_tel:['',Validators.compose([Validators.minLength(11),Validators.maxLength(11),Validators.required,Validators.pattern("^(13[0-9]|15[012356789]|17[03678]|18[0-9]|14[57])[0-9]{8}$")])],
      user_password:['',Validators.compose([Validators.required,Validators.minLength(6)])]
    })
    this.user_tel=this.loginForm.controls['user_tel'];
    this.user_password=this.loginForm.controls['user_password'];

  }

  dismiss(){
    this.viewCtrl.dismiss();
  }
  rigist(){
    let model=this.modalCtrl.create(LRigistPage);
    model.present();

  }
  login(values){
    let user={
      user_tel:values.user_tel,
      user_password:values.user_password
    }
   // alert(JSON.stringify(values))
    this.userService.login(user).then(data => {
      if (data.result===1)//登录成功
      {
        //请求用户信息
        this.userService.loginGetAll(user.user_tel).then(data => {
          // console.log(data[0]);
          let userInfo={id:data[0].user_id,token:data[0].token,user_tel:data[0].user_tel,user_icon:data[0].user_icon,user_name:data[0].user_name};
          this.storage.set('userInfo',JSON.stringify(userInfo) );
          this.navCtrl.push(TabsPage);
          this.viewCtrl.dismiss();
        },(error)=>{
          console.log("哎")
        })


        // this.storage.set('userInfo',JSON.stringify(userInfo) );

        // let model=this.modalCtrl.create(HomePage);
        // model.present();
      }
      else {
        let toast2 = this.toastCtrl.create({
          message: '用户名或密码错误.',
          duration: 3000,
          position: 'bottom'
        });
        toast2.present();
      }

    },(error)=>{
      alert(JSON.stringify(values))
      let toast = this.toastCtrl.create({
        message: '网络错误！',
        duration: 3000
      });
      toast.present();
    })

  }
}
