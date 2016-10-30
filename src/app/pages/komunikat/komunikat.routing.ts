import { Routes, RouterModule }  from '@angular/router';
import { KomunikatComponent } from './komunikat.component.ts';
import {Komunikat} from "./komunikat";

const routes: Routes = [
  {
    path: '',
    component: KomunikatComponent
  }
];

export const routing = RouterModule.forChild(routes);
