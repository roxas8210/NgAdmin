import { Component, OnInit, Inject } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Order } from '../order.service';
import { forEach } from '../../../../node_modules/_@angular_router@5.1.3@@angular/router/src/utils/collection';

@Component({
  selector: 'app-new-order',
  templateUrl: './new-order.component.html',
  styleUrls: ['./new-order.component.css']
})
export class NewOrderComponent implements OnInit {

  current = 0;

  companyForm: FormGroup;

  orderForm: FormGroup;

  designers;

  programmers;

  saless;

  constructor(
    private _message: NzMessageService,
    private fb: FormBuilder,
    @Inject('orderService') private orderService: Order
  ) {
    this.companyForm = this.fb.group({
      companyName: ['', [Validators.required]],
      legalPerson: ['', [Validators.required]],
      responsiblePerson: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      email: ['', [Validators.required]],
      fax: ['', [Validators.required]],
      address: ['', [Validators.required]],
      website: ['', [Validators.required]]
    });
    this.orderForm = this.fb.group({
      orderType: ['', [Validators.required]],
      price: [5800, [Validators.required]],
      designer: ['', [Validators.required]],
      programmer: ['', [Validators.required]],
      orderDate: ['', [Validators.required]],
      sales: ['', [Validators.required]]
    });
  }

  pre() {
    this.current -= 1;
    this.changeContent();
  }

  next() {
    this.current += 1;
    this.changeContent();
  }

  done() {
    this._message.success('done');
  }

  changeContent() {
    switch (this.current) {
      case 0: {
        break;
      }
      case 1: {
        break;
      }
      case 2: {
        break;
      }
      default: {
      }
    }
  }

  ngOnInit() {
    this.orderService.getRole('designer').subscribe(val => {
      console.log('设计师是：', val);
      const newVal = [];
      val.forEach(v => {
        newVal.push(v._source);
      });
      console.log(newVal);
      this.designers = newVal;
    });

    this.orderService.getRole('programmer').subscribe(val => {
      console.log('程序员是：', val);
      const newVal = [];
      val.forEach(v => {
        newVal.push(v._source);
      });
      console.log(newVal);
      this.programmers = newVal;
    });

    this.orderService.getRole('sales').subscribe(val => {
      console.log('业务员是：', val);
      const newVal = [];
      val.forEach(v => {
        newVal.push(v._source);
      });
      console.log(newVal);
      this.saless = newVal;
    });
  }

}
