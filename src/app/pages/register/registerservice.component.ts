import {Injectable} from '@angular/core';
import {Http, Response, URLSearchParams, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Rx';
import {RegisterObject} from "./user";

@Injectable()
export class RegisterService {
  private Url:string = "https://damp-temple-52216.herokuapp.com/";
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
    return this.http.post(this.Url+'users/business', JSON.stringify(registerObject),{ headers: headers })
      .map(this.mapKomunikaty)
      .catch(this.handleError);
  }

  getBranze() {
    return this.http.get(this.Url+'comapnycategories/main')
      .map(this.mapKomunikaty)
      .catch(this.handleError);
  }

  getPodBranze(id:number) {
    return this.http.get(this.Url+'comapnycategories/parentCategoryId/'+id)
      .map(this.mapKomunikaty)
      .catch(this.handleError);
  }

  getDigits(digitsUrl:string , credentials:string) {
    let headers = new Headers();
    headers.append('Authorization', credentials);
    console.log('Hello from service'+digitsUrl);

    return this.http.post(digitsUrl,{ headers: headers })
      .map(this.mapDigits)
      .catch(this.handleError);
  }
}
