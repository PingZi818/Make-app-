import { Component ,ViewChild} from '@angular/core';
import { NavController,ModalController } from 'ionic-angular';
import { App } from 'ionic-angular';
import { AcdetailPage } from '../acdetail/acdetail';
import {actualcombService} from '../../providers/actualcombService';
import {SearchPage} from '../search/search';
@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html',
  providers: [actualcombService]
})
export class ContactPage {
  @ViewChild('ionSlides') slides;
  actualcomb_zhanshi=[];
  zhongzhuan=[];

  items=[];
  page_no=1;
  page_items:any;
  page_count:any;
  additems=[];
  hasmore=true;
  show=false;
  //items: Array<{ano:string,acover_img: string,aname: string, acover_content: string,price: string,renshu: string}>;
  constructor(public navCtrl: NavController,private app:App,public actualcombService: actualcombService,public modalCtrl:ModalController) {
    this.actualcombService.getAllActualcomb_info().then(data => {
      this.items=data;
      this.zhongzhuan=this.items;

      this.page_items=5;
      this.page_count=Math.ceil(this.zhongzhuan.length/this.page_items);
      this.additems=this.zhongzhuan.slice(0,5);
      this.actualcomb_zhanshi=this.additems;

      this.additems=[];

    }, (error) => {
      console.log("实战")
    })

  }
  autoPlay(){
    this.slides.startAutoplay();
    //页面进入时启动自动播放
  }
  itemTapped(event,ano) {
    //以页面跳转的方式打开页面
     this.navCtrl.push(AcdetailPage,{
        ano:ano
     });
  }
  filter(atypeno){
  this.actualcomb_zhanshi=[];
  this.zhongzhuan=[];
  if(atypeno!=0){
    for (var i = 0; i < this.items.length; i++) {
      if (this.items[i].atypeno == atypeno) {
        this.zhongzhuan.push(this.items[i])
      }
    }
    console.log(this.zhongzhuan)
    this.actualcomb_zhanshi=this.zhongzhuan.slice(0,5);
    this.page_no=1;
    this.hasmore=true;
    this.show=false;
    // doInfinite(infiniteScroll)
  }
  else{
    this.actualcombService.getAllActualcomb_info().then(data => {
      this.items=data;
      this.zhongzhuan=this.items;
      console.log(this.zhongzhuan)
      this.page_items=5;
      this.page_count=Math.ceil(this.zhongzhuan.length/this.page_items);
      this.additems=this.zhongzhuan.slice(0,5);
      this.actualcomb_zhanshi=this.additems;
      this.additems=[];
      this.page_no=1;
      this.hasmore=true;
      this.show=false;
    }, (error) => {
      console.log("实战")
    })
  }
}

  doInfinite(infiniteScroll) {
    console.log('Begin async operation');
    console.log(this.zhongzhuan)
    this.page_count=Math.ceil(this.zhongzhuan.length/this.page_items);
    console.log(this.page_no);
    return new Promise((resolve) => {
      setTimeout(() => {
        for(this.page_no;this.page_no<this.page_count;this.page_no++){
          this.additems = this.zhongzhuan.slice(this.page_no * this.page_items, (this.page_no + 1) * this.page_items);
          console.log(this.additems);
          for(var i=0;i<this.additems.length;i++){
            this.actualcomb_zhanshi.push(this.additems[i])
          }
          console.log( this.actualcomb_zhanshi)
          infiniteScroll.complete();
          this.additems = [];

        }
        console.log(this.page_no)
        this.hasmore=false;
        this.show=true;
        console.log('Async operation has ended');
        //console.log('Async operation has ended');
      }, 500)
    })

  }













  search(){
    let model=this.modalCtrl.create(SearchPage);
    model.present();
  }

}
















































































































































































































































































































































































































































































































































