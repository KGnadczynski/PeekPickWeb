import {Component, ViewEncapsulation, OnInit, NgZone} from '@angular/core';
import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import {EmailValidator, EqualPasswordsValidator} from '../../theme/validators';
import {RegisterService} from "./registerservice.component";
import {MainBranze, PodKategoria} from "./mainbranze";
import {RegisterObject} from "./user";
import {LoginService} from "../login/loginservice.component";
import {Router} from "@angular/router";
import {Subscription} from "rxjs";
import * as authorization from "auth-header";
import {DiggitsObject} from "./user";
import {URLSearchParams} from "@angular/http";
import {User} from "../komunikat/komunikatdodanie";
import { BaMenuService , BaPageTopService} from '../../theme';
import { Routes } from '@angular/router';
import { PAGES_MENU_LOGGED } from '../pageslogged.menu';
import { ProfileService } from '../profile/profile.service';
import { MapsAPILoader } from '@agm/core';

declare var window: any

@Component({
  selector: 'register',
  encapsulation: ViewEncapsulation.None,
  styles: [require('./register.scss')],
  template: require('./register.html'),
  providers: [RegisterService,LoginService, ProfileService]
})
export class Register implements OnInit {

  public form: FormGroup;
  public name: AbstractControl;
  public email: AbstractControl;
  public password: AbstractControl;
  public repeatPassword: AbstractControl;
  public passwords: FormGroup;
  busy: Subscription;
 
  public submitted: boolean = false;

  user:any = {};
  company:any = {};
  result: any;
  registerJson: RegisterObject;
  kategorieGlowne = Array<MainBranze>();
  selectedParentKategoria: MainBranze;
  selectedKategoria: PodKategoria;
  podKategorie = Array<MainBranze>();
  userFromServer:User
  static latitude;
  static  longitude;
  error: any;
  geocoder:any;
  registerError:boolean = false;
  
  ngOnInit() {
    this.registerService.getBranze().subscribe(
      data => {
        this.kategorieGlowne = data;
      },
      error => {
      });

      let currentUser = JSON.parse(localStorage.getItem('currentUserToken'));

      if(currentUser != null){
            this.profileService.getUser().subscribe(
            result => {
                this.router.navigateByUrl('/pages/komunikat');
            },
            err => {}
          );
      }
  }


  constructor(
    private fb: FormBuilder, 
    private registerService: RegisterService,
    private loginService: LoginService,
    private router: Router,
    private zone:NgZone,
    private _menuService: BaMenuService,
    private pageTopService: BaPageTopService,
    private profileService: ProfileService,
    private mapsAPILoader: MapsAPILoader
  ){

     this.mapsAPILoader.load().then(() => {
            console.log('google script loaded');
            this.geocoder = new google.maps.Geocoder();
            console.log(this.geocoder);
      });

    window.angularComponentRef = {
      zone: this.zone,
      component: this
    };

    this.form = fb.group({
      'name': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      'email': ['', Validators.compose([Validators.required, EmailValidator.validate])],
      'passwords': fb.group({
        'password': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
        'repeatPassword': ['', Validators.compose([Validators.required, Validators.minLength(4)])]
      }, {validator: EqualPasswordsValidator.validate('password', 'repeatPassword')})
    });

    this.name = this.form.controls['name'];
    this.email = this.form.controls['email'];
    this.passwords = <FormGroup> this.form.controls['passwords'];
    this.password = this.passwords.controls['password'];
    this.repeatPassword = this.passwords.controls['repeatPassword'];
  }

  public onSubmit(values: Object): void {
   
    var value :any = {};
     this.registerUser(value,fun => {
             this.registerCallback(value);  
        });
  }

  registerUser(value,fn): void{
        var address = this.company.city+" "+this.company.street+" "+this.company.streetNo;
            console.log('address'+ address);
            this.geocoder.geocode( { 'address': address}, function(results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
              value.latitude  = results[0].geometry.location.lat();
              value.longitude =  results[0].geometry.location.lng();
              console.log('correct  address');
             fn(value);
             
            } else {
              value.error = true;
              console.log('wrong  address');
               fn(value);
            } 
        }); 
       
    }


    registerCallback(value) :void {

    if(value.error == null) {
       window.onLoginButtonClick();
      this.registerJson = new RegisterObject();
      this.registerJson.user.name = this.user.name;
      this.registerJson.user.email = this.user.email;
      this.registerJson.user.password = this.user.password;
      this.registerJson.companyBranch.city = this.company.city;
      this.registerJson.companyBranch.main = false;
      this.registerJson.companyBranch.latitude = value.latitude;
      this.registerJson.companyBranch.longitude = value.longitude;
      
      this.registerJson.companyBranch.name = this.user.name;
      this.registerJson.companyBranch.street = this.company.street;
      this.registerJson.companyBranch.streetNo = this.company.streetNo;
      this.registerJson.companyBranch.company.name = this.user.name;
      this.registerJson.companyBranch.company.category.name = this.selectedKategoria.name;
      this.registerJson.companyBranch.company.category.id = this.selectedKategoria.id;
      this.registerJson.companyBranch.company.category.parentCategory.name = this.selectedParentKategoria.name;
      this.registerJson.companyBranch.company.category.parentCategory.id = this.selectedParentKategoria.id;
    } else {
      this.registerError = true;
    }
    }

public onSubmitDigitsCallback(req: any): void {
    console.log('calledFromOutside on submit');
    var apiUrl = req.apiUrl;
    var credentials = req.credentials;
    var verified = true;
    var messages = [];


    //console.log(credentials);
    // Get authorization header.
     var auth = authorization.parse(credentials);
     console.log(auth);
    // OAuth authentication not provided.

    if (auth.scheme != 'OAuth') {
      verified = false;
      messages.push('Invalid auth type.');
     }

  // Verify the OAuth consumer key.
  if (auth.params.oauth_consumer_key != 'ZzsVNIxtpghaF2Lroz0cZC9q9') {
    verified = false;
    messages.push('The Digits API key does not match.');
  }

  // Verify the hostname.
  var hostname = apiUrl;
  if (hostname != 'api.digits.com' && hostname != 'api.twitter.com') {
    verified = false;
    messages.push('Invalid API hostname.');
  }

  // Do not perform the request if the API key or hostname are not verified.
  if (!verified) {

  }

  // Prepare the request to the Digits API.
  var options = {
    url: apiUrl,
    headers: {
      'Authorization': credentials
    }
  };

  
  var digitsObject = new DiggitsObject();
  digitsObject.url = apiUrl;
  digitsObject.credentials = credentials;
  console.log("Diggits URL"+digitsObject.url);
  console.log("lattiude registring "+this.registerJson.companyBranch.latitude);
  this.registerService.getDigits(digitsObject).subscribe(data => {
          this.registerJson.user.phoneNumber = data.phoneNumber;
          this.registerJson.token.value = data.token;
          this.busy = this.registerService.register(this.registerJson)
        .subscribe(
          data => {
            console.log(data);
            localStorage.setItem('latitude', this.registerJson.companyBranch.latitude.toString()); 
            localStorage.setItem('longitude', this.registerJson.companyBranch.longitude.toString()); 
            localStorage.setItem('user', JSON.stringify({ user: data}));
            let body = new URLSearchParams();
            body.set('password', this.registerJson.user.password);
            body.set('username', this.registerJson.user.email);
            body.set('grant_type', "password");
            body.set('client_secret', "client_secret");
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
                             this.pageTopService.changedLoggedFlag(this.userFromServer.company.id);    
                             this._menuService.changedLoggedFlag(this.userFromServer.company.id);   
                             this.pageTopService.showLoadingBar(false);
                             this.router.navigate(['/komunikat']);
                            },
                             error => {
                               this.pageTopService.showLoadingBar(false);
                               console.log('error in inside');
                           });                    
                    },
                    error => {
                      this.pageTopService.showLoadingBar(false);
                      console.log('error inside');
                    });
                  },
                  error => {
                    this.pageTopService.showLoadingBar(false);
                  });
            },
          error => {
            this.pageTopService.showLoadingBar(false);
            console.dir('HELLO '+error);   
            this.error= error;
             if(this.error.error_description === "PHONE_NUMBER_IS_USED") {
               this.error.error_description = "Podany numer telefonu jest już w użyciu";
             } else if (this.error.error_description === "EMAIL_IS_USED") {
               this.error.error_description = "Podany email jest już w użyciu";
            } else {
              this.error.error_description = "Podany adres nie istnieje";
            }
          }); 
        },
        error => {
          this.pageTopService.showLoadingBar(false);
        });
  }


  changePodkategorie() {
    if (this.selectedParentKategoria) {
      this.registerService.getPodBranze(this.selectedParentKategoria.id).subscribe(
        data => {
          this.podKategorie = data;
        },
        error => {
        });
    }
  }

  onLoginButtonClick() {
    window.onLoginButtonClick();
  }




}
