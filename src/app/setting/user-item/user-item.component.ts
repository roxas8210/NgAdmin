import { Component, OnInit, Input, Inject, OnDestroy } from '@angular/core';
import { User } from '../../model/user.model';
import { NzModalService } from 'ng-zorro-antd';

@Component({
  selector: 'app-user-item',
  templateUrl: './user-item.component.html',
  styleUrls: ['./user-item.component.css']
})
export class UserItemComponent implements OnInit, OnDestroy {

  @Input() user: string;

  userObj: User;

  constructor(
    @Inject('modal') private modal: NzModalService,
    @Inject('userService') private userServ
  ) { }

  ngOnInit() {
    this.userServ.client.record.getRecord(this.user).subscribe(val => {
      console.log(val);
      this.userObj = val;
    });
  }

  ngOnDestroy() {
    console.log(`onDestroy`);
  }

  onDelete() {
    const that = this;
    this.modal.confirm({
      title: '您是否确认要删除此用户？',
      content: '<b>删除后该用户数据无法恢复，请再三确认。</b>',
      onOk() {
        const record = that.userServ.client.record.getRecord(that.user);
        record.on('delete', val => {
          const list = that.userServ.userList;
          list.on('entry-removed', res => {
            console.log('entry is removed', res);
            that.modal.success({
              title: 'success',
              content: '成功删除一位用户'
            });
          });
          list.removeEntry(that.user);
        });
        record.delete();
      },
      onCancel() {
      }
    });
  }

}
