import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AcdetailPage } from './acdetail';

@NgModule({
  declarations: [
    AcdetailPage,
  ],
  imports: [
    IonicPageModule.forChild(AcdetailPage),
  ],
  exports: [
    AcdetailPage
  ]
})
export class AcdetailPageModule {}
