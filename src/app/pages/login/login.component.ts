import {Component, ViewEncapsulation} from '@angular/core';
import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import {LoginService} from "./loginservice.component";
import {UserLogin} from "./userlogin";
import {Router} from "@angular/router";
import {URLSearchParams} from "@angular/http";

@Component({
  selector: 'login',
  encapsulation: ViewEncapsulation.None,
  styles: [require('./login.scss')],
  template: require('./login.html'),
  providers: [LoginService]
})
export class Login {

  public form:FormGroup;
  public email:AbstractControl;
  public password:AbstractControl;
  public submitted:boolean = false;
  userJson: UserLogin;
  user :any = {};

  constructor(fb:FormBuilder, private loginService: LoginService, private router: Router) {
    this.form = fb.group({
      'email': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      'password': ['', Validators.compose([Validators.required, Validators.minLength(4)])]
    });

    this.email = this.form.controls['email'];
    this.password = this.form.controls['password'];
  }

  public onSubmit(values:Object):void {
    this.submitted = true;
    if (this.form.valid) {
      let body = new URLSearchParams();
      body.set('password', this.user.password);
      body.set('username', this.user.email);
      body.set('grant_type', "password");
      body.set('client_secret', "client_secret");
      body.set('client_id', "clientapp");

      this.loginService.login(body).subscribe(
          data => {
            this.router.navigate(['/komunikat']);
          },
          error => {
          });
      }
  }
}
