import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

import { ResourceAction, ResourceMethod, ResourceParams } from 'ng2-resource-rest';
import { RestClient } from './rest-client';

import { ObjectList } from './user';

@Injectable()

export class ProfileService{

    public token: any;
    userID: number;

    constructor(private http: Http){}

    getUser(){
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
    }

    getUserMessages(id: number) : Observable<ObjectList>{
        return this.http.get(`https://damp-temple-52216.herokuapp.com/messages/page/1?userId=${id}`)
            .map((res:Response) => res.json()).catch((error: any) => Observable.throw(error.json().error) || 'Server error');
    }

}