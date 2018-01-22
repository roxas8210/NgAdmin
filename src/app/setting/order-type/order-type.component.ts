import { Component, OnInit, ElementRef } from '@angular/core';
import { Type } from '../../model/order-type.model';
import { SendType } from '../../model/send-type.model';

@Component({
  selector: 'app-order-type',
  templateUrl: './order-type.component.html',
  styleUrls: ['./order-type.component.css']
})
export class OrderTypeComponent implements OnInit {

  constructor() { }

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
    const sendType: SendType = {
      mainType: this.mainType,
      subType: JSON.stringify(this.subTypes)
    };
    const newType: Type = {
      mainType: this.mainType,
      subType: this.subTypes
    };
    console.log('提交', newType);
    this.data.push(newType);
    console.log(this.data);
    this.addStatus = !this.addStatus;
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
