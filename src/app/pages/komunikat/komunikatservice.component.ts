import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Rx';
import {Komunikat} from "./komunikat";

@Injectable()
export class KomunikatService {
  private _carsUrl:string = "https://tackpad-1316.appspot.com/messages/page/1";
  constructor(private _http: Http){ }

  getKomunikaty() : Observable<Komunikat> {
    return  this._http.get(this._carsUrl)
      .map((res : Response) => res.json())
      .catch(this.handleError);
  }

  handleError(error: any) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }
  postCarRestful(productCode:string,productName:string,productLine:string,buyPrice:number ){

  /*  let body = JSON.stringify({ "productCode":productCode,"productName":productName,"productLine":productLine,"buyPrice":buyPrice });
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    let options = new RequestOptions({ headers: headers, method: "post" });

    return this._http.post(this._carsUrl, body,options)
      .map(res => res.json())
      .catch(this.handleError);*/
  }
}
