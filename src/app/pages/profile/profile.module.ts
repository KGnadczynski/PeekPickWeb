import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { ProfileComponent } from './profile.component';
import { routing } from './profile.routing';
import { MdTabsModule } from '@angular2-material/tabs';

@NgModule({
  imports: [
    CommonModule,
    MdTabsModule,
    routing
  ],
  declarations: [
    ProfileComponent
  ]
})
export  class ProfileModule {}
