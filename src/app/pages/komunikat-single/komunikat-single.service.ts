import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { ObjectList } from '../komunikat/komunikat';
import 'rxjs/add/operator/map';

@Injectable()
export class KomunikatServiceComponent{

    public token: any;

    constructor(private http: Http){}

    private extractData(res: Response) {
        let body = res.json();
        return body|| { };
    }

    getKomunikat(id: number): Observable<ObjectList> {
        if(localStorage.getItem('currentUserToken')){
            var currentUser = JSON.parse(localStorage.getItem('currentUserToken'));
            this.token = currentUser.token;
            let headers = new Headers({ 'Authorization': 'Bearer '+ this.token.access_token });
            let options = new RequestOptions({ headers: headers });
            let url = `https://damp-temple-52216.herokuapp.com/messages/${id}`;
            return this.http.get(url, options).map(this.extractData);
        }
    }

    /*
     if(localStorage.getItem('currentUserToken')){
            var currentUser = JSON.parse(localStorage.getItem('currentUserToken'));
            this.token = currentUser.token;
            let headers = new Headers({ 'Authorization': 'Bearer '+ this.token.access_token });
            let options = new RequestOptions({ headers: headers });
            //console.log('public token: ' + this.token.access_token);
            //console.dir(this.token);

            return this.http.get('https://damp-temple-52216.herokuapp.com/users/business/me', options)
            .map((response: Response) => response.json());
        } 
    */

}