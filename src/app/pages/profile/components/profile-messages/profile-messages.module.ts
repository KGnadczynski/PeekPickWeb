import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileMessagesComponent } from './profile-messages.component';
import { routing } from './profile-messages.routing';
import { Ng2TabModule } from 'ng2-tab';
import { MessagesModule } from '../../../messages/messages.module';

@NgModule({
    imports: [ CommonModule, routing, Ng2TabModule, MessagesModule ],
    declarations: [ ProfileMessagesComponent ],
    exports: [ ProfileMessagesComponent ]
})

export class ProfileMessagesModule {}