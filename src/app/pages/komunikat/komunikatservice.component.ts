import {Injectable} from '@angular/core';
import {Http, Response,URLSearchParams} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Rx';
import {KomunikatyList} from "./komunikatlist.model";

@Injectable()
export class KomunikatService {
  private _carsUrl:string = "https://damp-temple-52216.herokuapp.com/messages/page/";
  constructor(private _http: Http){ }

  getKomunikaty(page :any,params = null) : Observable<KomunikatyList> {
    if(params != null){
     let params2 = new URLSearchParams();
      params2.append('messageTypeList', 'SHORT_TERM_OFFER');
        return  this._http.get(this._carsUrl+page,{ search: params2 })
              .map(this.mapKomunikaty)
              .catch(this.handleError);
    } else {
        return  this._http.get(this._carsUrl+page)
          .map(this.mapKomunikaty)
          .catch(this.handleError);
    }
  }

  mapKomunikaty(res:Response) {
    let body = res.json();
    let listing = new KomunikatyList();

    listing.komunikaty =body.objectList;
    listing.isLastPage = body.isLastPage;
    return listing;
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
