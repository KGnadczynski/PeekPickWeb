import { Routes, RouterModule } from '@angular/router';
import { AddMessageComponent } from './add-message.component';

const routes: Routes = [
    {
        path: '',
        component: AddMessageComponent
    }
];

export const routing = RouterModule.forChild(routes);