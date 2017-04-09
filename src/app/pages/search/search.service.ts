import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class SearchService {

    private url:string = "https://damp-temple-52216.herokuapp.com/";
    
    constructor(private _http: Http){ }

     getCompanyCategories(): Observable<any>{
        return this._http.get(this.url + 'comapnycategories/main').map(this.extractData);
    }

    getCategorySubcategories(id: number): Observable<any>{
        return this._http.get(`https://damp-temple-52216.herokuapp.com/comapnycategories/parentCategoryId/${id}`).map(this.extractData);
    }

    private extractData(res: Response) {
        let body = res.json();
        return body|| { };
    }
}