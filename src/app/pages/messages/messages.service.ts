import { Injectable } from '@angular/core';
import { Http, URLSearchParams, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { MessageList } from './messageList.model';
import { ObjectList} from '../messages/message';

@Injectable()
export class MessagesService{

    private url: string = `https://damp-temple-52216.herokuapp.com/`;

    constructor(private http: Http){}

    getMessages(page: any, latitude: number, longitude: number) : Observable<MessageList>{
        return this.http.get(`${this.url}messages/page/${page}?latitude=${latitude}&longitude=${longitude}`).map(this.mapMessages).catch(this.handleError);
    }

    getCompanyMessages(page: any, id: number, latitude: number, longitude: number) : Observable<MessageList>{
        return this.http.get(this.url + 'messages/page/' + page + '?companyId=' + id + '&latitude='+latitude+'&longitude='+longitude).map(this.mapMessages).catch(this.handleError);
    }

    getMessagesList(ids: string, latitude: number, longitude: number) : Observable<MessageList>{
        return this.http.get(this.url + 'messages/page/1?messageIdList=' + ids + '&latitude='+latitude+'&longitude='+longitude).map(this.mapMessages).catch(this.handleError);
    }

    getMessagesSingle(id: number) : Observable<ObjectList>{
        return this.http.get(this.url + 'messages/'+id).map(this.mapMessageSingle).catch(this.handleError);
    }

    getMessagesByType(params: string, latitude: number, longitude: number): Observable<MessageList>{
        return this.http.get(this.url + 'messages/page/1?messageTypeList=' + params + "&latitude=" + latitude + "&longitude=" + longitude).map(this.mapMessages).catch(this.handleError);
    }

    getRange(latitude: number, longitude: number, page: number, range: number): Observable<MessageList>{
        return this.http.get(`${this.url}messages/page/${page}?latitude=${latitude}&longitude=${longitude}&range=${range}`).map(this.mapMessages).catch(this.handleError);
    }

    sortMessagesByDistance(page: number, latitude: number, longitude: number): Observable<MessageList>{
        return this.http.get(this.url+'messages/page/' + page + '?latitude=' + latitude + '&longitude=' + longitude + '&sortType=distance').map(this.mapMessages).catch(this.handleError);
    }

    sortMessagesByCreateDate(page:number, latitude: number, longitude: number): Observable<MessageList>{
        return this.http.get(this.url+'messages/page/' + page + '?latitude=' + latitude + '&longitude=' + longitude + '&sortType=create_date').map(this.mapMessages).catch(this.handleError);
    }

    searchMessages(searchTerm:string, page:number, latitude: number, longitude: number): Observable<MessageList>{
        return this.http.get(this.url + `messages/page/${page}?searchTerm=${searchTerm}&latitude=${latitude}&longitude=${longitude}`).map(this.mapMessages).catch(this.handleError);
    }

    

    mapMessages(res: Response) {
        let body = res.json();
        let listing = new MessageList();

        listing.messages= body.objectList;
        listing.isLastPage = body.isLastPage;

        return listing;
    }

    mapMessageSingle(res: Response) {
        let body = res.json();
        let listing: ObjectList;
        listing = body;

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