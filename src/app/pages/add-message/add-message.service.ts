import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {ImageModel} from "./imagemodel";

import { MessageAddModel } from './add-message-model';

@Injectable()
export class AddMessageService {

     private Url:string = "https://damp-temple-52216.herokuapp.com/";

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

        return this.http.post(this.Url+`messages`, JSON.stringify(messageModel),{ headers: headers })
        .map(res => res.json())
        .catch(this.handleError);

    }

    handleError(error: any) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }

   addMessageImage(imageModel:ImageModel) {
    return Observable.fromPromise(new Promise((resolve, reject) => {
      var currentUser = JSON.parse(localStorage.getItem('currentUserToken'));
      if(currentUser != null) {
        var token = currentUser.token
      }
      let headers = new Headers();
      var autorizationHeader = 'Bearer '+token.access_token;

      let formData: FormData = new FormData(),
        xhr: XMLHttpRequest = new XMLHttpRequest();

      formData.append('file', imageModel.file,imageModel.file.name);
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            resolve(JSON.parse(xhr.response))
          } else {
            reject(xhr.response)
          }
        }
      };

      xhr.open('POST', this.Url+"messageimages/messageId/"+imageModel.messageId, true);
      xhr.setRequestHeader('Authorization', autorizationHeader);
      xhr.send(formData);
    }));

  }
}