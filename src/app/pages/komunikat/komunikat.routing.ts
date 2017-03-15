import { Routes, RouterModule }  from '@angular/router';
import { KomunikatComponent } from './komunikat.component.ts';
import { KomunikatSingleComponent } from './komunikat-single/komunikat-single.component';

const routes: Routes = [
  {
    path: '',
    component: KomunikatComponent
  }
];

export const routing = RouterModule.forChild(routes);
