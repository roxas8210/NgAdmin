import { Component, OnInit, Inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators
} from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { User } from '../../model/user.model';
import { Department } from '../../model/department.model';
import { Role } from '../../model/role.data';

import { NzModalService } from 'ng-zorro-antd';

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
    private router: Router
  ) {
    // this.userForm = this.fb.group(new User());
    this.userForm = this.fb.group({
      username: ['', [Validators.required]],
      department: ['', [Validators.required]],
      role: ['', [Validators.required]]
    });
  }

  ngOnInit() {
  }

  getFormControl(name) {
    return this.userForm.controls[name];
  }

  submitForm($event: MouseEvent, value) {
    console.log(this.userForm);
    // const recordName = `user/${this.userServ.client.getUid()}`;
    // const record = this.userServ.client.record.getRecord(recordName);
    // const list = this.userServ.userList;
    // record.set(this.userForm.value);
    // list.on('entry-added', res => {
    //   console.log('entry was added', res);
    //   this.confirmServ.success({
    //     title: 'success',
    //     content: '成功添加一位用户'
    //   });
    //   this.router.navigate([
    //     {
    //       outlets: {
    //         primary: 'setting/user',
    //         sidebar: 'setting'
    //       }
    //     }
    //   ]);
    // });
    // list.addEntry(recordName);
    this.userServ.setUser(this.userForm.value, data => {
      console.log(data);
      if (data.result == 'created') {
        this.confirmServ.success({
          title: 'success',
          content: '成功添加一位用户'
        });
        this.router.navigate([{
            outlets: {
              primary: 'setting/user',
              sidebar: 'setting'
            }
          }
        ]);
      }
    });
  }

  resetForm($event: MouseEvent) {
    $event.preventDefault();
    this.userForm.reset();
    // for (const key in this.userForm.controls) {
    //   this.userForm.controls[key].markAsPristine();
    // }
  }
}
