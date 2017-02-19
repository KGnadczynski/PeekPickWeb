import { Routes, RouterModule }  from '@angular/router';
import { EmailConfirmComponent } from './emailconfirm.component';

const routes: Routes = [
  {
    path: '',
    component: EmailConfirmComponent
  }
];

export const routing = RouterModule.forChild(routes);
