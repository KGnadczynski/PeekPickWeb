import { NgModule } from '@angular/core';
import { CommonModule }  from '@angular/common';
import { routing } from './search.routing';
import { ModalModule } from 'ng2-bootstrap';
import { FormsModule } from '@angular/forms';

import { SearchComponent } from './search.component';
import { MultiselectDropdownModule } from 'angular-2-dropdown-multiselect';
import {MdSliderModule} from "@angular2-material/slider";

@NgModule({
    imports:[ CommonModule, routing, ModalModule, FormsModule, ModalModule.forRoot(), MultiselectDropdownModule,
    MdSliderModule ],
    declarations: [ SearchComponent]
})

export class SearchModule{}