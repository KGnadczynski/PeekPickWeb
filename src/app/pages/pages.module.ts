import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';

import { routing }       from './pages.routing';
import { NgaModule } from '../theme/nga.module';

import { Pages } from './pages.component';
import { ChangePasswordTokenComponent } from './change-password-token/change-password-token.component';
import { ChangeEmailComponent } from '../pages/change-email/change-email.component';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  imports: [CommonModule, NgaModule, routing, FormsModule, ReactiveFormsModule],
  declarations: [Pages, ChangePasswordTokenComponent, ChangeEmailComponent],
})

export class PagesModule {
}
