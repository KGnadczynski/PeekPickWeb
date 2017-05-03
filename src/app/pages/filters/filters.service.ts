import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { url } from '../../globals/url';

@Injectable()
export class FiltersService{

    constructor(private _http: Http){ }

    getCompanyCategories(): Observable<any>{
        return this._http.get(`${url}/comapnycategories/main`).map(this.extractData);
    }

    getCategorySubcategories(id: number): Observable<any>{
        return this._http.get(`${url}/comapnycategories/parentCategoryId/${id}`).map(this.extractData);
    }
    
    private extractData(res: Response) {
        let body = res.json();
        return body || { };
    }
}

