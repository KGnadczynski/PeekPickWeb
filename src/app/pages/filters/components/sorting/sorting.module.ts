import { NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { SortingComponent } from './sorting.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
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