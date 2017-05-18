import { Routes, RouterModule }  from '@angular/router';
import { PowiadomieniaComponent } from './powiadomienia.component';

const routes: Routes = [
  {
    path: '',
    component: PowiadomieniaComponent
  }
];

export const routing = RouterModule.forChild(routes);