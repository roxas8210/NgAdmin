import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user/user.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NewUserComponent } from './new-user/new-user.component';

export const routes: Routes = [{
    path: 'setting',
    children: [{
        path: 'user',
        children: [{
            path: 'new',
            component: NewUserComponent
        }, {
            path: '',
            component: UserComponent
        }]
    }]
}, {
    path: 'setting',
    component: SidebarComponent,
    outlet: 'sidebar'
}];

export const routing = RouterModule.forChild(routes);
