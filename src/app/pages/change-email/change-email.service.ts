import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { url } from '../../globals/url';

@Injectable()
export class ChangeEmailService {

    constructor(private http: Http){}

    setNewEmail(tokenSend: string): Observable<any>{

        return this.http.get(url + '/tokens/value/' + tokenSend).map((response: Response) => response.json())
        .catch((error: any) => Observable.throw(error.json()) || 'Server output');
    }

    
    updatePasswordWithToken(token: string, password: string): Observable<any>{
        let form = {
            "password": password
        };

        return this.http.put(url + '/users/password/reset/token/' + token, form)
        .map((response: Response) => response.json())
        .catch((error: any) => Observable.throw(error.json()) || 'Server output');
    }
}