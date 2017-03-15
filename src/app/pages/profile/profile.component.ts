import {Component,OnInit ,ViewEncapsulation} from '@angular/core';
import { ProfileService } from './profile.service';
import { ObjectList } from './user';
import { Http, Headers, RequestOptions } from '@angular/http';

@Component({
  selector: 'profile',
  encapsulation: ViewEncapsulation.None,
  styles: [require('./profile.scss')],
  template: require('./profile.html'),
  providers: [ProfileService]
})
export class ProfileComponent implements OnInit {

  otherUser: any;
  private otherObject: ObjectList;

  constructor(private profileService: ProfileService, private _http: Http) {}

  ngOnInit() {
    
    this.profileService.getUser().subscribe(user => {
      this.otherUser = user;
    });

    this.profileService.getUserMessages(2).subscribe(objectList => {
      this.otherObject = objectList;
      console.log('this other user messages:');
      console.dir(this.otherObject);
    });
    
  }


}