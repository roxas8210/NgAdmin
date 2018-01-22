import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderComponent } from './order/order.component';
import { routing } from './order.routes';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NewOrderComponent } from './new-order/new-order.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgZorroAntdModule } from 'ng-zorro-antd';
import { Deepstream } from '../deepstream.service';
import { Order } from './order.service';

@NgModule({
  imports: [
    CommonModule,
    routing,
    NgZorroAntdModule,
    ReactiveFormsModule,
    FormsModule
  ],
  declarations: [OrderComponent, SidebarComponent, NewOrderComponent],
  providers: [{
    provide: 'deepstream',
    useClass: Deepstream
  }, {
    provide: 'orderService',
    useClass: Order
  }]
})
export class OrderModule { }
