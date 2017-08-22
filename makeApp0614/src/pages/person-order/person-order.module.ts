import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PersonOrderPage } from './person-order';

@NgModule({
  declarations: [
    PersonOrderPage,
  ],
  imports: [
    IonicPageModule.forChild(PersonOrderPage),
  ],
  exports: [
    PersonOrderPage
  ]
})
export class PersonOrderPageModule {}
