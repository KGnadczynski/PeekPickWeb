import {Component,OnInit ,ViewEncapsulation} from '@angular/core';
import { ProfileService } from './profile.service';
import { ObjectList } from './user';
import { Http, Headers, RequestOptions } from '@angular/http';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { User } from './user';
import { MessagesComponent } from '../messages/messages.component';
import { Router } from '@angular/router';
import { EqualPasswordsValidator } from '../../theme/validators';

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
  passwordForm: FormGroup;
  messageAfter: boolean = false;

  constructor(
    private profileService: ProfileService, 
    private _http: Http, 
    private router: Router, 
    private fb: FormBuilder)
  {
      this.passwordForm = fb.group({
          'oldPassword': [null, Validators.required],
          'passwords': fb.group({
            'password': [null, Validators.compose([Validators.required, Validators.minLength(4)])],
            'repeatPassword': [null, Validators.compose([Validators.required, Validators.minLength(4)])],
          }, {validator: EqualPasswordsValidator.validate("password", "repeatPassword")})
      });
      
  }

  ngOnInit() {

      if(localStorage.getItem('currentUserToken')){

      //   this.profileService.updateUserPassword("tackpad12345", "tackpad123456").subscribe(result => {
      //     console.log('result:');
      //     console.dir(result);
      // });

          this.profileService.getUser().subscribe(user => {
            this.otherUser = user;
            this.idCompany = user.company.id;
            this.profileService.getUserImages(this.otherUser.company.id).subscribe(imgs => {
              this.otherImgs = imgs;
              console.log('imgs:');
              console.dir(this.otherImgs);
            });
          });
          
      }
      else{
        this.router.navigateByUrl('/pages/komunikat');
      }
    }

    udpatePassword(values: any){
        console.log('started editing password');
        console.dir(values);

        this.profileService.updateUserPassword(values.oldPassword, values.passwords.password).subscribe(result => {
            console.log('result:');
            console.dir(result);
            this.passwordForm.reset();
            this.messageAfter = true;
        });
    }
}