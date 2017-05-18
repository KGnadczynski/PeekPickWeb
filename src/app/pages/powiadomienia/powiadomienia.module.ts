import { NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { routing } from './powiadomienia.routes';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PowiadomieniaComponent } from './powiadomienia.component';
import { InfiniteScrollModule } from 'angular2-infinite-scroll';

@NgModule({
    imports: [
        CommonModule,
        routing,
        FormsModule,
        InfiniteScrollModule,
        ReactiveFormsModule
    ],
    declarations: [ PowiadomieniaComponent ]
})

export class PowiadomieniaModule{}