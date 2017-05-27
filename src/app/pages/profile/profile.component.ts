import { Component,OnInit ,ViewEncapsulation, ViewChild, Output, EventEmitter, NgZone } from '@angular/core';
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
import { BaMenuService, BaPageTopService} from '../../theme';
import { Routes } from '@angular/router';
import { PAGES_MENU } from '../pages.menu';

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
    @ViewChild('msgs') messagesCom: MessagesComponent;
    name: string = '';

    constructor(private menuService: BaMenuService, private profileService: ProfileService, private _http: Http, private router: Router, private fb: FormBuilder){
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
                'website': '',
                'openingHours': '',
                'phoneNumber': '',
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
                    this.otherUser = user;
                    this.name = user.company.name;
                    this.companyForm.controls['name'].setValue(this.otherUser.company.name);
                    
                    this.idCompany = user.company.id;
                    this.profileService.getCompanyBranches(user.company.id).subscribe(
                        branches => {
                            console.log('branches: ');
                            console.dir(branches);
                            this.companyBranches = branches;
                            this.companyBranches.forEach((obj) => {
                                obj.collapse = true;
                            });
                            
                            let objIndex = this.companyBranches.findIndex((obj => obj.main));
                            let addressGroup = <FormGroup>this.companyForm.get('address');
                            let additionalGroup = <FormGroup>this.additionalForm.get('contact');
                            
                            addressGroup.setValue({
                                city: this.companyBranches[objIndex].city,
                                street: this.companyBranches[objIndex].street,
                                streetNo: this.companyBranches[objIndex].streetNo
                            });

                            additionalGroup.setValue({
                                website: this.companyBranches[objIndex].website,
                                openingHours: this.companyBranches[objIndex].openingHours,
                                phoneNumber: this.companyBranches[objIndex].phoneNumber,
                                email: this.companyBranches[objIndex].email,
                                description: this.companyBranches[objIndex].description
                            });

                        },
                        errI => {
                            console.log('Error from getCompanyBranches');
                            console.dir(errI);
                            /*if(errI.error === 'invalid_token'){
                                this.router.navigateByUrl('/pages/komunikat');
                                localStorage.removeItem('currentUserToken');
                                localStorage.removeItem('user');
                            }*/
                        }
                    );
                    this.profileService.getUserImages(user.company.id).subscribe(
                        images => {
                            this.otherImgs = images;
                            if(this.otherImgs.imageUrl){
                                this.defaultPicture = this.otherImgs.imageUrl;
                                this.profile.picture = this.otherImgs.imageUrl;
                            }
                                
                        },
                        errI => {
                            console.log('Error from get user images: ');
                            console.dir(errI);
                            /*if(errI.error === 'invalid_token'){
                                this.router.navigateByUrl('/pages/komunikat');
                                localStorage.removeItem('currentUserToken');
                                localStorage.removeItem('user');
                            }*/
                        }
                    )
                },
                err => {
                    console.log('error from user: ');
                    console.dir(err);
                    if(err.error === 'invalid_token'){
                        this.router.navigateByUrl('/pages/komunikat');
                        this.menuService.updateMenuByRoutes(<Routes>PAGES_MENU );
                        localStorage.removeItem('currentUserToken');
                        localStorage.removeItem('user');
                    }
                }
            );
        }
        else
            this.router.navigateByUrl('/pages/komunikat');

        }

    showActive(): void {
        this.messagesCom.getActivePost();
    }

    udpatePassword(values: any){
        this.profileService.updateUserPassword(values.oldPassword, values.passwords.password).subscribe(result => {
            this.passwordForm.reset();
            this.messageAfter = true;
        });
    }

    udpateCompanyName(value: any){

        this.addCompanyImage();

        this.profileService.getUser().subscribe(
            user => {
                let body = user.company;
                if(value.name){
                    body.name = value.name;
                    this.profileService.updateCompany(body, user.company.id).subscribe(
                        company => {
                            this.companyForm.reset();
                            this.otherUser.company = company;
                        },
                        errUser => {}
                    );
                }

                this.profileService.getMainCompanyBranch(user.company.id).subscribe(
                    mainBranch => {
                        let body = mainBranch;
                        Object.keys(value.address).forEach((key) => {
                            if(value.address[key])
                                body[key] = value.address[key];
                        });
                        this.profileService.updateCompanyBranch(body, body.id).subscribe(
                            updatedBranch => {
                                let objIndex = this.companyBranches.findIndex((obj => obj.id === updatedBranch.id));
                                this.companyBranches[objIndex] = updatedBranch;
                                this.companyBranches[objIndex].collapse = true;
                                this.companyForm.reset();
                            }
                        );
                    },
                    errMain => {}
                );
            },
            errUser => {}
        );

    }

    udpateCompanyAdditional(value: any){
        this.profileService.getUser().subscribe(
            user => {
                this.profileService.getCompanyBranches(user.company.id).subscribe(
                    branches => {
                        let objIndex = branches.findIndex((obj => obj.main));
                        let branch = branches[objIndex];
                        Object.keys(value.contact).forEach((key) => {
                            if(value.contact[key])
                                branch[key] = value.contact[key];
                        });
                        this.profileService.updateCompanyBranch(branch, branch.id).subscribe(
                            editedBranch => {
                                console.log('branch: ');
                                console.dir(branch);
                                this.additionalForm.reset();
                            }
                        );
                    },
                    errBranches => {
                        console.log('error get company branches:');
                        console.dir(errBranches);
                    }
                )
            },
            errUser => {
                console.log('error get company branches:');
                console.dir(errUser);
            }
        );

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
                    },
                    error => {
                        console.log('image add error: ');
                        console.dir(error);
                    }
                )
            });
            
        }
        else {
            console.log('nic nie uploadowano');
        }
    }
}