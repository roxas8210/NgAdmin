import { Component, OnInit, Input, Inject, OnDestroy, Output, EventEmitter } from '@angular/core';
import { User } from '../../model/user.model';
import { NzModalService } from 'ng-zorro-antd';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-item',
  templateUrl: './user-item.component.html',
  styleUrls: ['./user-item.component.css']
})
export class UserItemComponent implements OnInit, OnDestroy {

  @Input() user;
  @Output() removeUser: EventEmitter<string> = new EventEmitter<string> ();

  userObj: User;

  userId;

  constructor(
    @Inject('modal') private modal: NzModalService,
    @Inject('userService') private userServ,
    private router: Router
  ) { }

  ngOnInit() {
    this.userObj = this.user._source;
    this.userId = this.user._id;
  }

  ngOnDestroy() {
    console.log(`onDestroy`);
  }

  onDelete() {
    this.removeUser.emit(this.userId);
  }

  onUpdate() {
    // this.router.navigate()
  }

}
