import { Routes, RouterModule }  from '@angular/router';
import { TradeComponent } from './trade.component';

const routes: Routes = [
  {
    path: '',
    component: TradeComponent
  }
];

export const routing = RouterModule.forChild(routes);