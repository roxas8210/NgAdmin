import { Component, OnInit, Inject } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Order } from '../order.service';
import { Esuser } from '../../setting/es-user.service';
import { ESResult } from '../../model/esresult.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-order',
  templateUrl: './new-order.component.html',
  styleUrls: ['./new-order.component.css']
})
export class NewOrderComponent implements OnInit {

  current = 0;

  companyForm: FormGroup;

  orderForm: FormGroup;

  orderTypes;

  subTypes = [];

  designers;

  programmers;

  saless;

  _percent = 0;

  uploadContent = '开始上传';

  constructor(
    private _message: NzMessageService,
    private fb: FormBuilder,
    @Inject('orderService') private orderService: Order,
    @Inject('userService') private userService: Esuser,
    private router: Router
  ) {
    this.companyForm = this.fb.group({
      companyName: ['', [Validators.required]],
      legalPerson: ['', [Validators.required]],
      responsiblePerson: ['', [Validators.required]],
      phone: '',
      telephone: '',
      email: '',
      fax: '',
      address: ['广东省江门市', [Validators.required]],
      website: ''
    });
    this.orderForm = this.fb.group({
      companyId: '',
      orderType: ['', [Validators.required]],
      subType: ['', [Validators.required]],
      price: [5800, [Validators.required]],
      designer: ['', [Validators.required]],
      programmer: ['', [ Validators.required]],
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
    this.current += 1;
    console.log(this.orderForm.get('subType').value);
    this.uploadContent = '正在上传，请耐心等待';
    this.orderService.setCompany(this.companyForm.value).subscribe((val: ESResult) => {
      if (val.result == 'created') {
        this.uploadContent = '公司信息已上传，正在上传单信息,请继续等待';
        this._percent = 50;
        this.orderForm.setValue({
          companyId: val._id,
          orderType: this.orderForm.get('orderType').value,
          subType: this.orderForm.get('subType').value,
          price: this.orderForm.get('price').value,
          designer: this.orderForm.get('designer').value,
          programmer: this.orderForm.get('programmer').value,
          orderDate: this.orderForm.get('orderDate').value,
          sales: this.orderForm.get('sales').value
        });
        console.log(this.orderForm.value);
        this.orderService.setOrder(this.orderForm.value).subscribe((v: ESResult) => {
          if (v.result == 'created') {
            this.uploadContent = '上传成功！';
            this._percent = 100;
            this._message.create('success', '添加成功');
            this.router.navigate(['/order']);
          }
        });
      }
    });
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

  getSubTypes() {
    const mainType = this.orderForm.get('orderType').value;
    console.log(mainType);
    if (mainType === '') {
      this._message.create('error', '请选择主类型');
    } else {
      const subMainType = this.orderTypes.filter(orderId => orderId.id == mainType);
      this.subTypes = subMainType[0].subType;
    }
  }

  ngOnInit() {
    this.userService.getAllOrderTypes().subscribe(val => {
      console.log('类型有', val);
      this.orderTypes = val;
    });
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
