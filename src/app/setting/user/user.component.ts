import { Component, OnInit, Inject } from '@angular/core';
import { User } from '../user.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  userArray;

  search;

  constructor(
    @Inject('userService') private userService
  ) {}

  ngOnInit() {
    // this.dp.Instance.record.getList('users').subscribe(val => {
    //   console.log(val);
    //   this.userArray = val;
    // });
    // this.userService.userList.subscribe(val => {
    //   console.log(val);
    //   this.userArray = val;
    // });

    // this.userService.client.rpc.make('search-user-for-name', 'hello', (error, data) => {
    //   console.log(`RPC的结果：${data}`);
    // });
    this.userService.getAllUser(data => {
      console.log('全部用户数据', data);
      this.userArray = data;
    });
  }

  goSearch(userName: Observable<any>) {
    console.log(userName);
  }

}
