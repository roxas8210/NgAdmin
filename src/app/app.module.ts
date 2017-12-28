import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgZorroAntdModule, NzModalService } from 'ng-zorro-antd';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { OrderModule } from './order/order.module';
import { SettingModule } from './setting/setting.module';

import { routing } from './app.routers';
import { Deepstream } from './deepstream.service';
import { AppComponent } from './app.component';
import { AuthGuard } from './auth-guard.service';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    routing,
    FormsModule,
    HttpClientModule,
    OrderModule,
    SettingModule,
    ReactiveFormsModule,
    NgZorroAntdModule.forRoot({ extraFontName: 'anticon', extraFontUrl: '../assets/fonts/iconfont' }),
  ],
  providers: [AuthGuard, {
    provide: 'deepstream',
    useClass: Deepstream
  }, {
    provide: 'modal',
    useClass: NzModalService
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
