import { Component, OnInit, ViewEncapsulation, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EqualPasswordsValidator } from '../../../../theme/validators';
import { ProfileService } from '../../profile.service';
import { ImageModel } from '../../../add-message/imagemodel';
import { BaMenuService, BaPageTopService } from '../../../../theme';
import { NgUploaderOptions } from 'ngx-uploader';
import { Router, Routes } from '@angular/router';
import { PAGES_MENU } from '../../../../pages/pages.menu';

@Component({
  selector: 'profile-edit',
  encapsulation: ViewEncapsulation.None,
  styles: [require('./profile-edit.scss')],
  template: require('./profile-edit.component.html'),
  providers: [ ProfileService ]
})

export class ProfileEditComponent implements OnInit {

    passwordForm: FormGroup;
    companyForm: FormGroup;
    emailForm: FormGroup;
    messageAfterUpdateCompany: boolean = false;
    companyBranches: any[];
    imageUrl: string = "";
    name: string = '';
    defaultPicture = 'assets/img/theme/add-icon.png';
    profile:any = {
        picture: 'assets/img/theme/add-icon.png'
    };
    // uploaderOptions:NgUploaderOptions = {
    //     url: '',
    // };
    isCollapse:boolean = true;
    afterEmailChange: string = "";
    afterPasswordChange: string = "";
    title: string = "czy jesteś pewien że chcesz usunąć konto?";

    @Input() otherUser: any;
    // @ViewChild('fileUpload') fileUpload:any;
    @Output() sendImage: EventEmitter<string> = new EventEmitter<string>();
    confirmClicked: boolean = false;
    cancelClicked: boolean = false;

    constructor(private fb: FormBuilder, private profileService: ProfileService, private menuService: BaMenuService, private pageTopService: BaPageTopService, private router: Router){
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

        this.emailForm = fb.group({
            'email': ['', Validators.compose([Validators.email, Validators.required])],
            'password': ['', Validators.compose([Validators.required])]
        });
    }

    ngOnInit(): void {
        this.profileService.getUser().subscribe(
            user => {
                this.companyForm.controls['name'].setValue(user.company.name);

                this.profileService.getMainCompanyBranch(user.company.id).subscribe(
                    branch => {
                        let addressGroup = <FormGroup>this.companyForm.get('address');
                        addressGroup.setValue({
                            city: branch.city,
                            street: branch.street,
                            streetNo: branch.streetNo
                        });
                    }
                );
                this.profileService.getCompanyBranches(user.company.id).subscribe(
                    branches => {
                        this.companyBranches = branches;
                        this.companyBranches.forEach((obj) => {
                            obj.collapse = true;
                        });
                    }
                );
                this.profileService.getUserImages(user.company.id).subscribe(
                    images =>{
                        if(images.imageUrl){
                            this.defaultPicture = images.imageUrl;
                            this.profile.picture = images.imageUrl;
                        }
                    }
                );
            }
        )
    }

    udpatePassword(values: any){
        this.profileService.updateUserPassword(values.oldPassword, values.passwords.password).subscribe(
            result => {
                this.passwordForm.reset();
                this.afterPasswordChange = "Pomyślnie zmieniono hasło";
            },
            error => {

            }
        );
    }

    udpateCompanyName(value: any){

        // this.addCompanyImage();

        this.profileService.getUser().subscribe(
            user => {
                let body = user.company;
                if(value.name){
                    body.name = value.name;
                    this.profileService.updateCompany(body, user.company.id).subscribe(
                        company => {
                            this.companyForm.reset();
                            this.otherUser.company = company;
                            this.messageAfterUpdateCompany = true;
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

    updateEmail(value: any): void{

        console.log('value');
        console.dir(value);
        
        this.profileService.updateEmail(value).subscribe(
            updated => {
                console.log('updated:');
                console.dir(updated);
                this.afterEmailChange = "Na adres: " + value.email + " został wysłana wiadomość.";
                this.emailForm.reset();
            },
            error =>{
                console.log('error:');
                console.dir(error);
                if(error.error === 'EMAIL_ADDRESS_IS_USED')
                    this.afterEmailChange = "Podano aktualny email";
                else if(error.error === 'WRONG_PASSWORD')
                    this.afterEmailChange = "Podano nieprawidłowe hasło";
            }
        );

        

    }

    removeUser(): void {

        this.profileService.getUser().subscribe(
            user => {
                this.profileService.removeUser(user.id).subscribe(
                    removedUser => {
                        console.log('removed user:');
                        console.dir(removedUser);
                        console.log('logging out');
                        localStorage.removeItem('currentUserToken');
                        localStorage.removeItem('user');
                        localStorage.removeItem('isTokenFCMRegister'); 
                        localStorage.removeItem('latitude');
                        localStorage.removeItem('longitude');
                        this.menuService.changedLoggedFlag(-1);
                        this.pageTopService.changedLoggedFlag(-1);
                        this.pageTopService.showLoadingBar(false);
                        this.menuService.updateMenuByRoutes(<Routes>PAGES_MENU );
                        this.router.navigate(['/komunikat']);
                        this.menuService.updateMenuByRoutes(<Routes>PAGES_MENU);
                    },
                    error => {}
                );
            },
            error => {}
        );
    }

}