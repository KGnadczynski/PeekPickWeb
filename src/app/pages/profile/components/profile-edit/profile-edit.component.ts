import { Component, OnInit, ViewEncapsulation, Input, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { EqualPasswordsValidator } from '../../../../theme/validators';
import { NgUploaderOptions } from 'ngx-uploader';

@Component({
  selector: 'profile-edit',
  encapsulation: ViewEncapsulation.None,
  styles: [require('./profile-edit.scss')],
  template: require('./profile-edit.component.html'),
})

export class ProfileEditComponent implements OnInit {

    @Input() otherProfile: any;
    passwordForm: FormGroup;
    public defaultPicture = 'assets/img/theme/add-icon.png';
    public profile:any = {
        picture: 'assets/img/theme/add-icon.png'
    };
    public uploaderOptions:NgUploaderOptions = {
        url: '',
    };
    @ViewChild('fileUpload') public fileUpload:any;

    constructor(private fb: FormBuilder){
      this.passwordForm = fb.group({
            'oldPassword': [null, Validators.required],
            'passwords': fb.group({
                'password': [null, Validators.compose([Validators.required, Validators.minLength(4)])],
                'repeatPassword': [null, Validators.compose([Validators.required, Validators.minLength(4)])],
            }, {validator: EqualPasswordsValidator.validate("password", "repeatPassword")})
        });
    }

    ngOnInit(): void {

    }

    udpatePassword(values: any){
        this.profileService.updateUserPassword(values.oldPassword, values.passwords.password).subscribe(result => {
            this.passwordForm.reset();
            this.messageAfter = true;
        });
    }

}