import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';

export const routes: Routes = [{
    path: 'order',
    redirectTo: '/order',
    pathMatch: 'full'
}, {
    path: 'neworder',
    redirectTo: '/neworder',
    pathMatch: 'full'
}, {
    path: 'setting',
    children: [{
        path: 'user',
        redirectTo: '/setting/user',
        pathMatch: 'full'
    }]
}, {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
}];

export const routing = RouterModule.forRoot(routes);
