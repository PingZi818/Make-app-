import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PersonMycoursePage } from './person-mycourse';

@NgModule({
  declarations: [
    PersonMycoursePage,
  ],
  imports: [
    IonicPageModule.forChild(PersonMycoursePage),
  ],
  exports: [
    PersonMycoursePage
  ]
})
export class PersonMycoursePageModule {}
