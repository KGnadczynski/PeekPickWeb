import {Component, ViewEncapsulation, OnInit} from '@angular/core';
import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import {LoginService} from "./loginservice.component";
import {UserLogin} from "./userlogin";
import {Router} from "@angular/router";
import {URLSearchParams} from "@angular/http";
import {User} from "../komunikat/komunikatdodanie";
import { BaMenuService, BaPageTopService} from '../../theme';
import { Routes } from '@angular/router';
import { PAGES_MENU_LOGGED } from '../pageslogged.menu';
import { ProfileService } from '../profile/profile.service';

@Component({
  selector: 'login',
  encapsulation: ViewEncapsulation.None,
  styles: [require('./login.scss')],
  template: require('./login.html'),
  providers: [LoginService, ProfileService]
})
export class Login implements OnInit{

  public form:FormGroup;
  public email:AbstractControl;
  public password:AbstractControl;
  public submitted:boolean = false;
  userFromServer:User
  userJson: UserLogin;
  user :any = {};
  error: any;

  constructor(
    private profileService: ProfileService, 
    private fb:FormBuilder, 
    private loginService: LoginService,
    private _menuService: BaMenuService, 
    private router: Router,
    private pageTopService: BaPageTopService) {
    this.form = fb.group({
      'email': ['', Validators.compose([Validators.required])],
      'password': ['', Validators.compose([Validators.required])]
    });

    this.email = this.form.controls['email'];
    this.password = this.form.controls['password'];
    
  }

  ngOnInit():void{

      let currentUser = JSON.parse(localStorage.getItem('currentUserToken'));

      if(currentUser != null){
          this.profileService.getUser().subscribe(
            result => {
              this.router.navigateByUrl('/pages/komunikat');
            },
            err => {
                /*this.router.navigateByUrl('/pages/komunikat');
                this._menuService.updateMenuByRoutes(<Routes>PAGES_MENU_LOGGED );
                this.pageTopService.changedLoggedFlag(-1);
                if(localStorage.getItem('currentUserToken'))
                  localStorage.removeItem('currentUserToken');
                if(localStorage.getItem('user'))
                  localStorage.removeItem('user');*/
            }
          );
      } else {
          // this.router.navigateByUrl('/pages/komunikat');
      }
  }

  onScroll () {
	    console.log('scrolled!!')
	}

  public onSubmit(values:Object):void {
    console.log('onsubmit');
    this.submitted = true;
    if (this.form.valid) {
      let body = new URLSearchParams();
      body.set('password', this.user.password);
      body.set('username', this.user.email);
      body.set('grant_type', "password");
      body.set('client_secret', "client_secret");
      body.set('client_id', "clientapp");
      this.pageTopService.showLoadingBar(true);
      this.loginService.login(body).subscribe(
          data => {
              localStorage.setItem('currentUserToken', JSON.stringify({ token: data, name: name }));
              this.loginService.getInfo().subscribe(
                data => {
                      this.userFromServer = data
                      console.log(this.userFromServer.company.id);
                      localStorage.setItem('user', JSON.stringify({ user: data}));    
                      this.loginService.getInfoForCompanyFromUser(this.userFromServer.company.id).subscribe(
                           data => {
                             localStorage.setItem('companyBranchList', JSON.stringify({ companyBranchList: data})); 
                             this._menuService.updateMenuByRoutes(<Routes>PAGES_MENU_LOGGED );
                            //  this.pageTopService.changedLoggedFlag(this.userFromServer.company.id);
                             this.pageTopService.changedLoggedFlag(this.userFromServer.company.id);
                             this._menuService.changedLoggedFlag(this.userFromServer.company.id);
                             this.pageTopService.showLoadingBar(false);
                             this.router.navigate(['/komunikat']);
                            },
                             error => {
                               console.log('error in inside');
                           });                    
                    },
                    error => {
                      console.log('error inside');
                    });
                    this.error = null;
          },
          error => {
            console.log('error outside');
            console.dir(error);
            this.error = error;
            if(this.error.error_description === "Bad credentials")
              this.error.error_description = "Zły login lub hasło";
          });
    }
  }
}
