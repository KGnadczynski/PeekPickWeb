import { NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FiltersComponent } from './filters.component';
import { routing } from './filters.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CollapseModule } from 'ng2-bootstrap/ng2-bootstrap';
import { NouisliderModule } from 'ng2-nouislider';
import { AgmCoreModule } from '@agm/core';

@NgModule({
    imports: [
        CommonModule,
        routing,
        FormsModule,
        ReactiveFormsModule,
        CollapseModule,
        NouisliderModule,
        AgmCoreModule,
    ],
    declarations: [
        FiltersComponent
    ],
    providers: [
    ],
    exports: [ FiltersComponent ]
})

export class FiltersModule {}