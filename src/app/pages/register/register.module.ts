import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';

import { Register } from './register.component';
import { routing }       from './register.routing';
import {BusyModule} from "angular2-busy";


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgaModule,
    BusyModule,
    routing
  ],
  declarations: [
    Register
  ]
})
export class RegisterModule {}
