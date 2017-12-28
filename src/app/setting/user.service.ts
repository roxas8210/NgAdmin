import { Injectable, Inject } from '@angular/core';
import * as deepstream from 'deepstream.io-client-js';
import { Deepstream } from '../deepstream.service';

@Injectable()
export class User {

    constructor(@Inject('deepstream') private dp: Deepstream) {}

    get client() {
        return this.dp.Instance;
    }

    get userList() {
        return this.client.record.getList('users');
    }
}
