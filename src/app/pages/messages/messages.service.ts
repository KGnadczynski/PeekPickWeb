import { Injectable } from '@angular/core';
import { Http, URLSearchParams, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { url } from '../../globals/url';
import { MessageList } from './messageList.model';
import { ObjectList} from '../messages/message';

@Injectable()
export class MessagesService{

    urlNew: string;
    latitude:number;
    longitude: number;

    constructor(private http: Http){}

    getMessages(page: any, latitude: number, longitude: number) : Observable<MessageList>{

        this.urlNew = url + '/messages/page/' + page;
        if(!(latitude === 0 && longitude === 0))
            this.urlNew += '?latitude=' + latitude + '&longitude=' + longitude;

        return this.http.get(this.urlNew).map(this.mapMessages).catch(this.handleError);
    }

    getCompanyMessages(page: any, id: number, latitude: number, longitude: number) : Observable<MessageList>{

        this.urlNew = url + '/messages/page/' + page + '?companyId=' + id;
        if(!(latitude === 0 && longitude === 0))
            this.urlNew += '&latitude=' + latitude + '&longitude=' + longitude;

        return this.http.get(this.urlNew).map(this.mapMessages).catch(this.handleError);
    }

    getMessagesList(ids: string, latitude: number, longitude: number, page: number) : Observable<MessageList>{

        this.urlNew = url + '/messages/page/' + page + '?messageIdList=' + ids;
        if(!(latitude === 0 && longitude === 0))
            this.urlNew += '&latitude=' + latitude + '&longitude=' + longitude;
        console.log('URL NEW: ' + this.urlNew);

        return this.http.get(this.urlNew).map(this.mapMessages).catch(this.handleError);
    }

    getMessagesSingle(id: number) : Observable<ObjectList>{
        return this.http.get(url + '/messages/'+id).map(this.mapMessageSingle).catch(this.handleError);
    }
    
    getFilterMessages(params: string, pageNumber: number): Observable<MessageList>{
        return this.http.get(url + `/messages/page/${pageNumber}?` + params).map(this.mapMessages).catch(this.handleError);
    }

    searchMessages(searchTerm:string, page:number, latitude: number, longitude: number): Observable<MessageList>{

        this.urlNew = url + '/messages/page/' + page + '?searchTerm=' + searchTerm;
        if(!(latitude === 0 && longitude === 0))
            this.urlNew += '&latitude=' + latitude + '&longitude=' + longitude;

        return this.http.get(this.urlNew).map(this.mapMessages).catch(this.handleError);
    }

    getCompanyCategoryMessages(id: number, page:number, latitude: number, longitude: number): Observable<MessageList>{
        
        this.urlNew = url + '/messages/page/' + page + '?companyCategoryMainIdList=' + id;
        if(!(latitude === 0 && longitude === 0))
            this.urlNew += '&latitude=' + latitude + '&longitude=' + longitude;
        return this.http.get(this.urlNew).map(this.mapMessages).catch(this.handleError);
    }

    getActiveMessages(page: number, date: Date, latitude: number, longitude: number): Observable<MessageList>{
        this.urlNew = url + '/messages/page/' + page + '?startBeforeDate=' + date;
        if(!(latitude === 0 && longitude === 0))
            this.urlNew += '&latitude=' + latitude + '&longitude=' + longitude;

        return this.http.get(this.urlNew).map(this.mapMessages).catch(this.handleError);
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