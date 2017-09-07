import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';

import { routing }       from './pages.routing';
import { NgaModule } from '../theme/nga.module';

import { Pages } from './pages.component';
import { ChangePasswordTokenComponent } from './change-password-token/change-password-token.component';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  imports: [CommonModule, NgaModule, routing, FormsModule, ReactiveFormsModule],
  declarations: [Pages, ChangePasswordTokenComponent],
})

export class PagesModule {
}
