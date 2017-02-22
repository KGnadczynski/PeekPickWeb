import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { CompanyComponent} from './company.component';
import { NgaModule } from '../../theme/nga.module';
import { routing } from './company.routing';

@NgModule({
  imports: [
    CommonModule,
    NgaModule,
    routing
  ],
  declarations: [
    CompanyComponent
  ]
})
export  class CompanyModule {}
