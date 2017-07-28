import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';
import { ToastyModule } from 'ng2-toasty';
import { Login } from './login.component';
import { routing } from './login.routing';


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgaModule,
    ToastyModule.forRoot(),
    routing
  ],
  declarations: [
    Login,
  ]
})
export class LoginModule {}