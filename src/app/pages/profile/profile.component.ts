import {Component,OnInit ,ViewEncapsulation} from '@angular/core';

import { ProfileService } from './profile.service';
import { User } from './user';

@Component({
  selector: 'profile',
  encapsulation: ViewEncapsulation.None,
  styles: [require('./profile.scss')],
  template: require('./profile.html')
})
export class ProfileComponent implements OnInit {

  otherUser: any;

  constructor(private profileService: ProfileService) {}

  ngOnInit() {
    
    let user = this.profileService.getUser();
    // user.$observable.subscribe((receivedUser: User) => {
    //   this.otherUser = receivedUser;
    // });
    // console.log('user: ');
    // console.dir(this.otherUser);
    
  }


}