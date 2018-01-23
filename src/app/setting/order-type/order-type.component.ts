import { Component, OnInit, ElementRef, Inject } from '@angular/core';
import { Type } from '../../model/order-type.model';
import { SendType } from '../../model/send-type.model';
import { NzMessageService } from 'ng-zorro-antd';
import { Esuser } from '../es-user.service';

import { NzModalService } from 'ng-zorro-antd';

@Component({
  selector: 'app-order-type',
  templateUrl: './order-type.component.html',
  styleUrls: ['./order-type.component.css']
})
export class OrderTypeComponent implements OnInit {

  constructor(
    @Inject('modal') private modal: NzModalService,
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
    this.userService.getAllOrderTypes().subscribe(val => {
      this.data = val;
    });
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
      const newType = {
        mainType: this.mainType,
        subType: this.subTypes
      };
      this.userService.setOrderType(newType).subscribe(val => {
        console.log(val);
        if (val.result == 'created') {
          const resType: Type = {
            id: val._id,
            mainType: newType.mainType,
            subType: newType.subType
          };
          this._message.create('success', '成功增加类型');
          this.data.push(resType);
          this.addStatus = !this.addStatus;
          this.mainType = undefined;
          this.subTypes = [];
        }
      });
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

  removeType(typeId) {
    const that = this;
    this.modal.confirm({
      title: '您是否确认要删除此用户？',
      content: '<b>删除后该用户数据无法恢复，请再三确认。</b>',
      onOk() {
        that.userService.removeOrderType(typeId).subscribe(val => {
          console.log(val);
          if (val.result == 'deleted') {
            that._message.create('success', '成功删除一个类型');
            that.data = that.data.filter(type => {
              return type.id !== typeId;
            });
          }
        });
      }
    });
  }
}
