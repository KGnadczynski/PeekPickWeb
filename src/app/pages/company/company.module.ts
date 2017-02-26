import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { CompanyComponent} from './company.component';
import { NgaModule } from '../../theme/nga.module';
import { routing } from './company.routing';
import { MdTabsModule } from '@angular2-material/tabs';
@NgModule({
  imports: [
    CommonModule,
    MdTabsModule,
    NgaModule,
    routing
  ],
  declarations: [
    CompanyComponent
  ]
})
export  class CompanyModule {}
