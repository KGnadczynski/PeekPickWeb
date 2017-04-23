import {Component,OnInit ,ViewEncapsulation} from '@angular/core';
import { ProfileService } from './profile.service';
import { ObjectList } from './user';
import { Http, Headers, RequestOptions } from '@angular/http';

import { User } from './user';
import { MessagesComponent } from '../messages/messages.component';

@Component({
  selector: 'profile',
  encapsulation: ViewEncapsulation.None,
  styles: [require('./profile.scss')],
  template: require('./profile.html'),
  providers: [ProfileService]
})
export class ProfileComponent implements OnInit {

  otherUser: User;
  otherObject: ObjectList;
  otherImgs: ObjectList;
  idCompany: number;

  constructor(private profileService: ProfileService, private _http: Http) {}

  ngOnInit() {
    if(localStorage.getItem('currentUserToken')){
        this.profileService.getUser().subscribe(user => {
          this.otherUser = user;
          this.idCompany = user.company.id;
          this.profileService.getUserImages(this.otherUser.company.id).subscribe(imgs => {
            this.otherImgs = imgs;
          });
        });
        
    }
  }
}