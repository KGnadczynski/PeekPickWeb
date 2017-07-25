import { NgModule } from '@angular/core';
import { routing } from './add-message.routing';
import { FormsModule } from "@angular/forms";
import { CommonModule } from '@angular/common';
import { AddMessageComponent } from './add-message.component';
import { ModalModule } from 'ng2-bootstrap';
import { Daterangepicker } from 'ng2-daterangepicker';
import { CollapseModule } from 'ng2-bootstrap/ng2-bootstrap';
import { NgaModule } from '../../theme/nga.module';
import { AgmCoreModule } from '@agm/core';
import { MultiselectDropdownModule } from 'angular-2-dropdown-multiselect';
import { ToastyModule } from 'ng2-toasty';
import { ConfirmationPopoverModule } from 'angular-confirmation-popover';

@NgModule({
    imports: [
        CommonModule,
        routing,
        ModalModule.forRoot(),
        MultiselectDropdownModule,
        FormsModule,
        Daterangepicker,
        AgmCoreModule,
        NgaModule,
        CollapseModule,
        ToastyModule.forRoot(),
        ConfirmationPopoverModule.forRoot({
            confirmText: 'usuń',
            cancelText: 'anuluj'
    })
    ],
    providers: [],
    declarations: [
        AddMessageComponent
    ]
})

export class AddMessageModule {}