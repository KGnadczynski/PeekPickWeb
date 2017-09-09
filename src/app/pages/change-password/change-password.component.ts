import { Component, OnInit, ViewEncapsulation} from '@angular/core';
import { ChangePasswordService } from './change-password.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
    selector: 'change-password',
    encapsulation: ViewEncapsulation.None,
    styles: [require('./change-password.scss')],
    template: require('./change-password.component.html'),
    providers: [ChangePasswordService]
})

export class ChangePasswordComponent implements OnInit {

    emailForm: FormGroup;
    title: string = "podaj przypisany do Twojego konta adres e-mail. Wyślemy Ci link do zmiany hasła.";

    constructor(private changePasswordService: ChangePasswordService, private fb: FormBuilder){
        this.emailForm = fb.group({
            email: ['', Validators.compose([Validators.required, Validators.email])]
        });
    }

    ngOnInit(): void {
        
    }

    changePassword(emailForm: any): void {
        
        this.changePasswordService.passwordReset(emailForm).subscribe(
            reset => {
                console.log('reset:');
                console.dir(reset);
                
            },
            error => {
                console.log('error:');
                console.dir(error);
            }
        )

    }

}