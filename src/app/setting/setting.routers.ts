import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user/user.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NewUserComponent } from './new-user/new-user.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { OrderTypeComponent } from './order-type/order-type.component';

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
    }, {
        path: 'user/:id',
        component: EditUserComponent
    }, {
        path: 'order-type',
        component: OrderTypeComponent
    }]
}, {
    path: 'setting',
    component: SidebarComponent,
    outlet: 'sidebar'
}];

export const routing = RouterModule.forChild(routes);
