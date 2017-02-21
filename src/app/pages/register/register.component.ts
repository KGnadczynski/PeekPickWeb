import {Component, ViewEncapsulation, OnInit} from '@angular/core';
import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import {EmailValidator, EqualPasswordsValidator} from '../../theme/validators';
import {RegisterService} from "./registerservice.component";
import {MainBranze, PodKategoria} from "./mainbranze";
import {RegisterObject} from "./user";
import {Router} from "@angular/router";
import {Subscription} from "rxjs";

@Component({
  selector: 'register',
  encapsulation: ViewEncapsulation.None,
  styles: [require('./register.scss')],
  template: require('./register.html'),
  providers: [RegisterService]
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

  ngOnInit() {
    this.registerService.getBranze().subscribe(
      data => {
        this.kategorieGlowne = data;
      },
      error => {
      });
  }


  constructor(fb: FormBuilder, private registerService: RegisterService,private router: Router) {

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
    this.registerJson = new RegisterObject();
    this.registerJson.user.name = this.user.name;
    this.registerJson.user.email = this.user.email;
    this.registerJson.user.password = this.user.password;
    this.registerJson.companyBranch.city = this.company.city;
    this.registerJson.companyBranch.main = false;
    this.registerJson.companyBranch.latitude = 51.412341;
    this.registerJson.companyBranch.longitude = 51.412341;
    this.registerJson.companyBranch.name = this.user.name;
    this.registerJson.companyBranch.street = this.company.street;
    this.registerJson.companyBranch.streetNo = this.company.streetNo;
    this.registerJson.companyBranch.company.name = this.user.name;
    this.registerJson.companyBranch.company.category.name = this.selectedKategoria.name;
    this.registerJson.companyBranch.company.category.id = this.selectedKategoria.id;
    this.registerJson.companyBranch.company.category.parentCategory.name = this.selectedParentKategoria.name;
    this.registerJson.companyBranch.company.category.parentCategory.id = this.selectedParentKategoria.id;
    if (this.form.valid) {
      this.busy = this.registerService.register(this.registerJson)
        .subscribe(
          data => {
            this.router.navigate(['/pages/emailconfirm']);
          },
          error => {
          });
    }
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

}
