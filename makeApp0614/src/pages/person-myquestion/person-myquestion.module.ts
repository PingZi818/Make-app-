import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PersonMyquestionPage } from './person-myquestion';

@NgModule({
  declarations: [
    PersonMyquestionPage,
  ],
  imports: [
    IonicPageModule.forChild(PersonMyquestionPage),
  ],
  exports: [
    PersonMyquestionPage
  ]
})
export class PersonMyquestionPageModule {}
