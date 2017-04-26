import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { ProfileComponent } from './profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { routing } from './profile.routing';
import { MdTabsModule } from '@angular2-material/tabs';
import { ImageUploadModule } from 'angular2-image-upload';
import { MessagesModule } from '../messages/messages.module';

@NgModule({
  imports: [
    CommonModule,
    MdTabsModule,
    ImageUploadModule.forRoot(),
    routing,
    MessagesModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    ProfileComponent
  ]
})
export  class ProfileModule {}
