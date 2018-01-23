import { Injectable, Inject } from '@angular/core';
import { Deepstream } from '../deepstream.service';
import { Observable } from 'rxjs/Observable';
import { Type } from '../model/order-type.model';

@Injectable()
export class Esuser {
    constructor(@Inject('deepstream') private dp: Deepstream) {}

    setUsers(user): Observable<any> {
        return new Observable(observer => {
            this.dp.Instance.rpc.make('set-user', user, (error, data) => {
                if (error) {
                    console.log('发生错误', error);
                    observer.error(error);
                } else {
                    console.log('rpc返回的数据为', data);
                    observer.next(data);
                }
            });
        });
    }

    removeUser(userId): Observable<any> {
        return new Observable(observer => {
            this.dp.Instance.rpc.make('remove-user', userId, (error, data) => {
                if (error) {
                    console.log('删除用户发生错误', error);
                    observer.error(error);
                } else {
                    console.log('rpc删除结果', data);
                    observer.next(data);
                }
            });
        });
    }

    getAllUsers(): Observable<any> {
        return new Observable(observer => {
            this.dp.Instance.rpc.make('get-all-user', '', (error, data) => {
                if (error) {
                    console.log('发生错误', error);
                    observer.error(error);
                } else {
                    console.log('全部用户', data);
                    observer.next(data);
                }
            });
        });
    }

    getUser(userId): Observable<any> {
        return new Observable(observer => {
            this.dp.Instance.rpc.make('get-one-user', userId, (error, data) => {
                if (error) {
                    console.log('获取一个用户发生错误', error);
                    observer.error(error);
                } else {
                    console.log('这个用户数据：', data);
                    observer.next(data);
                }
            });
        });
    }

    searchUsers(username): Observable<any> {
        return new Observable(observer => {
            this.dp.Instance.rpc.make('search-user', username, (error, data) => {
                if (error) {
                    console.log('发生错误');
                    observer.error(error);
                } else {
                    console.log('搜索结果', data);
                    observer.next(data);
                }
            });
        });
    }

    updateUser(userId, data): Observable<any> {
        const postData = {
            id: userId,
            data: data
        };
        return new Observable(observer => {
            this.dp.Instance.rpc.make('update-user', postData, (error, res) => {
                if (error) {
                    console.log('更新发生错误', error);
                    observer.error(error);
                } else {
                    console.log('更新成功', res);
                    observer.next(res);
                }
            });
        });
    }

    setOrderType(orderType): Observable<any> {
        return new Observable(observer => {
            this.dp.Instance.rpc.make('set-order-type', orderType, (error, data) => {
                if (error) {
                    console.log('新增类型出错', error);
                    observer.error(error);
                } else {
                    console.log('新增类型结果：', data);
                    observer.next(data);
                }
            });
        });
    }

    getAllOrderTypes(): Observable<any> {
        return new Observable(observer => {
            this.dp.Instance.rpc.make('get-all-ordertype', '', (error, data) => {
                if (error) {
                    console.log('发生错误', error);
                    observer.error(error);
                } else {
                    console.log('全部类型', data);
                    const orderTypes = [];
                    data.forEach(v => {
                        const types: Type = {
                            id: v._id,
                            mainType: v._source.mainType,
                            subType: v._source.subType
                        };
                        orderTypes.push(types);
                    });
                    observer.next(orderTypes);
                }
            });
        });
    }

    removeOrderType(typeId): Observable<any> {
        return new Observable(observer => {
            this.dp.Instance.rpc.make('remove-ordertype', typeId, (error, data) => {
                if (error) {
                    console.log('删除类型发生错误', error);
                    observer.error(error);
                } else {
                    console.log('rpc删除类型结果', data);
                    observer.next(data);
                }
            });
        });
    }
}
