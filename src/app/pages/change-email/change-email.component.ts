import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ChangeEmailService } from './change-email.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EqualPasswordsValidator } from '../../theme/validators';
import { BaMenuService } from '../../theme';

@Component({
    selector: 'change-email',
    encapsulation: ViewEncapsulation.None,
    template: require('./change-email.component.html'),
    styles: [require('./change-email.scss')],
    providers: [ChangeEmailService, BaMenuService]
})

export class ChangeEmailComponent implements OnInit {

    info: string = "Twój e-mail został zmieniony";
    value: string;
    type: string;
    ifEmail: boolean = false;
    ifPassword: boolean = false;
    emailForm: FormGroup;
    message: string = "";

    constructor(private activatedRoute: ActivatedRoute, private service: ChangeEmailService, private fb: FormBuilder, private menuService: BaMenuService){
        this.emailForm = fb.group({
            "passwords": fb.group({
                "password": ['', Validators.compose([Validators.required])],
                "repeatPassword": ['', Validators.compose([Validators.required])]
            }, {validator: EqualPasswordsValidator.validate('password', 'repeatPassword')})
        });
    }

    ngOnInit(): void {
        this.activatedRoute.queryParams.subscribe(params => {
            this.value = params.value;
            this.type = params.type;

            switch (this.type) {
                case 'reset_password':
                    this.ifPassword = true;
                    break;
                case 'change_email':
                    this.ifEmail = true;
                    this.service.setNewEmail(this.value).subscribe(
                        result => {
                            console.log('result:');
                            console.dir(result);
                            this.menuService.changeEmail(result.data);
                        },
                        error => {
                            console.log('error:');
                            console.dir(error);
                        }
                    );
                    break;
            
                default:
                    break;
            }

            

        });
    }

    updatePassword(emailForm: any, token): void {
        console.log('emailForm:');
        console.dir(emailForm);

        this.service.updatePasswordWithToken(this.value, emailForm.passwords.password).subscribe(
            result => {
                console.log('result');
                console.dir(result);
                this.message = "Hasło zostało zmienione";
                this.emailForm.reset();
            },
            error => {
                console.log('error: ');
                console.dir(error);
            }
        );
    }

}