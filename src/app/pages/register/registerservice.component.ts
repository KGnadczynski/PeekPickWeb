import {Injectable} from '@angular/core';
import {Http, Response, URLSearchParams, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Rx';
import {RegisterObject} from "./user";
import {DiggitsObject} from "./user";
import { url } from '../../globals/url';

@Injectable()
export class RegisterService {
  
  constructor(private http: Http){ }

  mapKomunikaty(res:Response) {
    let body = res.json();
    return body;
  }

  mapDigits(res:Response) {
    let body = res.json();
    console.error(body);
    return body;
  }

  handleError(error: any) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }
  register(registerObject: RegisterObject) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(url+'/users/business', JSON.stringify(registerObject),{ headers: headers })
      .map(this.mapKomunikaty)
      .catch(this.handleError);
  }

  getBranze() {
    return this.http.get(url+'/comapnycategories/main')
      .map(this.mapKomunikaty)
      .catch(this.handleError);
  }

  getPodBranze(id:number) {
    return this.http.get(url+'/comapnycategories/parentCategoryId/'+id)
      .map(this.mapKomunikaty)
      .catch(this.handleError);
  }

  getDigits(digitsObject:DiggitsObject) {

     let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    console.log('Hello from service'+digitsObject.url);

    return this.http.post(url+'/users/diggits', JSON.stringify(digitsObject),{ headers: headers })
      .map(this.mapDigits)
      .catch(this.handleError);
  }
}
