import { NgModule } from '@angular/core';
import { routing } from './change-password-token.routing';
import { CommonModule } from '@angular/common';
import { ChangePasswordTokenComponent } from './change-password-token.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    imports: [ routing, CommonModule, FormsModule, ReactiveFormsModule ],
    declarations: [ ChangePasswordTokenComponent ]
})

export class ChangePasswordTokenModule {}