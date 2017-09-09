import { Routes, RouterModule } from '@angular/router';
import { ChangePasswordTokenComponent } from './change-password-token.component';

const routes: Routes = [
    {
        path: '',
        component: ChangePasswordTokenComponent
    }
];

export const routing = RouterModule.forChild(routes);