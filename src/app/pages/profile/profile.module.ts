import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { ProfileComponent } from './profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { routing } from './profile.routing';
import { MdTabsModule } from '@angular2-material/tabs';
import { MessagesModule } from '../messages/messages.module';
import { NgaModule } from '../../theme/nga.module';
import { CollapseModule } from 'ng2-bootstrap/ng2-bootstrap';
import { Ng2TabModule } from 'ng2-tab';

@NgModule({
  imports: [
    CommonModule,
    MdTabsModule,
    routing,
    MessagesModule,
    FormsModule,
    Ng2TabModule,
    NgaModule,
    ReactiveFormsModule,
    CollapseModule
  ],
  declarations: [
    ProfileComponent
  ]
})
export  class ProfileModule {}
