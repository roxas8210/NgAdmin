import { Component, OnInit, Inject } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { FormControl } from '@angular/forms';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/switchMap';

import { NzModalService } from 'ng-zorro-antd';
import { CompanySearchResult } from '../../model/combine-model/company-search-result.model';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  orderArray = [];

  searchArray = [];

  selectedIndex = 0;

  dropdownSwitcher = false;

  keyword;

  tabs = [{
    label: '最近新单',
    value: 'newly'
  }, {
    label: '搜索结果',
    value: 'result'
  }];

  search = new FormControl();

  companySearchRes: CompanySearchResult[] = [];

  constructor(
    @Inject('modal') private modal: NzModalService,
    @Inject('orderService') private orderService
  ) {}

  ngOnInit() {
    this.orderService.getNewlyOrders().subscribe(val => {
      this.orderArray = val;
      console.log(val);
    }, error => {
      console.log('订阅错误');
    });
    this.search.valueChanges.debounceTime(500).switchMap((val: string) => {
      val = val.replace(/^\s+|\s+$/g, '');
      if (val !== '' || val.length > 0) {
        return this.orderService.searchCompanys(val);
      } else {
        const empty = [];
        empty.push(new CompanySearchResult());
        return empty;
      }
    }).subscribe((val: CompanySearchResult[]) => {
      console.log('搜索到的公司：', val);
      this.dropdownSwitcher = true;
      this.companySearchRes = val;
    });
  }

  getSearchCompany(id) {
    console.log(id);
    this.orderService.getOrdersByCompanyId(id).subscribe(val => {
      console.log('关联单：', val);
      this.searchArray = val;
      this.selectedIndex = 1;
      this.keyword = this.search.value;
      this.dropdownSwitcher = false;
    });
  }

  changeTab(event) {
    console.log('change tab', event);
  }

  onDelete(userId) {
    const that = this;
    console.log(userId);
    this.modal.confirm({
      title: '您是否确认要删除？',
      content: '<b>删除后数据无法恢复，请再三确认。</b>',
      onOk() {
        that.orderService.removeUser(userId).subscribe(result => {
          console.log('删除结果', result);
          if (result.result == 'deleted') {
            that.modal.success({
              title: 'success',
              content: '成功删除!'
            });
            const userArray_cp = that.orderArray;
            userArray_cp.map((element, index) => {
              if (element._id == userId) {
                that.orderArray.splice(index, 1);
              }
            });
          }
        });
      },
      onCancel() {
      }
    });
  }

}
