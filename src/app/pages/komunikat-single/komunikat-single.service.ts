import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { url } from '../../globals/url';
import { ObjectList } from '../komunikat/komunikat';
import 'rxjs/add/operator/map';

@Injectable()
export class KomunikatServiceComponent{

    constructor(private http: Http){}

    getKomunikat(id: number): Observable<ObjectList> {
        return this.http.get(`${url}/messages/${id}`).map((response: Response) => response.json()).catch((error: any) => Observable.throw(error.json() || 'Server output'));
    }

    getUserImages(id: number) : Observable<ObjectList>{
        return this.http.get(`${url}/companyimages/companyId/${id}`).map((response: Response) => response.json()).catch((error: any) => Observable.throw(error.json() || 'Server output'));
    }

}