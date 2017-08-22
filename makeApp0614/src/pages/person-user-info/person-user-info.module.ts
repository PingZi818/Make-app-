import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PersonUserInfoPage } from './person-user-info';

@NgModule({
  declarations: [
    PersonUserInfoPage,
  ],
  imports: [
    IonicPageModule.forChild(PersonUserInfoPage),
  ],
  exports: [
    PersonUserInfoPage
  ]
})
export class PersonUserInfoPageModule {}
