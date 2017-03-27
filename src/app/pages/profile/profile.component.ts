import {Component,OnInit ,ViewEncapsulation} from '@angular/core';
import { ProfileService } from './profile.service';
import { ObjectList } from './user';
import { Http, Headers, RequestOptions } from '@angular/http';

import { User } from './user';

@Component({
  selector: 'profile',
  encapsulation: ViewEncapsulation.None,
  styles: [require('./profile.scss')],
  template: require('./profile.html'),
  providers: [ProfileService]
})
export class ProfileComponent implements OnInit {

  otherUser: User;
  private otherObject: ObjectList;
  private otherImgs: ObjectList;

  constructor(private profileService: ProfileService, private _http: Http) {}

  ngOnInit() {
    if(localStorage.getItem('currentUserToken')){
        this.profileService.getUser().subscribe(user => {
          this.otherUser = user;
          console.log('this user ');
          console.dir(this.otherUser);
          this.profileService.getUserMessages(this.otherUser.company.id).subscribe(objectList => {
            this.otherObject = objectList;
              console.log('this users messages ');
              console.dir(this.otherObject);
          });
          this.profileService.getUserImages(this.otherUser.company.id).subscribe(imgs => {
            this.otherImgs = imgs;
            console.log('images:');
            console.dir(this.otherImgs);
          });
          
        });

        
    }

  }


}