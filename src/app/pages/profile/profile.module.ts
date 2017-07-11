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
import { ConfirmationPopoverModule } from 'angular-confirmation-popover';

// import { ProfileEditModule } from './components/profile-edit/profile-edit.module';

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
    CollapseModule,
    // ProfileEditModule
    ConfirmationPopoverModule.forRoot({
      confirmText: 'usuń',
      cancelText: 'anuluj'
    })
  ],
  declarations: [
    ProfileComponent
  ]
})
export  class ProfileModule {}
