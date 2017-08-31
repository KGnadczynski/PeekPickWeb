import { Injectable } from '@angular/core';
import { Http, URLSearchParams, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { url } from '../../globals/url';
import { MessageList } from './messageList.model';
import { ObjectList} from '../messages/message';

let moment = require('../../../../node_modules/moment/moment');

@Injectable()
export class MessagesService{

    urlNew: string;
    latitude:number;
    longitude: number;
    public token: any;

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

        return this.http.get(this.urlNew).map(this.mapMessages).catch(this.handleError);
    }

    getMessagesSingle(id: number) : Observable<ObjectList>{
        return this.http.get(url + '/messages/'+id).map(this.mapMessageSingle).catch(this.handleError);
    }
    
    getFilterMessages(params: string, pageNumber: number): Observable<MessageList>{
        return this.http.get(url + `/messages/page/${pageNumber}?` + params).map(this.mapMessages).catch(this.handleError);
    }

    searchMessages(searchTerm:string, page:number, latitude: number, longitude: number): Observable<MessageList>{

        this.urlNew = url + '/messages/page/' + page + '?' + searchTerm;
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

    getActiveMessages(page: number, date: Date, latitude: number, longitude: number, id:number): Observable<MessageList>{
        
        this.urlNew = url + '/messages/page/' + page + "?companyId=" + id;
        
        if(!(latitude === 0 && longitude === 0))
            this.urlNew += '&latitude=' + latitude + '&longitude=' + longitude;

        this.urlNew += '&startBeforeDate=' + date;
        
        return this.http.get(this.urlNew).map(this.mapMessages).catch(this.handleError);
    }

    deleteMessage(id: number) {
        let currentUser = JSON.parse(localStorage.getItem('currentUserToken'));
        this.token = currentUser.token;
        let headers = new Headers({ 'Authorization': 'Bearer '+ this.token.access_token, 'Content-Type': 'application/json;charset=UTF-8'  });
        let options = new RequestOptions({ headers: headers });

        return this.http.delete(url + `/messages/${id}`, options).map((response: Response) => response.json())
        .catch((error: any) => Observable.throw(error.json()) || 'Server output');
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

    getMessageCount(id: number): Observable<any>  {

        let currentUser = JSON.parse(localStorage.getItem('currentUserToken'));
        let token = currentUser.token;
        let headers = new Headers({'Authorization': 'Bearer '+ token.access_token});

        return this.http.get(url + '/companycredits/companyId/' + id, {headers: headers}).map((response: Response) => response.json())
        .catch((error: any) => Observable.throw(error.json()) || 'Server output');
        //return this.http.get(url + '/messages/companyId/' + id + '/count').map((response: Response) => response.json())
        //.catch((error: any) => Observable.throw(error.json()) || 'Server output');
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