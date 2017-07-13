import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { routing } from './profile-additional.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProfileAdditionalComponent } from './profile-additional.component';

@NgModule({
    imports: [ CommonModule, FormsModule, ReactiveFormsModule, routing ],
    declarations: [ ProfileAdditionalComponent ],
    exports: [ ProfileAdditionalComponent ]
})

export class ProfileAdditionalModule {}