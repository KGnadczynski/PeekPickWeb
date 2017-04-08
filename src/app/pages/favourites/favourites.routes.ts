import { Routes, RouterModule }  from '@angular/router';
import { FavouritesComponent } from './favourites.component';

const routes: Routes = [
  {
    path: '',
    component: FavouritesComponent
  }
];

export const routing = RouterModule.forChild(routes);