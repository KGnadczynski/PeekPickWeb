import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ProfileService } from '../../profile.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
    selector: 'profile-branches',
    encapsulation: ViewEncapsulation.None,
    styles: [require('./profile-branches.scss')],
    template: require('./profile-branches.component.html'),
    providers: [ProfileService]
})

export class ProfileBranchesComponent implements OnInit {

	companyBranches: any[];
	isCollapse:boolean = true;
	error: string = "";

	title: string = 'Czy jesteś pewny że chcesz usunąć ten oddział?';
    confirmClicked: boolean = false;
    cancelClicked: boolean = false;
    isOpen: boolean = false;

    constructor(private profileService: ProfileService, private fb: FormBuilder){}

    ngOnInit(): void {

        this.profileService.getUser().subscribe(
            user => {
                this.profileService.getCompanyBranches(user.company.id).subscribe(
                    branches => {
                        this.companyBranches = branches;
                        this.companyBranches.forEach((obj) => {
                            obj.collapse = true;
                        });
                    }
                );
            }
        );
    }
    
    addOrEdit(event: any){
        console.log('emmitiing is working');
        console.dir(event);
    }
	
	editBranch(value:any, id: number){
        
        this.profileService.getCompanyBranch(id).subscribe(companyBranch => {

            Object.keys(value).forEach((key) => {
                if(value[key])
                    companyBranch[key] = value[key];
            });

            this.profileService.editBranch(companyBranch, companyBranch.id).subscribe(editedBranch => {
                let objIndex = this.companyBranches.findIndex((obj => obj.id === companyBranch.id));
                this.companyBranches[objIndex] = editedBranch;
                this.companyBranches[objIndex].collapse = !this.companyBranches[objIndex].collapse;
            });
        });

	}
	
	addNewBranch(value): void{

        this.profileService.getUser().subscribe(user => {
            this.profileService.getCompanyBranches(user.company.id).subscribe(branches => {
                let size = branches.length;
                let body = {
                    "city": value.city,
                    "company": {
                        "category": {
                            "id": user.company.category.id,
                            "name": user.company.category.name
                        },
                        "id": user.company.id,
                        "name": user.company.name
                    },
                    "description": value.description,
                    "distance": 0,
                    "email": value.email,
                    "main": false,
                    "latitude": 0,
                    "longitude": 0,
                    "name": value.name,
                    "openingHours": value.openingHours,
                    "phoneNumber": value.phoneNumber,
                    "street": value.street,
                    "streetNo": value.streetNo,
                    "website": value.website
                }
                
                if(size === 0)
                    body.main = true;
                
                this.profileService.addNewBranch(body).subscribe(result => {
                    this.companyBranches.push(result);
                    
                    this.companyBranches.forEach((obj) =>{
                        obj.collapse = true;
                    });
                    this.isCollapse = !this.isCollapse;

                    console.log('result adding: ');
                    console.dir(result);
                },
                error => {
                    console.log('error post');
                    console.dir(error);
                }
                );
            });
        });
    }
	
	deleteBranch(id: number): void{
        console.log('deleteing');

        this.profileService.deleteBranch(id).subscribe(
            result => {
                this.companyBranches = this.companyBranches.filter((el) => {
                    return el.id !== id
                });
            },
            error => {
                this.error = "Nie można usunąć głównego oddziału";
                console.log('error from deleting: ');
                console.dir(error);
            }
        )
        
	}
	
	changeMainBranch(id: number): void{
        this.profileService.getCompanyBranch(id).subscribe(companyBranch => {
            if(companyBranch.latitude != 0 && companyBranch.longitud) {
                localStorage.setItem('latitude', companyBranch.latitude);
                localStorage.setItem('longitude', companyBranch.longitude);
            }
            companyBranch.main = true;
            this.companyBranches[this.companyBranches.findIndex(x => x.main)].main = false;

            this.profileService.editBranch(companyBranch, id).subscribe(edited => {
                let objIndex = this.companyBranches.findIndex((obj => obj.id === companyBranch.id));
                this.companyBranches[objIndex] = edited;
                this.companyBranches.forEach((obj) =>{
                    obj.collapse = true;
                });
            });
        });
    }

}