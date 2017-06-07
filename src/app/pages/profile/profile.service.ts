import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { url } from '../../globals/url';
import { ResourceAction, ResourceMethod, ResourceParams } from 'ng2-resource-rest';
import { ObjectList } from './user';
import { ImageModel } from '../add-message/imagemodel';

@Injectable()

export class ProfileService{

    public token: any;
    userID: number;
    constructor(private http: Http){}

    getUser(){
            var currentUser = JSON.parse(localStorage.getItem('currentUserToken'));
            this.token = currentUser.token;
            let headers = new Headers(
                { 'Authorization': 'Bearer '+ this.token.access_token}
            );
            let options = new RequestOptions({ headers: headers });

            return this.http.get(`${url}/users/business/me`, options)
            .map((response: Response) => response.json())
            .catch((error: any) => Observable.throw(error.json() || 'Server error'));
        }

    getCompany(id: number): Observable<any>{
        return this.http.get(`${url}/companies/${id}`)
        .map((response: Response) => response.json())
        .catch((error: any) => Observable.throw(error.json()) || 'Server output');
    }

    getUserImages(id: number) : Observable<any>{
        return this.http.get(`${url}/companyimages/companyId/${id}`)
        .map((response: Response) => response.json())
        .catch((error: any) => Observable.throw(error.json()) || 'Server output');
    }

    updateUserEmail(email: string, password: string): Observable<any>{
        var currentUser = JSON.parse(localStorage.getItem('currentUserToken'));
        this.token = currentUser.token;
        let headers = new Headers({ 'Authorization': 'Bearer '+ this.token.access_token, 'Content-Type': 'application/json;charset=UTF-8'  });
        let body = [{
            "updateEmailForm":{
                "email": email,
                "password": password
            }
        }];
        let options = new RequestOptions({ headers: headers, body:  body });
        return this.http.put(`${url}/users/email`, options)
        .map((response: Response) => response.json())
        .catch((error: any) => Observable.throw(error.json()) || 'Server output');
    }

    updateUserPassword(password: string, newPassword: string): Observable<any>{
        var currentUser = JSON.parse(localStorage.getItem('currentUserToken'));
        this.token = currentUser.token;
        let headers = new Headers({ 'Authorization': 'Bearer '+ this.token.access_token, 'Content-Type': 'application/json;charset=UTF-8'  });
        let data = {
            "newPassword": newPassword,
            "password": password
        };
        let body = JSON.stringify(data);

        return this.http.put(`${url}/users/password`, body, {headers: headers})
        .map((response: Response) => response.json())
        .catch((error: any) => Observable.throw(error.json()) || 'Server output');
    }

    updateCompany(data: any, id: number) : Observable<any>{
        let currentUser = JSON.parse(localStorage.getItem('currentUserToken'));
        this.token = currentUser.token;
        let headers = new Headers({ 'Authorization': 'Bearer '+ this.token.access_token, 'Content-Type': 'application/json;charset=UTF-8'  });
        let body = JSON.stringify(data);

        return this.http.put(`${url}/companies/${id}`, body, {headers: headers})
        .map((response:Response) => response.json())
        .catch((error: any) => Observable.throw(error.json()) || 'Server output');

    }

    updateCompanyBranch(data: any, id: number): Observable<any>{
        let currentUser = JSON.parse(localStorage.getItem('currentUserToken'));
        this.token = currentUser.token;
        let headers = new Headers({ 'Authorization': 'Bearer '+ this.token.access_token, 'Content-Type': 'application/json;charset=UTF-8'  });
        let body = JSON.stringify(data);
        return this.http.put(`${url}/companybranches/${id}`, body, {headers: headers})
        .map((response: Response) => response.json())
        .catch((error: any) => Observable.throw(error.json()) || 'Server output');
    }

    deleteBranch(id:number): Observable<any>{
        let currentUser = JSON.parse(localStorage.getItem('currentUserToken'));
        this.token = currentUser.token;
        let headers = new Headers({ 'Authorization': 'Bearer '+ this.token.access_token, 'Content-Type': 'application/json;charset=UTF-8'  });
        return this.http.delete(`${url}/companybranches/${id}`, {headers: headers})
        .map((response: Response) => response.json())
        .catch((error: any) => Observable.throw(error.json()) || 'Server output');
    }

    getCompanyBranch(id: number): Observable<any> {
        return this.http.get(`${url}/companybranches/${id}`)
        .map((response: Response) => response.json())
        .catch((error: any) => Observable.throw(error.json().error) || 'Server output');
    }

    getCompanyBranches(id: number):Observable<any>{
        return this.http.get(`${url}/companybranches/companyId/${id}`)
        .map((response: Response) => response.json())
        .catch((error: any) => Observable.throw(error.json()) || 'Server output');
    }

    getMainCompanyBranch(id: number) : Observable<any>{
        return this.http.get(`${url}/companybranches/companyId/${id}/main`)
        .map((response :Response) => response.json())
        .catch((error: any) => Observable.throw(error.json() || 'Server output'));
    }

    addNewBranch(data: any): Observable<any>{
        let currentUser = JSON.parse(localStorage.getItem('currentUserToken'));
        this.token = currentUser.token;
        let headers = new Headers({ 'Authorization': 'Bearer '+ this.token.access_token, 'Content-Type': 'application/json;charset=UTF-8'  });

        let body = JSON.stringify(data);

        return this.http.post(`${url}/companybranches`, body, {headers: headers})
        .map((response: Response) => response.json())
        .catch((error: any) => Observable.throw(error.json()) || 'Server output');
    }

    editBranch(data: any, id: number): Observable<any>{
        let currentUser = JSON.parse(localStorage.getItem('currentUserToken'));
        this.token = currentUser.token;
        let headers = new Headers({ 'Authorization': 'Bearer '+ this.token.access_token, 'Content-Type': 'application/json;charset=UTF-8'  });

        let body = JSON.stringify(data);

        return this.http.put(`${url}/companybranches/${id}`, body, {headers: headers})
        .map((response: Response) => response.json())
        .catch((error: any) => Observable.throw(error.json()) || 'Server output');
    }

    addCompanyImage(imageModel: ImageModel) : Observable<any>{

        return Observable.fromPromise(new Promise((resolve, reject) => {

            let currentUser = JSON.parse(localStorage.getItem('currentUserToken'));
            let headers = new Headers();
            let token = currentUser.token;
            let authorizationHeader = 'Bearer ' + token.access_token;

            let formData: FormData = new FormData();
            let xhr: XMLHttpRequest = new XMLHttpRequest();

            formData.append('file', imageModel.file, imageModel.file.name);
            xhr.onreadystatechange = () => {
                if(xhr.readyState === 4){
                    if(xhr.status === 200){
                        resolve(JSON.parse(xhr.response))
                    } else {
                        reject(xhr.response);
                    }
                }
            };

            xhr.open('POST', url+'/companyimages/companyId/' + imageModel.messageId, true);
            xhr.setRequestHeader('Authorization', authorizationHeader);
            xhr.send(formData);

        }));
    }
}