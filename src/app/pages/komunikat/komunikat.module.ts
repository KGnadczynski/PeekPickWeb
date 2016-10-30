import { NgModule }      from '@angular/core';
import { FormsModule }   from '@angular/forms';

import { CommonModule }  from '@angular/common';
import { KomunikatComponent } from './komunikat.component.ts';
import { routing } from './komunikat.routing.ts';
import {Komunikat} from "./komunikat";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    routing
  ],
  declarations: [
    KomunikatComponent
  ]
})
export default class  KomunikatModule {}
