import { NgModule, ApplicationRef  } from '@angular/core';
import { CommonModule }  from '@angular/common';
import { NgaModule } from '../../theme/nga.module';
import { routing } from './komunikat-single.routing';
import { FormsModule } from '@angular/forms';
import { KomunikatSingleComponent } from './komunikat-single.component';
import { ModalModule } from 'ng2-bootstrap';
import { MomentModule } from 'angular2-moment';
import { MessagesModule } from '../messages/messages.module';
import { ShareButtonsModule } from 'ngx-sharebuttons';
import { HaversineService } from 'ng2-haversine';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    NgaModule,
    routing,
    ModalModule.forRoot(),
    MomentModule,
    ShareButtonsModule.forRoot(),
    MessagesModule
  ],
  providers: [HaversineService],
  declarations: [KomunikatSingleComponent]
})

export class KomunikatSingleModule {}
