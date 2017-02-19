import {Injectable} from '@angular/core';
import {Http, Response, URLSearchParams, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Rx';
import {UserLogin} from "./userlogin";

@Injectable()
export class LoginService {
  private Url:string = "https://damp-temple-52216.herokuapp.com/";
  constructor(private http: Http){ }


  mapKomunikaty(res:Response) {
    let body = res.json();
    return body;
  }

  handleError(error: any) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }
  login(user: any) {
    let headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    headers.append('Authorization', 'Basic Y2xpZW50YXBwOjEyMzQ1Ng==');

    return this.http.post(this.Url+'oauth/token', user,{ headers: headers })
      .map(this.mapKomunikaty)
      .catch(this.handleError);
  }

}
