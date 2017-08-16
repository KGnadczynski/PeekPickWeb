import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { LoginService } from "./loginservice.component";
import { UserLogin } from "./userlogin";
import { Router } from "@angular/router";
import { URLSearchParams } from "@angular/http";
import { User } from "../komunikat/komunikatdodanie";
import { BaMenuService, BaPageTopService } from '../../theme';
import { Routes } from '@angular/router';
import { PAGES_MENU_LOGGED } from '../pageslogged.menu';
import { ProfileService } from '../profile/profile.service';
import { ToastyService, ToastyConfig, ToastOptions, ToastData} from 'ng2-toasty';
import { GlobalState } from '../../global.state'

@Component({
	selector: 'login',
	encapsulation: ViewEncapsulation.None,
	styles: [
		require('./login.scss'),
		require('../../../../node_modules/ng2-toasty/style-bootstrap.css')
	],
	template: require('./login.html'),
	providers: [LoginService, ProfileService, ToastyService]
})
export class Login implements OnInit{

	public form:FormGroup;
	public email:AbstractControl;
	public password:AbstractControl;
	public submitted:boolean = false;
	userFromServer:User
	userJson: UserLogin;
	user :any = {};

	constructor(
		private profileService: ProfileService, 
		private fb:FormBuilder, 
		private loginService: LoginService,
		private _menuService: BaMenuService, 
		private router: Router,
		private pageTopService: BaPageTopService,
		private toastyService: ToastyService,
		private toastyConfig: ToastyConfig,
		private _state:GlobalState
	){
		this.form = fb.group({
		'email': ['', Validators.compose([Validators.required])],
		'password': ['', Validators.compose([Validators.required])]
		});

		this.email = this.form.controls['email'];
		this.password = this.form.controls['password'];
		
	}

	ngOnInit(): void{

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
	
	addToast(message: string): void {
		let toastOptions: ToastOptions = {
			title: 'Błąd',
			msg: message,
			showClose: true,
			timeout: 5000,
			theme: 'bootstrap',
			onAdd: (toast: ToastData) => {},
			onRemove: function(toast: ToastData) {}
		};

		this.toastyService.error(toastOptions);
	}

	onScroll () {
		console.log('scrolled!!')
	}

	public onSubmit(values:Object): void {
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
								var companyBranchList = JSON.stringify({ companyBranchList: data});
								localStorage.setItem('companyBranchList', companyBranchList); 
								this._menuService.updateMenuByRoutes(<Routes>PAGES_MENU_LOGGED );
								this.setLocationFromCompanyBranchList(companyBranchList);
								this.pageTopService.changedLoggedFlag(this.userFromServer.company.id);
								this._menuService.changedLoggedFlag(this.userFromServer.company.id);
								this.pageTopService.showLoadingBar(false);
								this._state.notifyDataChanged('menu.isCollapsed',true);
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
					console.log('error outside');
					console.dir(error);
					this.addToast('Zły login lub hasło');
				}
			);
		}
	}

	public setLocationFromCompanyBranchList(companyBranchList:any) :void {
		console.log('seting correct latitiude and longitude '+JSON.parse(companyBranchList));
		var companyBranchListVar = JSON.parse(companyBranchList);
		console.log('seting correct latitiude and longitude '+companyBranchListVar.companyBranchList);
		for (let entry of companyBranchListVar.companyBranchList) {
			console.log('Hello '+entry.main); // 1, "string", false
			if(entry.main) {
				localStorage.setItem('latitude', entry.latitude);
				localStorage.setItem('longitude', entry.longitude);
			}
		}
	}

}
