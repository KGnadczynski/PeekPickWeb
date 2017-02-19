import { Routes, RouterModule }  from '@angular/router';
import { Pages } from './pages.component';
import { ModuleWithProviders } from '@angular/core';
// noinspection TypeScriptValidateTypes

// export function loadChildren(path) { return System.import(path); };

export const routes: Routes = [
  {
    path: 'pages',
    component: Pages,
    children: [
      { path: '', redirectTo: 'komunikat', pathMatch: 'full' },
      { path: 'komunikat', loadChildren: 'app/pages/komunikat/komunikat.module#KomunikatModule' },
      { path: 'kulturairozrywka', loadChildren: 'app/pages/kulturairozrywka/kulturairozrywka.module#KulturairozrywkaModule' },
      { path: 'register', loadChildren: 'app/pages/register/register.module#RegisterModule'},
      { path: 'login', loadChildren: 'app/pages/login/login.module#LoginModule'}

    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
