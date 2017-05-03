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
      { path: 'login', loadChildren: 'app/pages/login/login.module#LoginModule'},
      { path: 'company/:name', loadChildren: 'app/pages/company/company.module#CompanyModule'},
      { path: 'profile', loadChildren: 'app/pages/profile/profile.module#ProfileModule'},
      { path: 'komunikat_single/:id_komunikat', loadChildren: 'app/pages/komunikat-single/komunikat-single.module#KomunikatSingleModule'},
      { path: 'mapmodal/:id_komunikat', loadChildren: 'app/pages/mapmodal/mapmodal.module#MapModalModule'},
      { path: 'add_message/:message_type', loadChildren: 'app/pages/add-message/add-message.module#AddMessageModule'},
      { path: 'edit_message/:message_id', loadChildren: 'app/pages/add-message/add-message.module#AddMessageModule'},
      { path: 'favourites', loadChildren: 'app/pages/favourites/favourites.module#FavouritesModule'},
      { path: 'search', loadChildren: 'app/pages/search/search.module#SearchModule'}
    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);