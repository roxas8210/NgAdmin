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
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css']
})
export class NewUserComponent implements OnInit {

  userForm: FormGroup;

  depart = Department;

  roles = Role;

  type;

  id;
  
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
    const params: Observable<ParamMap> = this.route.paramMap;
    params.map((val: ParamMap) => {
      console.log('map参数：', val);
      const paramObj = {
        type: val.get('type'),
        id: val.get('id')
      };
      return paramObj;
    }).subscribe(val => {
      console.log('路由参数：', val);
      if (val.id !== null) {
        this.userServ.getUser(val.id).subscribe(data => {
          console.log('userForm:', data);
          this.type = val.type;
          this.id = val.id;
          this.userForm.setValue(data._source);
        });
      }
    });
  }

  getFormControl(name) {
    return this.userForm.controls[name];
  }

  submitForm($event: MouseEvent, value) {
    console.log(this.userForm);
    const that = this;
    if (this.type === 'edit') {
      this.userServ.updateUser(this.id, this.userForm.value).subscribe(data => {
        if (data.result == 'updated') {
          this.confirmServ.success({
            title: 'success',
            content: '成功修改一位用户',
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
    } else {
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

}
