import { NgModule } from '@angular/core';
import { routing } from './change-password.routing';
import { CommonModule } from '@angular/common';
import { ChangePasswordComponent } from './change-password.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    imports: [ routing, CommonModule, FormsModule, ReactiveFormsModule ],
    declarations: [ ChangePasswordComponent ]
})

export class ChangePasswordModule {}