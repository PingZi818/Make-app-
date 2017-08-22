import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { QuestionDetailAnswerPage } from './question-detail-answer';

@NgModule({
  declarations: [
    QuestionDetailAnswerPage,
  ],
  imports: [
    IonicPageModule.forChild(QuestionDetailAnswerPage),
  ],
  exports: [
    QuestionDetailAnswerPage
  ]
})
export class QuestionDetailAnswerPageModule {}
