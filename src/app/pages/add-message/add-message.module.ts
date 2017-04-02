import { NgModule, ApplicationRef } from '@angular/core';
import { routing } from './add-message.routing';

import { AddMessageComponent } from './add-message.component';

import { ModalModule } from 'ng2-bootstrap';

@NgModule({
    imports: [
        routing,
        ModalModule.forRoot()
    ],
    providers: [

    ],
    declarations: [
        AddMessageComponent
    ]
})

export class AddMessageModule {}