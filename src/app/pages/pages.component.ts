import { Component } from '@angular/core';
import { Routes } from '@angular/router';

import { BaMenuService } from '../theme';
import { PAGES_MENU } from './pages.menu';
import { PAGES_MENU_LOGGED } from './pageslogged.menu';

@Component({
  selector: 'pages',
  templateUrl: './pages.component.html' 
})
export class Pages {

    currentUser: any;

    constructor(private _menuService: BaMenuService) {}

    ngOnInit() {
        if(navigator.geolocation)
          navigator.geolocation.getCurrentPosition(this.setPosition);
   
        this.currentUser = JSON.parse(localStorage.getItem('currentUserToken'));
        
        if(this.currentUser != null) {
            this._menuService.updateMenuByRoutes(<Routes>PAGES_MENU_LOGGED);
        } else {
            this._menuService.updateMenuByRoutes(<Routes>PAGES_MENU);
        }
   
    }

    setPosition(position){
        localStorage.setItem('latitude', JSON.stringify({ latitude: position.coords.latitude})); 
        localStorage.setItem('longitude', JSON.stringify({ longitude: position.coords.longitude})); 
    }
}
