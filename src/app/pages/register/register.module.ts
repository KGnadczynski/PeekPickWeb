import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';
import { ModalModule } from 'ng2-bootstrap';

import { Register } from './register.component';
import { routing }       from './register.routing';
import {BusyModule} from "angular2-busy";
import { AgmCoreModule } from '@agm/core';


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
    FormsModule,
    NgaModule,
    BusyModule,
    AgmCoreModule,
    routing
  ],
  declarations: [
    Register
  ]
})
export class RegisterModule {}
