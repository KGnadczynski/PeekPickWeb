import { NgModule } from '@angular/core';
import { CommonModule }  from '@angular/common';
import { routing } from './search.routing';
import { ModalModule } from 'ng2-bootstrap';
import { FormsModule } from '@angular/forms';

import { SearchComponent } from './search.component';
import { MultiselectDropdownModule } from 'angular-2-dropdown-multiselect';
import { MdSliderModule } from "@angular2-material/slider";
import { CollapseModule } from 'ng2-bootstrap/ng2-bootstrap';

@NgModule({
    imports:[ CommonModule, routing, CollapseModule, FormsModule, ModalModule.forRoot(), MultiselectDropdownModule,
    MdSliderModule ],
    declarations: [ SearchComponent]
})

export class SearchModule{}