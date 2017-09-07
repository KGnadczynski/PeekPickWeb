import { Component, OnInit, ViewEncapsulation} from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ChangePasswordTokenService } from './change-password-token.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EqualPasswordsValidator } from '../../theme/validators';

@Component({
    selector: 'change-password-token',
    encapsulation: ViewEncapsulation.None,
    styles: [require('./change-password-token.scss')],
    template: require('./change-password-token.component.html'),
    providers: [ChangePasswordTokenService]
})

export class ChangePasswordTokenComponent implements OnInit{
    
    sub: any;
    token: string;
    emailForm: FormGroup;

    constructor(private changePasswordTokenService: ChangePasswordTokenService, private route: ActivatedRoute, private fb: FormBuilder){
        this.emailForm = fb.group({
            "passwords": fb.group({
                "password": ['', Validators.compose([Validators.required])],
                "repeatPassword": ['', Validators.compose([Validators.required])]
            }, {validator: EqualPasswordsValidator.validate('password', 'repeatPassword')})
        });
    }

    ngOnInit(): void {
        this.sub = this.route.params.subscribe(params => {
            this.token = params['token'];
            console.log('HEEEEEEJ toke:' + this.token);
        });
    }

    updatePassword(emailForm: any): void {
        console.log('emailForm:');
        console.dir(emailForm);

        this.changePasswordTokenService.updatePasswordWithToken(this.token, emailForm.passwords.password).subscribe(
            result => {
                console.log('result');
                console.dir(result);
            },
            error => {
                console.log('error: ');
                console.dir(error);
            }
        )
    }

}