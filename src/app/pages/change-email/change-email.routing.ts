import { Routes, RouterModule } from '@angular/router';
import { ChangeEmailComponent } from './change-email.component';

const routes: Routes = [
    {
        path: '',
        component: ChangeEmailComponent
    }
];

export const routing = RouterModule.forChild(routes);