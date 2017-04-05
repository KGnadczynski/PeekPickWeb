import { NgModule }      from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { CommonModule }  from '@angular/common';
import { NgaModule } from '../../theme/nga.module';
import { KomunikatComponent } from './komunikat.component.ts';
import { routing } from './komunikat.routing.ts';
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
import { Daterangepicker } from 'ng2-daterangepicker';

import { MomentModule } from 'angular2-moment';

import { MessagesComponent } from '../messages/messages.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgaModule,
    InfiniteScrollModule,
    CollapseModule,
    BusyModule,
    Daterangepicker,
    ModalModule.forRoot(),
    BootstrapModalModule,
    ImageUploadModule,
    MdSliderModule,
    routing,
    MomentModule
  ],
  declarations: [
    KomunikatComponent,
    DodajKomunikatModal,
    ClickedKomunikatModal,
    MdCheckbox,
    MessagesComponent
  ],
  entryComponents: [ DodajKomunikatModal,ClickedKomunikatModal ]
})
export  class  KomunikatModule {}
