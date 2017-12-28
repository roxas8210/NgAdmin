import { Injectable, Inject } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(
        @Inject('deepstream') private ds
    ) {}

    canActivate(): boolean | Observable<boolean> | Promise<boolean> {
        return new Observable(observer => {
            this.ds.Instance.login((success, clientData) => {
                if (success) {
                    console.log('token有效');
                    observer.next(true);
                    observer.complete();
                    return;
                }
                observer.next(false);
                observer.complete();
            });
        });
    }
}
