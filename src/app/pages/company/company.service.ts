import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Company } from './company';
import { ObjectList } from './company';
import { url } from '../../globals/url';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class CompanyService{

    constructor(private http: Http){}

    getCompany(id: number){
        return this.http.get(url + `/companybranches/companyId/${id}/main`).map((response: Response) => response.json())
        .catch((error: any) => Observable.throw(error.json() || 'Server error'));
    }

    getCompanyImages(id: number){
        return this.http.get(url + `/companyimages/companyId/${id}`).map((response: Response) => response.json())
        .catch((error: any) => Observable.throw(error.json() || 'Server error'));
    }

    getCompanyBranches(id: number):Observable<any>{
        return this.http.get(`${url}/companybranches/companyId/${id}`)
        .map((response: Response) => response.json())
        .catch((error: any) => Observable.throw(error.json()) || 'Server output');
    }

}