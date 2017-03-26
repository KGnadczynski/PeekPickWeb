import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { ObjectList } from '../komunikat/komunikat';
import 'rxjs/add/operator/map';

@Injectable()
export class KomunikatServiceComponent{

    constructor(private http: Http){}

    private extractData(res: Response) {
        let body = res.json();
        return body|| { };
    }

    getKomunikat(id: number): Observable<ObjectList> {
        let url = `https://damp-temple-52216.herokuapp.com/messages/${id}`;
        return this.http.get(url).map(this.extractData);
    }

}