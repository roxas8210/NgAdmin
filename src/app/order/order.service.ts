import { Injectable, Inject } from '@angular/core';
import { Deepstream } from '../deepstream.service';
import { Observable } from 'rxjs/Observable';
import { ESSearch } from '../model/essearch.model';
import { Company } from '../model/company.model';

import { Order as OrderData } from '../model/data-model/order.model';
import { Order as OrderResponse } from '../model/response-data-model/order.model';
import { CompanySearchResult } from '../model/combine-model/company-search-result.model';

@Injectable()
export class Order {
    constructor(@Inject('deepstream') private dp: Deepstream) {}

    getRole(role): Observable<any> {
        return new Observable(observer => {
            const roleObj = {
                role: role
            };
            this.dp.Instance.rpc.make('search-role', roleObj, (error, data) => {
                if (error) {
                    console.log('发生错误', error);
                } else {
                    console.log('获取role数据为：', data);
                    observer.next(data.hits.hits);
                }
            });
        });
    }

    setCompany(company): Observable<any> {
        return new Observable(observer => {
            this.dp.Instance.rpc.make('set-company', company, (error, data) => {
                if (error) {
                    console.log('发生错误', error);
                    observer.error(error);
                } else {
                    console.log('新增公司结果：', data);
                    observer.next(data);
                }
            });
        });
    }

    getCompany(companyId): Observable<any> {
        return new Observable(observer => {
            this.dp.Instance.rpc.make('get-one-company', companyId, (error, data) => {
                if (error) {
                    console.log('获取一间公司信息发生错误', error);
                    observer.error(error);
                } else {
                    console.log('这个公司数据：', data);
                    const company = {
                        id: data._id,
                        address: data._source.address,
                        companyName: data._source.companyName,
                        email: data._source.email,
                        fax: data._source.fax,
                        legalPerson: data._source.legalPerson,
                        phone: data._source.phone,
                        responsiblePerson: data._source.responsiblePerson,
                        telephone: data._source.telephone,
                        website: data._source.website
                    };
                    observer.next(company);
                }
            });
        });
    }

    searchCompanys(company): Observable<CompanySearchResult[]> {
        return new Observable(observer => {
            this.dp.Instance.rpc.make('search-company', company, (error, data: ESSearch<Company>[]) => {
                if (error) {
                    console.log('发生错误');
                    observer.error(error);
                } else {
                    const companyArray = [];
                    data.forEach((val: ESSearch<Company>) => {
                        const res: CompanySearchResult = {
                            id: val._id,
                            company: val._source.companyName
                        };
                        companyArray.push(res);
                    });
                    observer.next(companyArray);
                }
            });
        });
    }

    setOrder(order): Observable<any> {
        return new Observable(observer => {
            this.dp.Instance.rpc.make('set-order', order, (error, data) => {
                if (error) {
                    console.log('发生错误', error);
                    observer.error(error);
                } else {
                    console.log('新增单结果：', data);
                    observer.next(data);
                }
            });
        });
    }

    getAllOrders(): Observable<OrderData[]> {
        return Observable.create(observer => {
            this.dp.Instance.rpc.make('get-all-order', '', (error, data: ESSearch<OrderResponse>[]) => {
                if (error) {
                    console.log('发生错误', error);
                    observer.error(error);
                } else {
                    console.log('全部单：', data);
                    const orders = [];
                    data.forEach(v => {
                        const order: OrderData = {
                            id: v._id,
                            companyId: v._source.companyId,
                            designer: v._source.designer,
                            orderDate: v._source.orderDate,
                            orderType: v._source.orderType,
                            price: v._source.price,
                            programmer: v._source.programmer,
                            sales: v._source.sales,
                            subType: v._source.subType
                        };
                        orders.push(order);
                    });
                    observer.next(orders);
                }
            });
        });
    }

    getNewlyOrders(): Observable<OrderData[]> {
        return Observable.create(observer => {
            this.dp.Instance.rpc.make('get-newly-order', '', (error, data: ESSearch<OrderResponse>[]) => {
                if (error) {
                    console.log('发生错误', error);
                    observer.error(error);
                } else {
                    console.log('全部单：', data);
                    const orders = [];
                    data.forEach(v => {
                        const order: OrderData = {
                            id: v._id,
                            companyId: v._source.companyId,
                            designer: v._source.designer,
                            orderDate: v._source.orderDate,
                            orderType: v._source.orderType,
                            price: v._source.price,
                            programmer: v._source.programmer,
                            sales: v._source.sales,
                            subType: v._source.subType
                        };
                        orders.push(order);
                    });
                    observer.next(orders);
                }
            });
        });
    }
    
    resOrderChange(resOrder: ESSearch<OrderData>[]): OrderResponse[] {
        const orders = [];
        resOrder.forEach((v: ESSearch<OrderData>) => {
            const order: OrderData = {
                id: v._id,
                companyId: v._source.companyId,
                designer: v._source.designer,
                orderDate: v._source.orderDate,
                orderType: v._source.orderType,
                price: v._source.price,
                programmer: v._source.programmer,
                sales: v._source.sales,
                subType: v._source.subType
            };
            orders.push(order);
        });
        return orders;
    }

    getOrdersByCompanyId(companyId): Observable<any> {
        return new Observable(observer => {
            this.dp.Instance.rpc.make('get-orders-by-companyid', companyId, (error, data: ESSearch<OrderData>[]) => {
                if (error) {
                    console.log('发生错误', error);
                    observer.error(error);
                } else {
                    console.log('选择的公司关联的单有：', data);
                    const orders = [];
                    data.forEach((v: ESSearch<OrderData>) => {
                        const order: OrderData = {
                            id: v._id,
                            companyId: v._source.companyId,
                            designer: v._source.designer,
                            orderDate: v._source.orderDate,
                            orderType: v._source.orderType,
                            price: v._source.price,
                            programmer: v._source.programmer,
                            sales: v._source.sales,
                            subType: v._source.subType
                        };
                        orders.push(order);
                    });
                    observer.next(orders);
                }
            });
        });
    }
}
