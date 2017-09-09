import { Routes, RouterModule }  from '@angular/router';
import { Pages } from './pages.component';
import { ChangePasswordTokenComponent } from './change-password-token/change-password-token.component';
import { ModuleWithProviders } from '@angular/core';
// noinspection TypeScriptValidateTypes

// export function loadChildren(path) { return System.import(path); };

export const routes: Routes = [
  {
    path: 'pages',
    component: Pages,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', loadChildren: 'app/pages/home/home.module#HomeModule' },
      { path: 'komunikat', loadChildren: 'app/pages/komunikat/komunikat.module#KomunikatModule' },
      { path: 'kulturairozrywka/:id', loadChildren: 'app/pages/trade/trade.module#TradeModule' },
      { path: 'gastronomiaizycienocne/:id', loadChildren: 'app/pages/trade/trade.module#TradeModule' },
      { path: 'zakupymale/:id', loadChildren: 'app/pages/trade/trade.module#TradeModule' },
      { path: 'zakupyduze/:id', loadChildren: 'app/pages/trade/trade.module#TradeModule' },
      { path: 'uslugidlaciala/:id', loadChildren: 'app/pages/trade/trade.module#TradeModule' },
      { path: 'uslugiinne/:id', loadChildren: 'app/pages/trade/trade.module#TradeModule' },
      { path: 'sportiturystyka/:id', loadChildren: 'app/pages/trade/trade.module#TradeModule' },
      { path: 'register', loadChildren: 'app/pages/register/register.module#RegisterModule'},
      { path: 'login', loadChildren: 'app/pages/login/login.module#LoginModule'},
      { path: 'company/:name', loadChildren: 'app/pages/company/company.module#CompanyModule'},
      { path: 'profile', loadChildren: 'app/pages/profile/profile.module#ProfileModule'},
      { path: 'komunikat_single/:id_komunikat', loadChildren: 'app/pages/komunikat-single/komunikat-single.module#KomunikatSingleModule'},
      { path: 'mapmodal/:id_komunikat', loadChildren: 'app/pages/mapmodal/mapmodal.module#MapModalModule'},
      { path: 'add_message/:message_type', loadChildren: 'app/pages/add-message/add-message.module#AddMessageModule'},
      { path: 'edit_message/:message_id', loadChildren: 'app/pages/add-message/add-message.module#AddMessageModule'},
      { path: 'favourites', loadChildren: 'app/pages/favourites/favourites.module#FavouritesModule'},
      { path: 'powiadomienia', loadChildren: 'app/pages/powiadomienia/powiadomienia.module#PowiadomieniaModule'},
      { path: 'change-password', loadChildren: 'app/pages/change-password/change-password.module#ChangePasswordModule'}
      // { path: 'tokens/value/:token', loadChildren: 'app/pages/change-password-token/change-password-token.module#ChangePasswordTokenModule'},
    ]
  },
  {
    path: 'tokens/value/:token',
    component: ChangePasswordTokenComponent
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);