import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { CompanyComponent} from './company.component';
import { NgaModule } from '../../theme/nga.module';
import { routing } from './company.routing';
import { MdTabsModule } from '@angular2-material/tabs';
import { ResourceModule } from 'ng2-resource-rest';

@NgModule({
  imports: [
    CommonModule,
    MdTabsModule,
    NgaModule,
    routing,
    ResourceModule.forRoot()
  ],
  declarations: [
    CompanyComponent
  ]
})

export  class CompanyModule {}
