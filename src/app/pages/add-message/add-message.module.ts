import { NgModule, ApplicationRef } from '@angular/core';
import { routing } from './add-message.routing';
import { FormsModule } from "@angular/forms";
import { CommonModule } from '@angular/common';
import { AddMessageComponent } from './add-message.component';

import { ModalModule } from 'ng2-bootstrap';
import { Daterangepicker } from 'ng2-daterangepicker';
import { CollapseModule } from 'ng2-bootstrap/ng2-bootstrap';
import { NgaModule } from '../../theme/nga.module';
import { AgmCoreModule } from 'angular2-google-maps/core';

@NgModule({
    imports: [
        CommonModule,
        routing,
        ModalModule.forRoot(),
        FormsModule,
        Daterangepicker,
        AgmCoreModule,
        NgaModule,
        CollapseModule
    ],
    providers: [

    ],
    declarations: [
        AddMessageComponent
    ]
})

export class AddMessageModule {}