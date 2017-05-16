import { Component,OnInit ,ViewEncapsulation, ViewChild } from '@angular/core';
import { ProfileService } from './profile.service';
import { ObjectList } from './user';
import { Http, Headers, RequestOptions } from '@angular/http';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { User } from './user';
import { MessagesComponent } from '../messages/messages.component';
import { Router } from '@angular/router';
import { EqualPasswordsValidator } from '../../theme/validators';
import { NgUploaderOptions } from 'ngx-uploader';
import { ImageModel } from '../add-message/imagemodel';

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
  otherImgs: any;
  companyBranches: any[];
  idCompany: number;
  passwordForm: FormGroup;
  companyForm: FormGroup;
  additionalForm: FormGroup;
  branchForm: FormGroup;
  messageAfter: boolean = false;
  public defaultPicture = 'assets/img/theme/add-icon.png';
  public profile:any = {
        picture: 'assets/img/theme/add-icon.png'
    };
  isCollapse:boolean = true;
  error: any;
    public uploaderOptions:NgUploaderOptions = {
        url: '',
    };
    @ViewChild('fileUpload') public fileUpload:any;

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

      this.branchForm = fb.group({
        'name': '',
        'city': '',
        'street': '',
        'streetNo': '',
        'website': '',
        'phoneNumber': '',
        'openingHours': '',
        'description': '',
        'email': ''
      });
  }

  ngOnInit() {

      if(localStorage.getItem('currentUserToken')){

        this.profileService.getUser().subscribe(
            user => {
                console.log('user:');
                console.dir(user);
            },
            err => {
                console.log('error: ');
                console.dir(err);
            }
        )

            /*this.profileService.getUser().map(res => res.json()).subscribe(
                (user) => {
                    this.profileService.getCompanyBranches(user.company.id).map(res => res.json()).subscribe(
                        (branches) => {
                            this.companyBranches = branches;
                            this.companyBranches.forEach((obj) => {
                                obj.collapse = true;
                            });
                        },
                        (errI) => {
                            console.log('Error from getCompanyBranches');
                            console.dir(errI);
                        }
                    )
                },
                (err) => {
                    console.log('Error from get user: ' + err._body);
                    console.dir(err);
                    let error =JSON.parse(JSON.stringify(err._body || null ));
                    if(error){
                        if(error.error === 'invalid_token'){
                            this.router.navigateByUrl('/pages/komunikat');
                            localStorage.removeItem('currentUserToken');
                            localStorage.removeItem('user');
                        }
                    }
                    
                }
            );*/

            /*this.profileService.getUser().map(res => res.json()).subscribe(
                (user) => {
                    this.otherUser = user;
                    this.idCompany = user.company.id;
                    this.profileService.getUserImages(this.otherUser.company.id).map(res => res.json()).subscribe(
                        (imgs) => {
                            this.otherImgs = imgs;
                        },
                        (errI) => {
                            console.log('Error from get User Images: ');
                            console.dir(errI);
                        }
                    )
                },
                (err) => {
                    let error =JSON.parse(JSON.stringify(err._body || null ));

                    if(error){
                        if(error.error === 'invalid_token'){
                            this.router.navigateByUrl('/pages/komunikat');
                            localStorage.removeItem('currentUserToken');
                            localStorage.removeItem('user');
                        }
                    }

                    console.log('Error from get User: ');
                    console.dir(error);
                }
            );*/

          /*this.profileService.getUser().subscribe(user => {
            this.profileService.getCompanyBranches(user.company.id).subscribe(branches => {
                this.companyBranches = branches;
                this.companyBranches.forEach((obj) => {
                    obj.collapse = true;
                });
            },
            err => {
                console.log('error: ');
                console.dir(err);
            });
        });

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
          });*/
          
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

        this.addCompanyImage();

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
                                    let objIndex = this.companyBranches.findIndex((obj => obj.id === branches[i].id));
                                    this.companyBranches[objIndex] = branch;
                                    this.companyBranches[objIndex].collapse = true;
                                    this.companyForm.reset();
                                });


                            }
                        }
                    });
                });
            });   
        }
    }

    udpateCompany2(value){
        if(value.contact.www || value.contact.openingHours || value.contact.telephone || value.contact.email || value.contact.description){

            this.profileService.getUser().subscribe(user => {
                this.profileService.getCompanyBranches(user.company.id).subscribe(branches => {
                    for(let i = 0; i < branches.length; i++){
                        if(branches[i].main){
                            let bodyAdd = branches[i];
                            if(value.contact.www)
                                bodyAdd.website = value.contact.www;
                            if(value.contact.openingHours)
                                bodyAdd.openingHours = value.contact.street;
                            if(value.contact.telephone)
                                bodyAdd.phoneNumber = value.contact.telephone;
                            //if(value.contact.email)
                                //bodyAdd.email = value.contact.streetNo;
                            if(value.contact.description)
                                bodyAdd.description = value.contact.description;
                            
                            this.profileService.updateCompanyBranch(bodyAdd, branches[i].id).subscribe(branch => {
                                console.log('branch: ');
                                console.dir(branch);
                                this.additionalForm.reset();
                            });

                            
                        }
                    }
                });
            });

        }
    }

    deleteBranch(id: number): void{
        this.profileService.deleteBranch(id).subscribe(result => {
            this.companyBranches = this.companyBranches.filter((el) => {
                return el.id !== id
            });
        });

        this.profileService.deleteBranch(id).map(res => res.json()).subscribe(
            (data) => this.companyBranches = this.companyBranches.filter((el) => {
                return el.id !== id
            }),
            (err) => this.error = err
        );
    }

    addNewBranch(value): void{
        
        this.profileService.getUser().subscribe(user => {
            this.profileService.getCompanyBranches(user.company.id).subscribe(branches => {
                let size = branches.length;
                let body = {
                    "city": value.city,
                    "company": {
                        "category": {
                            "id": user.company.category.id,
                            "name": user.company.category.name
                        },
                        "id": user.company.id,
                        "name": user.company.name
                    },
                    "description": value.description,
                    "distance": 0,
                    "email": value.email,
                    "main": false,
                    "latitude": 0,
                    "longitude": 0,
                    "name": value.name,
                    "openingHours": value.openingHours,
                    "phoneNumber": value.phoneNumber,
                    "street": value.street,
                    "streetNo": value.streetNo,
                    "website": value.website
                }
                
                if(size === 0)
                    body.main = true;
                
                this.profileService.addNewBranch(body).subscribe(result => {
                    this.companyBranches.push(result);
                    this.branchForm.reset();

                    this.companyBranches.forEach((obj) =>{
                        obj.collapse = true;
                    });
                    this.isCollapse = !this.isCollapse;

                    console.log('result adding: ');
                    console.dir(result);
                });
            });
        });
    }

    editBranch(value:any, id: number){
        
        this.profileService.getCompanyBranch(id).subscribe(companyBranch => {

            Object.keys(value).forEach((key) => {
                if(value[key])
                    companyBranch[key] = value[key];
            });

            this.profileService.editBranch(companyBranch, companyBranch.id).subscribe(editedBranch => {
                let objIndex = this.companyBranches.findIndex((obj => obj.id === companyBranch.id));
                this.companyBranches[objIndex] = editedBranch;
                this.branchForm.reset();
            });

        });

    }

    changeMainBranch(id: number): void{
        this.profileService.getCompanyBranch(id).subscribe(companyBranch => {
            companyBranch.main = true;
            this.companyBranches[this.companyBranches.findIndex(x => x.main)].main = false;

            this.profileService.editBranch(companyBranch, id).subscribe(edited => {
                let objIndex = this.companyBranches.findIndex((obj => obj.id === companyBranch.id));
                this.companyBranches[objIndex] = edited;
                this.companyBranches.forEach((obj) =>{
                    obj.collapse = true;
                });
            });
        });
    }

    addCompanyImage(): void {
        if(this.fileUpload.file != null){
            this.profileService.getUser().subscribe(user => {
                this.profileService.addCompanyImage(new ImageModel(user.company.id, this.fileUpload.file)).subscribe(
                    data => {
                        this.otherImgs.imageUrl = data.imageUrl;
                        console.dir(this.fileUpload.file);
                    },
                    error => {}
                )
            });
            
        }
        else {
            console.log('nic nie uploadowano');
        }
    }
}