import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { ProfileService } from '../profile/profile.service';
import { Router } from "@angular/router";

@Component({
    selector: 'home',
    encapsulation: ViewEncapsulation.None,
    template: require('./home.component.html'),
    styles: [require('./home.scss')],
    providers: [ProfileService]
})

export class HomeComponent implements OnInit {

    constructor(private profileService: ProfileService, private router: Router){}

    ngOnInit():void {

        this.profileService.getUser().subscribe(
            result => {
              this.router.navigateByUrl('/pages/komunikat');
            },
            err => {
                
            }
          );
    }

}