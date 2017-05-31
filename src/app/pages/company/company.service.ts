import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
// import { ResourceAction, ResourceMethod, ResourceParams } from 'ng2-resource-rest';
// import { RestClient } from './rest-client';
import { Company } from './company';
import { ObjectList } from './company';
import { url } from '../../globals/url';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

/*@ResourceParams({
    url: '/'
})*/

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

/*
    @ResourceAction({
        path: '/companybranches/companyId/{!id}/main'
    })
    getCompany: ResourceMethod<{id: any}, Company>;

    @ResourceAction({
        path: '/messages/page/1?companyId={!id}'
    })
    getCompanyMessages: ResourceMethod<{id: any}, ObjectList>;

    @ResourceAction({
        path: '/companyimages/companyId/{!id}'
    })
    getCompanyImages: ResourceMethod<{id: any}, any>;*/

}