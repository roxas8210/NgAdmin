import { Component, OnInit, Inject } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { FormControl } from '@angular/forms';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/switchMap';

import { NzModalService } from 'ng-zorro-antd';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  orderArray = [];

  search = new FormControl();

  constructor(
    @Inject('modal') private modal: NzModalService,
    @Inject('orderService') private orderService
  ) {}

  ngOnInit() {
    this.orderService.getAllOrders().subscribe(val => {
      this.orderArray = val;
      console.log(val);
    });
    this.search.valueChanges.debounceTime(1000).switchMap(val => {
      return this.orderService.searchUsers(val);
    }).subscribe(val => {
      console.log('搜索到的用户：', val);
    });
  }

  goSearch(userName: Observable<any>) {
    console.log(userName);
  }

  onDelete(userId) {
    const that = this;
    console.log(userId);
    this.modal.confirm({
      title: '您是否确认要删除此用户？',
      content: '<b>删除后该用户数据无法恢复，请再三确认。</b>',
      onOk() {
        that.orderService.removeUser(userId).subscribe(result => {
          console.log('删除结果', result);
          if (result.result == 'deleted') {
            that.modal.success({
              title: 'success',
              content: '成功删除一位用户'
            });
            const userArray_cp = that.orderArray;
            userArray_cp.map((element, index) => {
              if (element._id == userId) {
                that.orderArray.splice(index, 1);
              }
            });
            // that.ngOnInit();
          }
        });
      },
      onCancel() {
      }
    });
  }

}
