import { NgModule } from '@angular/core';
import { CommonModule }  from '@angular/common';
import { routing } from './profile-edit.routing';
import { ProfileEditComponent } from './profile-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgaModule } from '../../../theme/nga.module';

@NgModule({
    imports: [ routing, FormsModule, ReactiveFormsModule, CommonModule ],
    declarations: [ ProfileEditComponent ],
    exports: [ProfileEditComponent ]
})

export class ProfileEditModule{}