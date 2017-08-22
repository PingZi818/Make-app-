import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreateorderPage } from './createorder';

@NgModule({
  declarations: [
    CreateorderPage,
  ],
  imports: [
    IonicPageModule.forChild(CreateorderPage),
  ],
  exports: [
    CreateorderPage
  ]
})
export class CreateorderPageModule {}
