import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { url } from '../../globals/url';
import 'rxjs/add/operator/map';

@Injectable()
export class PowiadomieniaService{

    
     urlNew: string;

    constructor(private http: Http){}

    private extractData(res: Response) {
        let body = res.json();
        return body|| { };
    }

     getPowiadomienia(page: any) : Observable<any>{
         let currentUser = JSON.parse(localStorage.getItem('currentUserToken'));
         let userFromStorage = JSON.parse(localStorage.getItem('user'));
        if(currentUser != null) {
            var token = currentUser.token
        }

        let headers = new Headers();
        let autorizationHeader = 'Bearer '+token.access_token;
        headers.append('Authorization', autorizationHeader);
        headers.append('Content-Type', 'application/json');
        this.urlNew = url + '/usernotifications/page/' + page+'?userId=' + userFromStorage.user.id;
        return this.http.get(this.urlNew,{ headers: headers }).map((res:Response) => res.json()).catch((error: any) => Observable.throw(error.json().error) || 'Server output');
    }

    usunPowiadomienie(id: any) : Observable<any>{
         let currentUser = JSON.parse(localStorage.getItem('currentUserToken'));
         let userFromStorage = JSON.parse(localStorage.getItem('user'));
        if(currentUser != null) {
            var token = currentUser.token
        }

        let headers = new Headers();
        let autorizationHeader = 'Bearer '+token.access_token;
        headers.append('Authorization', autorizationHeader);
        headers.append('Content-Type', 'application/json');
        this.urlNew = url + '/usernotifications/'+id;
        return this.http.delete(this.urlNew,{ headers: headers }).map((res:Response) => res.json()).catch((error: any) => Observable.throw(error.json().error) || 'Server output');
    }


}