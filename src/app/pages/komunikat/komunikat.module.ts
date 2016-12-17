import { NgModule }      from '@angular/core';
import { FormsModule ,ReactiveFormsModule }   from '@angular/forms';
import { CommonModule }  from '@angular/common';
import { NgaModule } from '../../theme/nga.module';
import { KomunikatComponent } from './komunikat.component.ts';
import { routing } from './komunikat.routing.ts';
import { MyDatePickerModule } from 'mydatepicker';
import {SampleDatePickerNormal} from './sample-date-picker-normal';
import { InfiniteScrollModule } from 'angular2-infinite-scroll';
import { Ng2SliderComponent } from 'ng2-slider-component/ng2-slider.component';
import { SlideAbleDirective } from 'ng2-slideable-directive/slideable.directive';
import { Ng2StyledDirective } from 'ng2-styled-directive/ng2-styled.directive';
import {MdCheckbox} from '@angular2-material/checkbox';
import { CollapseModule } from 'ng2-bootstrap/ng2-bootstrap';
import { AgmCoreModule } from "angular2-google-maps/core";





@NgModule({
  imports: [
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyA3ZRkYbUTBGZdBGtgwaZHq_sIW-tgV8vE",
      libraries: ["places"]
    }),
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgaModule,
    MyDatePickerModule,
    InfiniteScrollModule,
    CollapseModule,
    routing
  ],
  declarations: [
    KomunikatComponent,
    SampleDatePickerNormal,
    SlideAbleDirective,
    Ng2StyledDirective,
    MdCheckbox,
    Ng2SliderComponent
  ],
  
})
export default class  KomunikatModule {}
