import { NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { SortingComponent } from './sorting.component';
import { routing } from './sorting.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        routing,
        FormsModule,
        ReactiveFormsModule
    ],
    declarations: [
        SortingComponent
    ],
    providers: [
    ],
    exports: [ SortingComponent ]
})

export class SortingModule {}