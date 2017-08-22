import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { PersonalPage } from '../pages/personal/personal';
import { LoginPage } from '../pages/login/login';
import { LRigistPage } from '../pages/l-rigist/l-rigist';
import { VideoPage } from '../pages/video/video';
import { QuestionIndexPage } from '../pages/question-index/question-index';
import { QuestionDetailPage } from '../pages/question-detail/question-detail';
import { QuestionTiwenPage } from '../pages/question-tiwen/question-tiwen';
import { QuestionDetailAnswerPage } from '../pages/question-detail-answer/question-detail-answer';
import { DetailPage } from '../pages/courseDetail/detail';
import { InfoPage } from '../pages/courseInfo/info';
import { PersonOrderPage } from '../pages/person-order/person-order';
import { AcdetailvideoplayPage } from '../pages/acdetailvideoplay/acdetailvideoplay';
import { AcdetailPage } from '../pages/acdetail/acdetail';
import { PersonZhifuPage } from '../pages/person-zhifu/person-zhifu';
import { PersonUserInfoPage } from '../pages/person-user-info/person-user-info';
import { HistoryPage } from '../pages/history/history';
import { PersonMyquestionPage } from '../pages/person-myquestion/person-myquestion';
import { PersonMyactualPage } from '../pages/person-myactual/person-myactual';
import { PersonMycoursePage } from '../pages/person-mycourse/person-mycourse';
import { SearchPage } from '../pages/search/search';
import { CreateorderPage } from '../pages/createorder/createorder';
import { VideoInsertComPage } from '../pages/video-insert-com/video-insert-com';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
//添加storage
import { IonicStorageModule } from '@ionic/storage';
import { PipedetailPipe } from '../pipes/pipedetail/pipedetail';
import { WordsPipe } from '../pipes/wordspipe/wordspipe';
//添加http模块
import { HttpModule } from '@angular/http';
import { HttpService } from '../providers/HttpServices';

//导入

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    PersonalPage,
    LoginPage,
    VideoPage,
    QuestionIndexPage,
    QuestionDetailPage,
    DetailPage,
    QuestionTiwenPage,
    QuestionDetailAnswerPage,
    InfoPage,
    PersonOrderPage,
    AcdetailvideoplayPage,
    AcdetailPage,
    PersonZhifuPage,
    PersonUserInfoPage,
    HistoryPage,
    PersonMyquestionPage,
    PersonMyactualPage,
    PersonMycoursePage,
    SearchPage,
    PipedetailPipe,
    WordsPipe,
    LRigistPage,
    CreateorderPage,
    VideoInsertComPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp,{
      tabsHideOnSubPages: 'true'         //隐藏全部子页面tabs
    }),
    IonicStorageModule.forRoot(),
    //http模块
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    PersonalPage,
    LoginPage,
    VideoPage,
    QuestionIndexPage,
    QuestionDetailPage,
    DetailPage,
    QuestionTiwenPage,
    QuestionDetailAnswerPage,
    InfoPage,
    PersonOrderPage,
    AcdetailvideoplayPage,
    AcdetailPage,
    PersonZhifuPage,
    PersonUserInfoPage,
    HistoryPage,
    PersonMyquestionPage,
    PersonMyactualPage,
    PersonMycoursePage,
    SearchPage,
    LRigistPage,
    CreateorderPage,
    VideoInsertComPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Storage,
    HttpService
  ]
})
export class AppModule {}
