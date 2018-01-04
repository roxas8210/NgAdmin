import { Injectable, Inject } from '@angular/core';
import { Deepstream } from '../deepstream.service';

@Injectable()
export class Esuser {
    constructor(@Inject('deepstream') private dp: Deepstream) {}

    setUser(user, cb) {
        this.dp.Instance.rpc.make('set-user', user, (error, data) => {
            if (error) {
                console.log('发生错误', error);
                console.error(error);
                cb(error);
            }
            console.log('rpc返回的数据为', data);
            cb(data);
        });
    }

    getAllUser(cb) {
        this.dp.Instance.rpc.make('get-all-user', '', (error, data) => {
            if (error) {
                console.log('发生错误', error);
                console.error(error);
                cb(error);
            }
            console.log('全部用户', data);
            cb(data);
        });
    }
}
