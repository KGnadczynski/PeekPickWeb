import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { KulturairozrywkaComponent } from './kulturairozrywka.component';
import { routing } from './kulturairozrywka.routing';

@NgModule({
  imports: [
    CommonModule,
    routing
  ],
  declarations: [
    KulturairozrywkaComponent
  ]
})
export default class KulturairozrywkaModule {}