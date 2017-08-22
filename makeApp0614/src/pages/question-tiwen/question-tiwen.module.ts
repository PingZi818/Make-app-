import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { QuestionTiwenPage } from './question-tiwen';

@NgModule({
  declarations: [
    QuestionTiwenPage,
  ],
  imports: [
    IonicPageModule.forChild(QuestionTiwenPage),
  ],
  exports: [
    QuestionTiwenPage
  ]
})
export class QuestionTiwenPageModule {}
