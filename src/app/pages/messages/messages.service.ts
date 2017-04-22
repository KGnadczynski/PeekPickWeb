import { Injectable } from '@angular/core';
import { Http, URLSearchParams, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { MessageList } from './messageList.model';

@Injectable()
export class MessagesService{

    private url: string = `https://damp-temple-52216.herokuapp.com/`;

    constructor(private http: Http){}

    getMessages(page: any, params = []) : Observable<MessageList>{
        if(params.length != 0){
            let params2 = new URLSearchParams();
            params2.append('messageTypeList', params.join(';'));
            return this.http.get(this.url + 'messages/page/' + page, { search: params2}).map(this.mapMessages).catch(this.handleError);
        } else {
            return this.http.get(this.url + 'messages/page/' + page).map(this.mapMessages).catch(this.handleError);
        }
    }

    getCompanyMessages(page: any, params = [], id: number) : Observable<MessageList>{
        return this.http.get(this.url + 'messages/page/' + page + '?companyId=' + id).map(this.mapMessages).catch(this.handleError);
    }

    getMessagesList(ids: string) : Observable<MessageList>{
        return this.http.get(this.url + 'messages/page/1?messageIdList=' + ids).map(this.mapMessages).catch(this.handleError);
    }

    getMessagesByType(params: string): Observable<MessageList>{
        return this.http.get(this.url + 'messages/page/1?messageTypeList=' + params).map(this.mapMessages).catch(this.handleError);
    }

    getDistance(latitude: number, longitude: number): Observable<MessageList>{
        return this.http.get(`${this.url}messages/page/1?latitude=${latitude}&longitude=${longitude}`).map(this.mapMessages).catch(this.handleError);
    }

    mapMessages(res: Response) {
        let body = res.json();
        let listing = new MessageList();

        listing.messages= body.objectList;
        listing.isLastPage = body.isLastPage;

        return listing;
    }

    handleError(error: any){
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }

    extractData(res: Response) {
        let body = res.json();
        return body|| { };
    }

}