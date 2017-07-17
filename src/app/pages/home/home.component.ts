import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { ProfileService } from '../profile/profile.service';
import { Router } from "@angular/router";
import {GlobalState} from '../../global.state'

@Component({
    selector: 'home',
    encapsulation: ViewEncapsulation.None,
    template: require('./home.component.html'),
    styles: [require('./home.scss')],
    providers: [ProfileService]
})

export class HomeComponent implements OnInit {

    constructor(private profileService: ProfileService, private router: Router, private _state:GlobalState){
        this._state.notifyDataChanged('menu.isCollapsed',true);
    }

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