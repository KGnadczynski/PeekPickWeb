import { NgModule }      from '@angular/core';
import { FormsModule }   from '@angular/forms';
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
import {BusyModule} from 'angular2-busy';
import { BootstrapModalModule } from 'angular2-modal/plugins/bootstrap';
import { ModalModule } from 'angular2-modal';
import { DodajKomunikatModal } from './dialogs/dodajkomunikat-modal';
import {ClickedKomunikatModal} from './dialogs/clickedkomunikat-modal';
import {CommunicationService} from "./communicationservice.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgaModule,
    MyDatePickerModule,
    InfiniteScrollModule,
    CollapseModule,
    BusyModule,
    ModalModule.forRoot(),
    BootstrapModalModule,
    routing
  ],
  declarations: [
    KomunikatComponent,
    SampleDatePickerNormal,
    SlideAbleDirective,
    Ng2StyledDirective,
    DodajKomunikatModal,
    ClickedKomunikatModal,
    MdCheckbox,
    Ng2SliderComponent
  ],
  providers: [
     CommunicationService
  ],
  entryComponents: [ DodajKomunikatModal,ClickedKomunikatModal ]
})
export default class  KomunikatModule {}
