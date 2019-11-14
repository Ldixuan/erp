import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Input } from '@angular/compiler/src/core';
import { Http, Response } from '@angular/http';
import { Form } from 'ionic-angular';
import 'rxjs/add/operator/catch';
import 'rxjs/Rx';
/*
  Generated class for the RestProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RestProvider {

  constructor(public http: Http) {
   
  }

  private apiUrlGetCargoByName = 'http://localhost:52808/api/cargo';
 

  GetCargoByName(keyword:string, limit:number):Observable<string[]>{
      return this.getUrlReturn(this.apiUrlGetCargoByName+"?keyword="+keyword+"&limit="+limit);
  }
  
  private getUrlReturn(url: string): Observable<string[]> {
    return this.http.get(url)
      .map(this.extractData)
      .catch(this.handleError);
  }

  private extractData(res: Response) {
    let body = res.json();
    return body || {};
  }

  private handleError(error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status}-${error.statusText || ''} ${err}`;
    }
    else {
      errMsg = error.message ? error.message : error.tostring();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}
