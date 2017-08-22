import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ModalController } from 'ionic-angular';
import { App } from 'ionic-angular';
import { AcdetailvideoplayPage } from '../acdetailvideoplay/acdetailvideoplay';
import {actualcombService} from '../../providers/actualcombService';
import { CreateorderPage } from '../createorder/createorder';
import {SearchPage} from '../search/search';
/**
 * Generated class for the AcdetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-acdetail',
  templateUrl: 'acdetail.html',
  providers: [actualcombService]
})
export class AcdetailPage {
  ano:any;
  a_details:any;
  a_chapter:any;
  a_comments:any;
  segmentsArray = ['介绍','章节','评论'];
  segmentModel: string = this.segmentsArray[0];
  constructor(public navCtrl: NavController, private app:App,public navParams: NavParams,public modalCtrl: ModalController,public actualcombService: actualcombService) {
    this.ano=navParams.data.ano;
    //请求详情
    let ano=this.ano;
    this.actualcombService.getA_details(ano).then(data => {
      this.a_details = data;
    }, (error) => {
      console.log("实战")
    })
    this.actualcombService.getA_chapter(ano).then(data => {
      // console.log(data)
      this.a_chapter = data;
    }, (error) => {
      console.log("实战")
    })
    this.actualcombService.getA_comments(ano).then(data => {
      this.a_comments = data;
    }, (error) => {
      console.log("实战")
    })

  }

  itemTapped(event) {
    let modal = this.modalCtrl.create( AcdetailvideoplayPage);
    modal.present();
  }
  swipeEvent(event){
    // console.log(event)
    // console.log(this.segmentModel)
    //向左滑
    if(event.direction==2){
      if(this.segmentsArray.indexOf(this.segmentModel)<3){
        this.segmentModel = this.segmentsArray[this.segmentsArray.indexOf(this.segmentModel)+1];
      }
    }
//向右滑
    if(event.direction==4){
      if(this.segmentsArray.indexOf(this.segmentModel)>0){
        this.segmentModel = this.segmentsArray[this.segmentsArray.indexOf(this.segmentModel)-1];
      }
    }
  }
  toCreateOrder(ano) {
    // console.log(ano)
    //以页面跳转的方式打开页面
    this.navCtrl.push(CreateorderPage,{
      ano:ano

    });
  }
  search(){
    let model=this.modalCtrl.create(SearchPage);
    model.present();
  }

}
