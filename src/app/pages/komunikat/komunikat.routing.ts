import { Routes, RouterModule }  from '@angular/router';
import { KomunikatComponent } from './komunikat.component.ts';

const routes: Routes = [
  {
    path: '',
    component: KomunikatComponent
  }
];

export const routing = RouterModule.forChild(routes);
