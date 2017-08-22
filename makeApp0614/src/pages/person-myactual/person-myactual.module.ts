import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PersonMyactualPage } from './person-myactual';

@NgModule({
  declarations: [
    PersonMyactualPage,
  ],
  imports: [
    IonicPageModule.forChild(PersonMyactualPage),
  ],
  exports: [
    PersonMyactualPage
  ]
})
export class PersonMyactualPageModule {}
