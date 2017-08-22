import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { QuestionIndexPage } from './question-index';

@NgModule({
  declarations: [
    QuestionIndexPage,
  ],
  imports: [
    IonicPageModule.forChild(QuestionIndexPage),
  ],
  exports: [
    QuestionIndexPage
  ]
})
export class QuestionIndexPageModule {}
