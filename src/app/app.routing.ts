import { Routes, RouterModule } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'pages', pathMatch: 'full' },
  { path: '**', redirectTo: 'pages/komunikat' }
];

export const routing = RouterModule.forRoot(routes, { useHash: true });
