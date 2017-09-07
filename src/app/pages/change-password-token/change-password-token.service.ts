import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { url } from '../../globals/url';

@Injectable()
export class ChangePasswordTokenService {

    constructor(private http: Http){}

    updatePasswordWithToken(token: string, password: string): Observable<any>{

        let form = {
            "password": password
        };

        return this.http.put('http://localhost:8080/users/password/reset/token/' + token, form)
        .map((response: Response) => response.json())
        .catch((error: any) => Observable.throw(error.json()) || 'Server output');
    }

}