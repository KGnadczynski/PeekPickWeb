import { Routes, RouterModule }  from '@angular/router';
import { KulturairozrywkaComponent } from './kulturairozrywka.component';

const routes: Routes = [
  {
    path: '',
    component: KulturairozrywkaComponent
  }
];

export const routing = RouterModule.forChild(routes);