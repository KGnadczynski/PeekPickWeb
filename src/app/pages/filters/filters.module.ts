import { NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FiltersComponent } from './filters.component';
import { routing } from './filters.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CollapseModule } from 'ng2-bootstrap/ng2-bootstrap';
import { NouisliderModule } from 'ng2-nouislider';
import { MdCheckbox } from '@angular2-material/checkbox';

@NgModule({
    imports: [
        CommonModule,
        routing,
        FormsModule,
        ReactiveFormsModule,
        CollapseModule,
        NouisliderModule
    ],
    declarations: [
        FiltersComponent,
        MdCheckbox
    ],
    providers: [
    ],
    exports: [ FiltersComponent ]
})

export class FiltersModule {}