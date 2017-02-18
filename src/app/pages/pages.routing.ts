import { Routes, RouterModule }  from '@angular/router';
import { Pages } from './pages.component';
// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: 'pages',
    component: Pages,
    children: [
      { path: '', redirectTo: 'komunikat', pathMatch: 'full' },
      //{ path: 'components', loadChildren: () => System.import('./components/components.module') }
      { path: 'komunikat',  loadChildren: () => System.import('./komunikat/komunikat.module.ts') },
      { path: 'kulturairozrywka',  loadChildren: () => System.import('./kulturairozrywka/kulturairozrywka.module.ts') },
      {
        path: 'login',
        loadChildren: () => System.import('./login/login.module')
      },
      {
        path: 'register',
        loadChildren: () => System.import('./register/register.module')
      },
      {
        path: 'emailconfirm',
        loadChildren: () => System.import('./emailconfirm/emailconfirm.module')
      }
    ]
  }
];

export const routing = RouterModule.forChild(routes);
