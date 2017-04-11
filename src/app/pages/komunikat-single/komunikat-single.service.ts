import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { ObjectList } from '../komunikat/komunikat';
import 'rxjs/add/operator/map';

@Injectable()
export class KomunikatServiceComponent{

    public token: any;

    constructor(private http: Http){}

    private extractData(res: Response) {
        let body = res.json();
        return body|| { };
    }

    getKomunikat(id: number): Observable<ObjectList> {
        let url = `https://damp-temple-52216.herokuapp.com/messages/${id}`;
        return this.http.get(url).map(this.extractData);
    }

    getUserImages(id: number) : Observable<ObjectList>{
        return this.http.get(`https://damp-temple-52216.herokuapp.com/companyimages/companyId/${id}`)
        .map(this.extractData);
    }

}