import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class KomunikatService {
  private _carsUrl:string = "https://jsonplaceholder.typicode.com/posts";
  constructor(private _http: Http){ }

  getKomunikaty(){
    return this._http.get(this._carsUrl).map(res => res.json());
  }
  postCarRestful(productCode:string,productName:string,productLine:string,buyPrice:number ){

  /*  let body = JSON.stringify({ "productCode":productCode,"productName":productName,"productLine":productLine,"buyPrice":buyPrice });
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    let options = new RequestOptions({ headers: headers, method: "post" });

    return this._http.post(this._carsUrl, body,options)
      .map(res => res.json())
      .catch(this.handleError);*/
  }
  private handleError (error: Response) {
    console.error(error);
    return Observable.throw(error.json().error || ' error');
  }
}
