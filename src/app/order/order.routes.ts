import { RouterModule, Routes } from '@angular/router';
import { OrderComponent } from './order/order.component';
import { AuthGuard } from '../auth-guard.service';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NewOrderComponent } from './new-order/new-order.component';

export const routes: Routes = [{
        path: 'order',
        component: OrderComponent,
        // canActivate: [AuthGuard]
    }, {
        path: 'order',
        component: SidebarComponent,
        outlet: 'sidebar'
    }, {
        path: 'neworder',
        component: NewOrderComponent,
    }];

export const routing = RouterModule.forChild(routes);
