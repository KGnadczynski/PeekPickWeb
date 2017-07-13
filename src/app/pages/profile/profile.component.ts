import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { ProfileService } from './profile.service';
import { ObjectList } from './user';
import { User } from './user';
import { Router } from '@angular/router';

@Component({
  selector: 'profile',
  encapsulation: ViewEncapsulation.None,
  styles: [require('./profile.scss')],
  template: require('./profile.html'),
  providers: [ProfileService]
})
export class ProfileComponent implements OnInit {

    otherUser: User;
    otherObject: ObjectList;
    otherImgs: any;
    imageUrl: string = "";
    idCompany: number;
    name: string = '';

    constructor(private profileService: ProfileService, private router: Router){}

    ngOnInit() {

        this.profileService.getUser().subscribe(
            user => {
                this.otherUser = user;
                this.name = user.company.name;
                this.idCompany = user.company.id;
                this.profileService.getUserImages(user.company.id).subscribe(
                    images => {
                        this.otherImgs = images;
                    }
                );
            },
            err => {
                this.router.navigateByUrl('/pages/komunikat');
            }
        );
    }

    public setLocationFromCompanyBranchList(companyBranchList:any): void {
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