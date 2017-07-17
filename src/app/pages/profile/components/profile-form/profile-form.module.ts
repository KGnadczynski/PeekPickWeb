import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { routing } from './profile-form.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProfileFormComponent } from './profile-form.component';

@NgModule({
    imports: [ CommonModule, routing, FormsModule, ReactiveFormsModule ],
    declarations: [ ProfileFormComponent ],
    exports: [ ProfileFormComponent ]
})

export class ProfileFormModule {}