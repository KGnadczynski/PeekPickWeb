import { NgModule } from '@angular/core';
import { CommonModule }  from '@angular/common';
import { routing } from './company-info.routing';
// import { NgaModule } from '../../../theme/nga.module';
import { CompanyInfoComponent } from './company-info.component';

@NgModule({
    imports: [routing, CommonModule],
    declarations: [CompanyInfoComponent],
    exports: [CompanyInfoComponent]
})

export class CompanyInfoModule{}