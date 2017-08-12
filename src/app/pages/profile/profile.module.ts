import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile.component';
import { routing } from './profile.routing';
import { MdTabsModule } from '@angular2-material/tabs';
import { NgaModule } from '../../theme/nga.module';
import { ProfileEditModule } from './components/profile-edit/profile-edit.module';
import { ProfileAdditionalModule } from './components/profile-additional/profile-additional.module';
import { ProfileBranchesModule } from './components/profile-branches/profile-branches.module';
import { ProfileMessagesModule } from './components/profile-messages/profile-messages.module';
import {ImageCropperComponent, CropperSettings} from 'ng2-img-cropper';
import { ModalModule } from 'ng2-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    routing,
    MdTabsModule,
    NgaModule,
    ProfileEditModule,
    ProfileAdditionalModule,
    ProfileBranchesModule,
    ProfileMessagesModule,
    ModalModule.forRoot() 
  ],
  declarations: [
    ProfileComponent,ImageCropperComponent
  ]
})

export class ProfileModule {}
