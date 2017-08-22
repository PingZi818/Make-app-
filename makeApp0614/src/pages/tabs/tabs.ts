import { Component,ViewChild } from '@angular/core';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { PersonalPage } from '../personal/personal';
import { QuestionIndexPage } from '../question-index/question-index';
import { Tabs,NavParams } from 'ionic-angular';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  id:any;
  @ViewChild('mainTabs') tabRef: Tabs;
  tab1Root: any= HomePage;
  tab2Root: any = AboutPage;
  tab3Root: any = ContactPage;
  tab4Root: any = QuestionIndexPage;
  tab5Root: any = PersonalPage;


  constructor( public navParams: NavParams
  ) {

  }

    // ionViewDidEnter(){
    //   this.id = this.navParams.data.id;
    //   let id = this.id
    //   console.log(id)
    //   // let selectid = (id==undefined) ? 0 :id;
    //   // console.log(selectid)
    //   // let mainTabs = this.tabRef;
    //   this.tabRef.select(id);
    // }

}
