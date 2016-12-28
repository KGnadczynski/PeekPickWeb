import {Injectable} from '@angular/core';
import {Http, Response,URLSearchParams} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Rx';
import {User} from "./user";

@Injectable()
export class RegisterService {
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
  register(user: User) {
    return this.http.post(this.Url+'users/business', user)
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
}
