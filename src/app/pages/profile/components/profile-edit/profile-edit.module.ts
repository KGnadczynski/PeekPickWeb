import { NgModule } from '@angular/core';
import { CommonModule }  from '@angular/common';
import { routing } from './profile-edit.routing';
import { ProfileEditComponent } from './profile-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgaModule } from '../../../../theme/nga.module';
import { CollapseModule } from 'ng2-bootstrap/ng2-bootstrap';
import { ConfirmationPopoverModule } from 'angular-confirmation-popover';

@NgModule({
    imports: [ routing, FormsModule, ReactiveFormsModule, CommonModule, NgaModule, CollapseModule, ConfirmationPopoverModule.forRoot({
        confirmText: 'usuń',
        cancelText: 'anuluj'
    }), ],
    declarations: [ ProfileEditComponent ],
    exports: [ProfileEditComponent ]
})

export class ProfileEditModule{}