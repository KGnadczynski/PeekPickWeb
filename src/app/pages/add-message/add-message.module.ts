import { NgModule, ApplicationRef } from '@angular/core';
import { routing } from './add-message.routing';
import { FormsModule } from "@angular/forms";

import { AddMessageComponent } from './add-message.component';

import { ModalModule } from 'ng2-bootstrap';
import { Daterangepicker } from 'ng2-daterangepicker';

@NgModule({
    imports: [
        routing,
        ModalModule.forRoot(),
        FormsModule,
        Daterangepicker
    ],
    providers: [

    ],
    declarations: [
        AddMessageComponent
    ]
})

export class AddMessageModule {}