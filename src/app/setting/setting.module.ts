import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user/user.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { routing } from './setting.routers';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NewUserComponent } from './new-user/new-user.component';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { UserItemComponent } from './user-item/user-item.component';
import { Deepstream } from '../deepstream.service';

import { User } from './user.service';
import { Esuser } from './es-user.service';
import { EditUserComponent } from './edit-user/edit-user.component';

@NgModule({
  imports: [
    CommonModule,
    routing,
    NgZorroAntdModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule
  ],
  declarations: [UserComponent, SidebarComponent, NewUserComponent, UserItemComponent, EditUserComponent],
  providers: [{
    provide: 'userService',
    // useClass: User
    useClass: Esuser
  }]
})
export class SettingModule { }
