import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { MessageAddModel } from './add-message-model';

@Injectable()
export class AddMessageService {

    constructor(private http: Http){}

    addMessage(messageModel: MessageAddModel){
        let currentUser = JSON.parse(localStorage.getItem('currentUserToken'));
        if(currentUser != null) {
            var token = currentUser.token
        }

        let headers = new Headers();
        let autorizationHeader = 'Bearer '+token.access_token;
        headers.append('Authorization', autorizationHeader);
        headers.append('Content-Type', 'application/json');

        return this.http.post(`https://damp-temple-52216.herokuapp.com/messages`, JSON.stringify(messageModel),{ headers: headers })
        .map(res => res.json())
        .catch(this.handleError);

    }

    handleError(error: any) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }
}