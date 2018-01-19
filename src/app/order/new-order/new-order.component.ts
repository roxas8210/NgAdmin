import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-order',
  templateUrl: './new-order.component.html',
  styleUrls: ['./new-order.component.css']
})
export class NewOrderComponent implements OnInit {

  current = 0;

  companyForm: FormGroup;

  orderForm: FormGroup;

  constructor(
    private _message: NzMessageService,
    private fb: FormBuilder
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
      designer: ['', [Validators.required]],
      programer: ['', [Validators.required]],
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
  }

}
