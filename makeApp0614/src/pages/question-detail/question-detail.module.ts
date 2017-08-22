import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { QuestionDetailPage } from './question-detail';

@NgModule({
  declarations: [
    QuestionDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(QuestionDetailPage),
  ],
  exports: [
    QuestionDetailPage
  ]
})
export class QuestionDetailPageModule {}
