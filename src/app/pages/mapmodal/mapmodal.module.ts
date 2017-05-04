import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { MapModalComponent } from './mapmodal.component';
import { routing } from './mapmodal.routing';
import { ModalModule } from 'ng2-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    ModalModule.forRoot(),
    routing
  ],
  declarations: [
    MapModalComponent
  ]
})
export  class MapModalModule {}
