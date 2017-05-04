import { Routes, RouterModule }  from '@angular/router';
import { MapModalComponent } from './mapmodal.component';

const routes: Routes = [
  {
    path: '',
    component: MapModalComponent
  }
];

export const routing = RouterModule.forChild(routes);