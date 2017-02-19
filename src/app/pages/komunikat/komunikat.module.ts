import { NgModule }      from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { CommonModule }  from '@angular/common';
import { NgaModule } from '../../theme/nga.module';
import { KomunikatComponent } from './komunikat.component.ts';
import { routing } from './komunikat.routing.ts';
import { MyDatePickerModule } from 'mydatepicker';
import {SampleDatePickerNormal} from './sample-date-picker-normal';
import { InfiniteScrollModule } from 'angular2-infinite-scroll';
import {MdCheckbox} from '@angular2-material/checkbox';
import { CollapseModule } from 'ng2-bootstrap/ng2-bootstrap';
import {BusyModule} from 'angular2-busy';
import { BootstrapModalModule } from 'angular2-modal/plugins/bootstrap';
import { ModalModule } from 'angular2-modal';
import { DodajKomunikatModal } from './dialogs/dodajkomunikat-modal';
import {ClickedKomunikatModal} from './dialogs/clickedkomunikat-modal';
import { ImageUploadModule } from 'ng2-imageupload';
import {MdSliderModule} from "@angular2-material/slider";

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
    ImageUploadModule,
    MdSliderModule,
    routing
  ],
  declarations: [
    KomunikatComponent,
    SampleDatePickerNormal,
    DodajKomunikatModal,
    ClickedKomunikatModal,
    MdCheckbox
  ],
  entryComponents: [ DodajKomunikatModal,ClickedKomunikatModal ]
})
export  class  KomunikatModule {}
