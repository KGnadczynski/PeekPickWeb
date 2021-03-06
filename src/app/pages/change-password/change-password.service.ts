import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { url } from '../../globals/url';

@Injectable()
export class ChangePasswordService {

    constructor(private http: Http){}

    passwordReset(email: any): Observable<any> {
        
        return this.http.put(url + '/users/password/reset', email)
        .map((response: Response) => response.json())
        .catch((error: any) => Observable.throw(error.json()) || 'Server output');

    }

}