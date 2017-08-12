import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { NgaModule } from '../../theme/nga.module';
import { KomunikatComponent } from './komunikat.component.ts';
import { routing } from './komunikat.routing.ts';
import { BusyModule } from 'angular2-busy';
import { BootstrapModalModule } from 'angular2-modal/plugins/bootstrap';
import { ModalModule } from 'angular2-modal';
import {ClickedKomunikatModal} from './dialogs/clickedkomunikat-modal';
import { ImageUploadModule } from 'ng2-imageupload';
import { Daterangepicker } from 'ng2-daterangepicker';
import { MomentModule } from 'angular2-moment';
import { RouterModule } from '@angular/router';
import { MessagesModule } from '../messages/messages.module';
import { FiltersModule } from '../filters/filters.module';
import { SortingModule } from '../filters/components/sorting/sorting.module';

@NgModule({
  imports: [
    CommonModule,
    NgaModule,

    BusyModule,
    Daterangepicker,
    ModalModule.forRoot(),
    BootstrapModalModule,
    ImageUploadModule,
    routing,
    MomentModule,
    FiltersModule,
    MessagesModule,
    SortingModule
  ],
  declarations: [
    KomunikatComponent,
    ClickedKomunikatModal,
    
  ],
  entryComponents: [ 
    ClickedKomunikatModal ]
})
export  class  KomunikatModule {}
