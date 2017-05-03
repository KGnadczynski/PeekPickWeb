import { Component,OnInit ,ViewEncapsulation } from '@angular/core';
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
  companyForm: FormGroup;
  additionalForm: FormGroup;
  messageAfter: boolean = false;
  public defaultPicture = 'assets/img/theme/add-icon.png';
  public profile:any = {
        picture: 'assets/img/theme/add-icon.png'
 };

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
      
      this.companyForm = fb.group({
          'name': '',
          'address': fb.group({
              'city': '',
              'street': '',
              'streetNo': ''
          }),
          
      });

      this.additionalForm = fb.group({
        'contact': fb.group({
            'www': '',
            'openingHours': '',
            'telephone': '',
            'email': '',
            'description': ''
        })
      });
  }

  ngOnInit() {

      this.profileService.getUser().subscribe(user => {
        this.profileService.getCompany(user.company.id).subscribe(company => {
            console.log('company: ');
            console.dir(company);
        });
      });

      if(localStorage.getItem('currentUserToken')){

          this.profileService.getUser().subscribe(user => {
            this.otherUser = user;
            console.log("otherUser: ");
            console.dir(this.otherUser);
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
        this.profileService.updateUserPassword(values.oldPassword, values.passwords.password).subscribe(result => {
            this.passwordForm.reset();
            this.messageAfter = true;
        });
    }

    udpateCompanyName(value){
        if(value.name || value.address.city || value.address.street || value.address.streetNo){
            this.profileService.getUser().subscribe(user => {
                let body = user.company;
                if(value.name){
                    body.name = value.name;
                    this.profileService.updateCompany(body, user.company.id).subscribe(result => {
                        this.companyForm.reset();
                        this.otherUser.company = result;
                    });
                }

                this.profileService.getUser().subscribe(user => {
                    this.profileService.getCompanyBranches(user.company.id).subscribe(branches => {
                        for(let i = 0; i < branches.length; i++){
                            if(branches[i].main){
                                let bodyAdd = branches[i];
                                if(value.name)
                                    bodyAdd.name = value.name;
                                if(value.address.street)
                                    bodyAdd.street = value.address.street;
                                if(value.address.city)
                                    bodyAdd.city = value.address.city;
                                if(value.address.streetNo)
                                    bodyAdd.streetNo = value.address.streetNo;
                                
                                this.profileService.updateCompanyBranch(bodyAdd, branches[i].id).subscribe(branch => {
                                    console.log('branch: ');
                                    console.dir(branch);
                                });
                            }
                        }
                    });
                });
            });   
        }
    }

    udpateCompany2(value){
        console.log('values companyform: ');
        console.dir(value);

        /** 
         * 'contact': fb.group({
            'www': '',
            'openingHours': '',
            'telephone': '',
            'email': '',
            'description': ''
        })
        */

        if(value.contact.www || value.contact.openingHours || value.contact.telephone || value.contact.email || value.contact.description){

            this.profileService.getUser().subscribe(user => {
                this.profileService.getCompanyBranches(user.company.id).subscribe(branches => {
                    for(let i = 0; i < branches.length; i++){
                        if(branches[i].main){
                            let bodyAdd = branches[i];
                            if(value.contact.www)
                                bodyAdd.www = value.contact.www;
                            if(value.contact.openingHours)
                                bodyAdd.openingHours = value.contact.street;
                            if(value.contact.telephone)
                                bodyAdd.telephone = value.contact.telephone;
                            //if(value.contact.email)
                                //bodyAdd.email = value.contact.streetNo;
                            if(value.contact.description)
                                bodyAdd.description = value.contact.description;
                            
                            this.profileService.updateCompanyBranch(bodyAdd, branches[i].id).subscribe(branch => {
                                console.log('branch: ');
                                console.dir(branch);
                            });
                        }
                    }
                });
            });

        }
    }
}