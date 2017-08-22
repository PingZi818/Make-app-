import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VideoInsertComPage } from './video-insert-com';

@NgModule({
  declarations: [
    VideoInsertComPage,
  ],
  imports: [
    IonicPageModule.forChild(VideoInsertComPage),
  ],
  exports: [
    VideoInsertComPage
  ]
})
export class VideoInsertComPageModule {}
