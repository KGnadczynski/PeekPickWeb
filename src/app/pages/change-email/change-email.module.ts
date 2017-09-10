import { NgModule } from '@angular/core';
import { routing } from './change-email.routing';
import { CommonModule } from '@angular/common';
import { ChangeEmailComponent } from './change-email.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    imports: [ routing, CommonModule, FormsModule, ReactiveFormsModule ],
    declarations: [ ChangeEmailComponent ]
})

export class ChangeEmailModule {}