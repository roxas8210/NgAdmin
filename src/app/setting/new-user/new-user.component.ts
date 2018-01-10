import { Component, OnInit, Inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators
} from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { User } from '../../model/user.model';
import { Department } from '../../model/department.model';
import { Role } from '../../model/role.data';

import { NzModalService } from 'ng-zorro-antd';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css']
})
export class NewUserComponent implements OnInit {

  userForm: FormGroup;

  depart = Department;

  roles = Role;

  constructor(
    private fb: FormBuilder,
    @Inject('modal') private confirmServ: NzModalService,
    @Inject('userService') private userServ,
    private router: Router,
    private route: ActivatedRoute
  ) {
    // this.userForm = this.fb.group(new User());
    this.userForm = this.fb.group({
      username: ['', [Validators.required]],
      department: ['', [Validators.required]],
      role: ['', [Validators.required]]
    });
  }

  ngOnInit() {
    // this.route.paramMap.switchMap((val: ParamMap) => Rx.Observable.interval(1000)).subscribe(id => {
    //   console.log('订阅的id', id);
    // });
    // this.route.paramMap.subscribe(val => {
    //   console.log(val);
    // });
    this.route.paramMap.forEach(val => {
      console.log('foreach返回值：', val);
      return val;
    }).then(val => {
      console.log('promise返回值：', val);
    });
  }

  getFormControl(name) {
    return this.userForm.controls[name];
  }

  submitForm($event: MouseEvent, value) {
    console.log(this.userForm);
    const that = this;
    this.userServ.setUsers(this.userForm.value).subscribe(data => {
      if (data.result == 'created') {
        this.confirmServ.success({
          title: 'success',
          content: '成功添加一位用户',
          onOk() {
            that.router.navigate([{
              outlets: {
                primary: 'setting/user',
                sidebar: 'setting'
              }
            }]);
          }
        });
      }
    });
  }

}
