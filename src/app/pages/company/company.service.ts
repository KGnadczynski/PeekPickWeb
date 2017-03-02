import { Injectable } from '@angular/core';
import { RequestMethod } from '@angular/http';

import { ResourceAction, ResourceMethod, ResourceParams } from 'ng2-resource-rest';
import { RestClient } from './rest-client';

import { Company } from './company';

@Injectable()
@ResourceParams({
    url: '/companies'
})

export class CompanyService extends RestClient{
    @ResourceAction({
        path: '/{!id}'
    })
    getCompany: ResourceMethod<{id: any}, Company>;
}