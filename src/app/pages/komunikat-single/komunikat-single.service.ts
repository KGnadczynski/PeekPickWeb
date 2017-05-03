import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { url } from '../../globals/url';
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
        return this.http.get(`${url}/messages/${id}`).map(this.extractData);
    }

    getUserImages(id: number) : Observable<ObjectList>{
        return this.http.get(`${url}/companyimages/companyId/${id}`).map(this.extractData);
    }

}