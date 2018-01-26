import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderComponent } from './order/order.component';
import { routing } from './order.routes';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NewOrderComponent } from './new-order/new-order.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PipeModule } from '../pipe/pipe.module';

import { NgZorroAntdModule } from 'ng-zorro-antd';
import { Deepstream } from '../deepstream.service';
import { Order } from './order.service';
import { Esuser } from '../setting/es-user.service';
import { OrderItemComponent } from './order-item/order-item.component';
import { CompanyModule } from '../company/company.module';
import { OrderAccountComponent } from './order-account/order-account.component';

@NgModule({
  imports: [
    CommonModule,
    routing,
    NgZorroAntdModule,
    ReactiveFormsModule,
    FormsModule,
    PipeModule,
    CompanyModule
  ],
  declarations: [
    OrderComponent,
    SidebarComponent,
    NewOrderComponent,
    OrderItemComponent,
    OrderAccountComponent
  ],
  providers: [{
    provide: 'deepstream',
    useClass: Deepstream
  }, {
    provide: 'orderService',
    useClass: Order
  }, {
    provide: 'userService',
    useClass: Esuser
  }]
})
export class OrderModule { }
