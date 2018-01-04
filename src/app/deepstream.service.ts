import { Injectable } from '@angular/core';
import * as deepstream from 'deepstream.io-client-js';
import { Login } from './model/login.model';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable()
export class Deepstream {

    constructor() {}

    get Instance() {
        return deepstream('roxas8210.iask.in:21656').login();
    }
}
