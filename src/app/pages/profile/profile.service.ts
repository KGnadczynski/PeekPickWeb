import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { url } from '../../globals/url';
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

            return this.http.get(`${url}/users/business/me`, options)
            .map((response: Response) => response.json());
        }
    }

    getCompany(id: number): Observable<any>{
        return this.http.get(`${url}/companybranches/companyId/${id}/main`).map((response: Response) => response.json());
    }

    getUserImages(id: number) : Observable<ObjectList>{
        return this.http.get(`${url}/companyimages/companyId/${id}`).map((res:Response) => res.json()).catch((error: any) => Observable.throw(error.json().error) || 'Server output');
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
        return this.http.put(`${url}/users/email`, options).map((response: Response) => response.json());
    }

    updateUserPassword(password: string, newPassword: string): Observable<any>{
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
        return this.http.put(`${url}/users/password`, body, {headers: headers}).map((response: Response) => response.json());
    }

    updateCompany(data: any, id: number) : Observable<any>{
        let currentUser = JSON.parse(localStorage.getItem('currentUserToken'));
        this.token = currentUser.token;
        let headers = new Headers({ 'Authorization': 'Bearer '+ this.token.access_token, 'Content-Type': 'application/json;charset=UTF-8'  });
        let body = JSON.stringify(data);

        return this.http.put(`${url}/companies/${id}`, body, {headers: headers}).map((response:Response) => response.json());

    }

    updateCompanyBranch(data: any, id: number): Observable<any>{
        let currentUser = JSON.parse(localStorage.getItem('currentUserToken'));
        this.token = currentUser.token;
        let headers = new Headers({ 'Authorization': 'Bearer '+ this.token.access_token, 'Content-Type': 'application/json;charset=UTF-8'  });
        let body = JSON.stringify(data);
        return this.http.put(`${url}/companybranches/${id}`, body, {headers: headers}).map((response: Response) => response.json());
    }
/*
    updateCompany2(id: number, body :any): Observable<any>{
        let currentUser = JSON.parse(localStorage.getItem('currentUserToken'));
        this.token = currentUser.token;
        let headers = new Headers({ 'Authorization': 'Bearer '+ this.token.access_token, 'Content-Type': 'application/json;charset=UTF-8'  });

        return this.http.put(`${url}/companybranches/${id}`, body, {headers: headers}).map((response: Response) => response.json());
    }*/

    getCompanyBranches(id: number):Observable<any>{
        return this.http.get(`${url}/companybranches/companyId/${id}`).map((response: Response) => response.json());
    }
}