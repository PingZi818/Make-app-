import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AcdetailvideoplayPage } from './acdetailvideoplay';

@NgModule({
  declarations: [
    AcdetailvideoplayPage,
  ],
  imports: [
    IonicPageModule.forChild(AcdetailvideoplayPage),
  ],
  exports: [
    AcdetailvideoplayPage
  ]
})
export class AcdetailvideoplayPageModule {}
