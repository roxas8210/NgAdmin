import { RouterModule, Routes } from '@angular/router';
import { OrderComponent } from './order/order.component';
import { AuthGuard } from '../auth-guard.service';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NewOrderComponent } from './new-order/new-order.component';
import { CompanyComponent } from '../company/company/company.component';
import { OrderAccountComponent } from './order-account/order-account.component';

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
    }, {
        path: 'company',
        component: CompanyComponent
    }, {
        path: 'order-account',
        component: OrderAccountComponent
    }];

export const routing = RouterModule.forChild(routes);
