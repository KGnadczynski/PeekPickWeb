import { Routes, RouterModule }  from '@angular/router';
import { KomunikatSingleComponent } from './komunikat-single.component';

const routes: Routes = [
  {
    path: '',
    component: KomunikatSingleComponent
  }
];

export const routing = RouterModule.forChild(routes);