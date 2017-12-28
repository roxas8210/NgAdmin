import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderComponent } from './order/order.component';
import { routing } from './order.routes';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NewOrderComponent } from './new-order/new-order.component';

import { NgZorroAntdModule } from 'ng-zorro-antd';
import { Deepstream } from '../deepstream.service';

@NgModule({
  imports: [
    CommonModule,
    routing,
    NgZorroAntdModule
  ],
  declarations: [OrderComponent, SidebarComponent, NewOrderComponent],
  providers: [{
    provide: 'deepstream',
    useClass: Deepstream
  }]
})
export class OrderModule { }
