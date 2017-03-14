import { Injectable } from '@angular/core';
import { RequestMethod } from '@angular/http';

import { ResourceAction, ResourceMethod, ResourceParams } from 'ng2-resource-rest';
import { RestClient } from './rest-client';

import { Company } from './company';
import { ObjectList } from './company';

@Injectable()
@ResourceParams({
    url: '/'
})

export class CompanyService extends RestClient{
    @ResourceAction({
        path: '/companybranches/companyId/{!id}/main'
    })
    getCompany: ResourceMethod<{id: any}, Company>;

    @ResourceAction({
        path: '/messages/page/1?companyId={!id}'
    })
    getCompanyMessages: ResourceMethod<{id: any}, ObjectList>;
}