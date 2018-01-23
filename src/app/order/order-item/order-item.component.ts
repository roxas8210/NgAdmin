import { Component, OnInit, Input, Inject, Output, EventEmitter } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd';
import { Router } from '@angular/router';
import { Order } from '../order.service';

@Component({
  selector: 'app-order-item',
  templateUrl: './order-item.component.html',
  styleUrls: ['./order-item.component.css']
})
export class OrderItemComponent implements OnInit {

  @Input() order;
  @Output() removeUser: EventEmitter<string> = new EventEmitter<string> ();

  companyObj;

  userId;

  constructor(
    @Inject('modal') private modal: NzModalService,
    @Inject('orderService') private orderService: Order,
    private router: Router
  ) { }

  ngOnInit() {
    const companyId = this.order.companyId;
    this.orderService.getCompany(companyId).subscribe(val => {
      console.log('company信息', val);
      this.companyObj = val;
    });
  }

  onDelete() {
    this.removeUser.emit(this.userId);
  }

  onUpdate() {
    this.router.navigate(['setting/user/new', {
      type: 'edit',
      id: this.userId
    }]);
  }

}
