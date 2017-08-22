import { Component } from '@angular/core';
import { IonicPage,ViewController ,NavController,ModalController, NavParams,ToastController } from 'ionic-angular';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import {UserService} from '../../providers/userService';
import {Storage} from '@ionic/storage';
import { TabsPage } from '../tabs/tabs';
/**
 * Generated class for the LRigistPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-l-rigist',
  templateUrl: 'l-rigist.html',
  providers: [UserService]
})
export class LRigistPage {
  loginForm:FormGroup;
  user_tel:any;
  user_password:any;
  user_password_confirm:any;
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
      user_password:['',Validators.compose([Validators.required,Validators.minLength(6),Validators.required,Validators.pattern("^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$")])],
      // user_password_confirm:['',Validators.compose([Validators.required,Validators.minLength(6)])]
    })
    this.user_tel=this.loginForm.controls['user_tel'];
    this.user_password=this.loginForm.controls['user_password'];


  }
  dismiss(){
    this.viewCtrl.dismiss();
  }

  rigiston(values){
    let user={
      user_tel:values.user_tel,
      user_password:values.user_password
    }
    console.log(user);
    // alert(JSON.stringify(values))
    this.userService.regist(user).then(data => {
      if (data.result===1)//注册成功
      {
        //请求用户信息
        this.userService.loginGetAll(user.user_tel).then(data => {
          console.log(data[0]);
          let userInfo={id:data[0].user_id,token:data[0].token,user_tel:data[0].user_tel,user_icon:data[0].user_icon,user_name:data[0].user_name};
          this.storage.set('userInfo',JSON.stringify(userInfo) );
        },(error)=>{
          console.log("哎")
        })


        // this.storage.set('userInfo',JSON.stringify(userInfo) );
        this.navCtrl.push(TabsPage);
        // let model=this.modalCtrl.create(HomePage);
        // model.present();
      }
      else if(data.result===2){
        let toast2 = this.toastCtrl.create({
          message: '该用户已经存在',
          duration: 3000,
          position: 'bottom'
          // ,
          // showCloseButton: true,
          // closeButtonText: '关闭'
        });
        toast2.present();
      }else if(data.result===3){
        let toast = this.toastCtrl.create({
          message: '网络错误！',
          duration: 3000
        });
        toast.present();
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
