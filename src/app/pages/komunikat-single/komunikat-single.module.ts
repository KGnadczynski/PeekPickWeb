import { NgModule, ApplicationRef  } from '@angular/core';
import { CommonModule }  from '@angular/common';
import { NgaModule } from '../../theme/nga.module';
import { routing } from './komunikat-single.routing';
import { MdTabsModule } from '@angular2-material/tabs';

import { FormsModule } from '@angular/forms';
import { KomunikatSingleComponent } from './komunikat-single.component';

import { ModalModule } from 'ng2-bootstrap';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    MdTabsModule,
    NgaModule,
    routing,
    ModalModule.forRoot()
  ],
  providers: [],
  declarations: [KomunikatSingleComponent]
})

export class KomunikatSingleModule {}
