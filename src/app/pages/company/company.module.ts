import { NgModule } from '@angular/core';
import { CommonModule }  from '@angular/common';
import { CompanyComponent} from './company.component';
import { NgaModule } from '../../theme/nga.module';
import { routing } from './company.routing';
import { MdTabsModule } from '@angular2-material/tabs';
import { ResourceModule } from 'ng2-resource-rest';

import { FormsModule } from '@angular/forms';
import { AgmCoreModule } from 'angular2-google-maps/core';

import { MessagesModule } from '../messages/messages.module';

//AIzaSyAd-dXobrRyvVELcejXArzNvt694Y1r9Ho

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    MdTabsModule,
    NgaModule,
    routing,
    ResourceModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAd-dXobrRyvVELcejXArzNvt694Y1r9Ho'
    }),
    MessagesModule
  ],
  providers: [],
  declarations: [
    CompanyComponent
  ]
})

export class CompanyModule {}
