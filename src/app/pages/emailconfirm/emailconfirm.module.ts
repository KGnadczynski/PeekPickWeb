import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { EmailConfirmComponent } from './emailconfirm.component';
import { routing } from './emailconfirm.routing';

@NgModule({
  imports: [
    CommonModule,
    routing
  ],
  declarations: [
    EmailConfirmComponent
  ]
})
export default class EmailConfirmModule {}
