import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PersonZhifuPage } from './person-zhifu';

@NgModule({
  declarations: [
    PersonZhifuPage,
  ],
  imports: [
    IonicPageModule.forChild(PersonZhifuPage),
  ],
  exports: [
    PersonZhifuPage
  ]
})
export class PersonZhifuPageModule {}
