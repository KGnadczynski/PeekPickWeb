import { Injectable } from '@angular/core';
import { RequestMethod } from '@angular/http';

import { ResourceAction, ResourceMethod, ResourceParams } from 'ng2-resource-rest';
import { RestClient } from './rest-client';

import { User } from './user';

@Injectable()
@ResourceParams({
    url: '/'
})

export class ProfileService extends RestClient{
    @ResourceAction({
        isArray: true,
        path: '/users/business/me'
    })
    getUser: ResourceMethod<User, User>;

}