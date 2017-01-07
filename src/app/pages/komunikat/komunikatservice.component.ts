import {Injectable} from '@angular/core';
import {Http, Response, URLSearchParams, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Rx';
import {KomunikatyList} from "./komunikatlist.model";
import {KomunikatDodanie} from "./komunikatdodanie";

@Injectable()
export class KomunikatService {
  private _Url:string = "https://damp-temple-52216.herokuapp.com/";
  constructor(private _http: Http){ }

  getKomunikaty(page :any,params = []) : Observable<KomunikatyList> {
    if(params.length != 0){
     let params2 = new URLSearchParams();
      params2.append('messageTypeList',params.join(";"));
        return  this._http.get(this._Url+'messages/page/'+page,{ search: params2 })
              .map(this.mapKomunikaty)
              .catch(this.handleError);
    } else {
        return  this._http.get(this._Url+'messages/page/'+page)
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
  postKomunikat(komunikat:KomunikatDodanie){


    var currentUser = JSON.parse(localStorage.getItem('currentUserToken'));
    if(currentUser != null) {
      var token = currentUser.token
    }
    let headers = new Headers();
    var autorizationHeader = 'Bearer '+token.access_token;
    headers.append('Authorization', autorizationHeader);
    headers.append('Content-Type', 'application/json');

    return this._http.post(this._Url+"messages", JSON.stringify(komunikat),{ headers: headers })
      .map(res => res.json())
      .catch(this.handleError);
  }
}
