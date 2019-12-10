
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { timeout, catchError, mergeMap } from 'rxjs/operators'
import { Input } from '@angular/compiler/src/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Storage } from '@ionic/storage';

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

  constructor(public http: Http, public storage: Storage) {
  }
  //private host = "http://3.90.11.160/";
  //private host = "http://47.100.137.77/";
  private host = "http://localhost/LjWebApplication/";
  private apiUrlGetCargoByName = this.host + 'api/cargo';
  private apiUrlGetOrdersByUserId = this.host + 'api/SalesOrder/GetSalesOrderByUserId';
  private apiUrlGetSalesOrderCategoriesByUserId = this.host + 'api/SalesOrder/GetSalesOrderCategoriesByUserId';
  private apiUrlGetDeptByName = this.host + 'api/Client';
  private apiUrlGetSalesOrderByOrderId = this.host + "api/SalesOrder/GetSalesOrderByOrderId";
  private apiUrlInsertSalesOrderByOrderId = this.host + "api/SalesOrder/InsertSalesOrderByOrderId";
  private apiUrlgetUserList = this.host + "api/Auth/getUserList";
  private apiUrlLogin = this.host + "api/Auth/Login"; 
  private apiUrlUpdateSalesOrderStatut = this.host + "api/SalesOrder/UpdateSalesOrderStatut";
  private apiUrlCheckAvailabilityOfToken = this.host + "api/Auth/CheckAvailabilityOfToken";

  /*
  * With auth services 
  */
  GetCargoByName(limit:number):Observable<any>{
      return this.getUrlReturn(this.apiUrlGetCargoByName+"?limit="+limit);
  }

  GetOrdersByUserId(userId:string, categoryId: string, type: string ):Observable<any>{
    return this.getUrlReturn(this.apiUrlGetOrdersByUserId+"?userId="+userId+"&categoryId="+categoryId+"&type="+type);
  }

  GetSalesOrderCategoriesByUserId(userId:string, type : string):Observable<any>{
    return this.getUrlReturn(this.apiUrlGetSalesOrderCategoriesByUserId+"?userId="+userId+"&type="+ type);
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
  UpdateSalesOrderStatut(orderId, statusCode):Observable<any>{
    return this.postUrlReturn(this.apiUrlUpdateSalesOrderStatut, {orderId:orderId,statutCode:statusCode});
  }

  /**
   * Without auth
   * 
   * @param {*} User
   * @returns {Observable<any>}
   * @memberof RestProvider
   */
  Login(User):Observable<any>{
    return this.postUrlReturnWithOutAuth(this.apiUrlLogin, User);
  }
  /**
   * Without auth
   * Get userlist for the login page 
   * @returns {Observable<any>}
   * @memberof RestProvider
   */
  GetUserList():Observable<any>{
    return this.getUrlReturnWithOutAuth(this.apiUrlgetUserList);
  }

  CheckAvailabilityOfToken(token : string ):Observable<any> {
    return this.getUrlReturn(this.apiUrlCheckAvailabilityOfToken+"?token="+token);
  }

  // TODO: Login page remove all 
  private getUrlReturnWithOutAuth(url: string): Observable<any> {
      return this.http.get(url)
      .pipe(
        timeout(10000),
        catchError(e => {
          return of({'error':'timeout'});
        })
      )
      .map(this.extractData)
      .catch(this.handleError);
    }
  
 private getToken(): Observable<any> {
  return Observable.fromPromise(this.storage.get('token').then(token => {
    //maybe some processing logic like JSON.parse(token)
    return token;
  }));
 }
    
  private getUrlReturn(url: string): Observable<any> {
    return this.getToken().pipe(
      mergeMap(token => this.http.get(url,{headers: new Headers({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+ token
      })})
      .pipe(
        timeout(20000)
      )
      .map(this.extractData)
      .catch(this.handleError)
      )
    );
  }

private postUrlReturn(url:string, body:any): Observable<any> {
  return this.getToken().pipe(
    mergeMap(token => this.http.post(url,body,{headers: new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+ token
    })}).pipe(
      timeout(20000),
      // catchError(e => {
      //   return of({
      //     'Success': false,
      //     'Msg':'访问超时，请检查网络连接',
      //     'error':'timeout'});
      // })
    )
    .map(this.extractData)
    .catch(this.handleError)
    )
  );
}

private postUrlReturnWithOutAuth(url:string, body:any): Observable<any> {
  return this.http.post(url, body)
  .pipe(
    timeout(20000),
    // catchError(e => {
    //   return of({'error':'timeout'});
    // })
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
    if(error.name!=null &&error.name =="TimeoutError"){
        //超时信息
        return Observable.throw(JSON.stringify({Msg:"连接超时请检查网络连接",Success :false}));
      }
      else{
        if(error.Type =="401"){
         //处理未登录
        }
      }
    console.error(error);
    return Observable.throw(JSON.stringify(error));
  }
}
