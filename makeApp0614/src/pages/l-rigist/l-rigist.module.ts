import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LRigistPage } from './l-rigist';

@NgModule({
  declarations: [
    LRigistPage,
  ],
  imports: [
    IonicPageModule.forChild(LRigistPage),
  ],
  exports: [
    LRigistPage
  ]
})
export class LRigistPageModule {}
