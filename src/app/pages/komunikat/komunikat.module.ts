import { NgModule }      from '@angular/core';
import { FormsModule }   from '@angular/forms';

import { CommonModule }  from '@angular/common';
import { KomunikatComponent } from './komunikat.component.ts';
import { routing } from './komunikat.routing.ts';
import { MyDatePickerModule } from 'mydatepicker';
import {SampleDatePickerNormal} from './sample-date-picker-normal';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MyDatePickerModule,
    routing
  ],
  declarations: [
    KomunikatComponent,
    SampleDatePickerNormal
  ]
})
export default class  KomunikatModule {}
