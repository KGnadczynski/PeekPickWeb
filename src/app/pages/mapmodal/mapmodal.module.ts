import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { MapModalComponent } from './mapmodal.component';
import { routing } from './mapmodal.routing';
import { ModalModule } from 'ng2-bootstrap';
import { AgmCoreModule } from '@agm/core';

@NgModule({
  imports: [
    CommonModule,
    ModalModule.forRoot(),
    AgmCoreModule,
    routing
  ],
  declarations: [
    MapModalComponent
  ]
})
export  class MapModalModule {}
