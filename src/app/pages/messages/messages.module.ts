import { NgModule } from '@angular/core';
import { InfiniteScrollModule } from 'angular2-infinite-scroll';
import { MomentModule } from 'angular2-moment';
import { CommonModule } from '@angular/common';

import { MessagesComponent } from './messages.component';
import { routing } from './messages.routing';
import {ShareButtonsModule} from 'ngx-sharebuttons';
import { NgaModule } from '../../theme/nga.module';

@NgModule({
    imports:[CommonModule, InfiniteScrollModule, MomentModule, routing, ShareButtonsModule.forRoot(), NgaModule],
    declarations: [MessagesComponent],
    exports: [MessagesComponent]
})

export class MessagesModule{}