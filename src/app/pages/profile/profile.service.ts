import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

import { ResourceAction, ResourceMethod, ResourceParams } from 'ng2-resource-rest';

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
            let headers = new Headers(
                { 'Authorization': 'Bearer '+ this.token.access_token}
            );
            let options = new RequestOptions({ headers: headers });

            return this.http.get('https://damp-temple-52216.herokuapp.com/users/business/me', options)
            .map((response: Response) => response.json());
        }
    }

    getUserImages(id: number) : Observable<ObjectList>{
        return this.http.get(`https://damp-temple-52216.herokuapp.com/companyimages/companyId/${id}`)
        .map((res:Response) => res.json()).catch((error: any) => Observable.throw(error.json().error) || 'Server output');
    }

    updateUserEmail(email: string, password: string): Observable<any>{
        var currentUser = JSON.parse(localStorage.getItem('currentUserToken'));
        this.token = currentUser.token;
        let headers = new Headers({ 'Authorization': 'Bearer '+ this.token.access_token, 'Content-Type': 'application/json;charset=UTF-8'  });
        let body = [
            {
                "updateEmailForm":
                {
                    "email": email,
                    "password": password
                }
            }

        ];
        let options = new RequestOptions({ headers: headers, body:  body });
        return this.http.put(`https://damp-temple-52216.herokuapp.com/users/email`, options).map((response: Response) => response.json());
    }

    updateUserPassword(password: string, newPassword: string): Observable<any>{
        console.log('password: ' + password);
        console.log('new password: ' + newPassword);
        var currentUser = JSON.parse(localStorage.getItem('currentUserToken'));
        this.token = currentUser.token;
        let headers = new Headers({ 'Authorization': 'Bearer '+ this.token.access_token, 'Content-Type': 'application/json;charset=UTF-8'  });
        let data = 
            {
                "newPassword": newPassword,
                "password": password
            };
        let body = JSON.stringify(data);

        //let options = new RequestOptions({ headers: headers, body:  body });
        return this.http.put(`https://damp-temple-52216.herokuapp.com/users/password`, body, {headers: headers}).map((response: Response) => response.json());
    }

}