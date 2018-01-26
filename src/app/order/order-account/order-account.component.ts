import { Component, OnInit, Inject } from '@angular/core';
import { Order } from '../../model/data-model/order.model';
import { OrderTransfer } from '../../model/order-transfer.model';

@Component({
  selector: 'app-order-account',
  templateUrl: './order-account.component.html',
  styleUrls: ['./order-account.component.css']
})
export class OrderAccountComponent implements OnInit {

  orderList: OrderTransfer[] = [];

  constructor(
    @Inject('orderService') private orderService
  ) { }

  ngOnInit() {
    this.orderService.getAllOrders().subscribe(val => {
      console.log('全部单：', val);
      const orderT = [];
      val.forEach(v => {
        const orderTrans = {
          title: v.companyId
        };
        orderT.push(v);
      });
      this.orderList = orderT;
    });
  }

}
