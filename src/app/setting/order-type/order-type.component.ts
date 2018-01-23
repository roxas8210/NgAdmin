import { Component, OnInit, ElementRef, Inject } from '@angular/core';
import { Type } from '../../model/order-type.model';
import { SendType } from '../../model/send-type.model';
import { NzMessageService } from 'ng-zorro-antd';
import { Esuser } from '../es-user.service';

@Component({
  selector: 'app-order-type',
  templateUrl: './order-type.component.html',
  styleUrls: ['./order-type.component.css']
})
export class OrderTypeComponent implements OnInit {

  constructor(
    private _message: NzMessageService,
    @Inject('userService') private userService: Esuser
  ) { }

  addStatus: Boolean = false;

  data: Type[] = [];

  mainType: string;

  subTypes: Array<string> = [];

  inputVisible: Boolean = false;

  inputValue = '';

  ngOnInit() {
  }

  addType(): void {
    console.log('增加');
    this.addStatus = !this.addStatus;
    console.log(this.addStatus);
  }

  typeSubmit(): void {
    if (this.mainType === undefined) {
      this._message.create('error', '必须填写主类型');
    } else {
      const sendType: SendType = {
        mainType: this.mainType,
        subType: JSON.stringify(this.subTypes)
      };
      const subTypeObj = {};
      this.subTypes.forEach(val => {
        Array.prototype.push.call(subTypeObj, val);
      });
      const newType: Type = {
        mainType: this.mainType,
        subType: subTypeObj
      };
      console.log('提交', newType);
      this.data.push(newType);
      console.log(this.data);
      this.userService.setOrderType(newType).subscribe(val => {
        console.log(val);
      });
      this.addStatus = !this.addStatus;
    }
  }

  showInput(): void {
    this.inputVisible = true;
  }

  handleInputConfirm(): void {
    if (this.inputValue) {
        this.subTypes.push(this.inputValue);
    }
    this.inputValue = '';
    this.inputVisible = false;
  }

  handleClose(removedTag: any): void {
    this.subTypes = this.subTypes.filter(tag => tag !== removedTag);
  }
}
