import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { ProfileComponent } from './profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { routing } from './profile.routing';
import { MdTabsModule } from '@angular2-material/tabs';
import { MessagesModule } from '../messages/messages.module';
import { NgaModule } from '../../theme/nga.module';

@NgModule({
  imports: [
    CommonModule,
    MdTabsModule,
    routing,
    MessagesModule,
    FormsModule,
    NgaModule,
    ReactiveFormsModule
  ],
  declarations: [
    ProfileComponent
  ]
})
export  class ProfileModule {}
