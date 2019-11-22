import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { timeout, catchError } from 'rxjs/operators'
import { Input } from '@angular/compiler/src/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/catch';
import 'rxjs/Rx';
import { of } from 'rxjs/observable/of';

/*
  Generated class for the RestProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RestProvider {

  constructor(public http: Http) {
   
  }

  //private host = "http://47.100.137.77/";
  private host = "http://localhost/LjWebApplication/";
  private apiUrlGetCargoByName = this.host + 'api/cargo';
  private apiUrlGetOrdersByUserId = this.host + 'api/SalesOrder/GetSalesOrderByUserId';
  private apiUrlGetDeptByName = this.host + 'api/Client';
  private apiUrlGetSalesOrderByOrderId = this.host + "api/SalesOrder/GetSalesOrderByOrderId";
  private apiUrlInsertSalesOrderByOrderId = this.host + "api/SalesOrder/InsertSalesOrderByOrderId";
  private apiUrlgetUserList = this.host + "api/Auth/getUserList";
  private apiUrlLogin = this.host + "api/Auth/Login"; //TODO

 

  GetCargoByName(limit:number):Observable<any>{
      return this.getUrlReturn(this.apiUrlGetCargoByName+"?limit="+limit);
  }

  GetUserList():Observable<any>{
    return this.getUrlReturn(this.apiUrlgetUserList);
}


  GetOrdersByUserId(userId:string):Observable<any>{
    return this.getUrlReturn(this.apiUrlGetOrdersByUserId+"?userId="+userId);
  }

  GetDeptByName(limit:number):Observable<any>{
    return this.getUrlReturn(this.apiUrlGetDeptByName+"?limit="+limit);
  }

  GetSalesOrderByOrderId(orderId : string):Observable<any>{
    return this.getUrlReturn(this. apiUrlGetSalesOrderByOrderId+"?orderId="+orderId);
  }

  InsertSalesOrderByOrderId(orderInfo, products:Array<any>):Observable<any>{
    return this.postUrlReturn(this.apiUrlInsertSalesOrderByOrderId, {orderInfo:orderInfo,products:products});
  }

  Login(User):Observable<any>{
    return this.postUrlReturn(this.apiUrlLogin, User);
  }

  
  private getUrlReturn(url: string): Observable<any> {
    return this.http.get(url)
    .pipe(
      timeout(10000),
      catchError(e => {
        return of({'error':'timeout'});
      })
    )
    .map(this.extractData)
    .catch(this.handleError);
  }

  private postUrlReturn(url:string, body:any): Observable<any> {
    return this.http.post(url, body)
    .pipe(
      timeout(10000),
      catchError(e => {
        return of({'error':'timeout'});
      })
    )
    .map(this.extractData)
    .catch(this.handleError);
  }

  private extractData(res: Response) {
    let body = res.json();
    return body || {};
  }

  private handleError(error: Response | any) {
    let errMsg: string;
    // if (error instanceof Response) {
    //   const body = error.json() || '';
    //   const err = body.error || JSON.stringify(body);
    //   errMsg = `${error.status}-${error.statusText || ''} ${err}`;
    // }
    // else {
    //   errMsg = error.message ? error.message : error.tostring();
    // }
    // console.error(errMsg);
    // return Observable.throw(errMsg);
    console.log(JSON.stringify(error));
    return Observable.throw(JSON.stringify(error));
  }
}
