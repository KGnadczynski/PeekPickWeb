import { Component } from '@angular/core';
import { Routes } from '@angular/router';

import { BaMenuService } from '../theme';
import { PAGES_MENU } from './pages.menu';
import { PAGES_MENU_LOGGED } from './pageslogged.menu';

@Component({
  selector: 'pages',
  template: `
  <ba-sidebar></ba-sidebar>
  <ba-page-top></ba-page-top>
  <div class="al-main">
  <div class="al-content">
    <router-outlet></router-outlet>
    </div>
    </div>
    <ba-back-top position="200"></ba-back-top>
    `
})
export class Pages {

  constructor(private _menuService: BaMenuService) {
  }

  ngOnInit() {
      if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(this.setPosition);
      }
   
     var currentUser = JSON.parse(localStorage.getItem('currentUserToken'));
    if(currentUser != null) {
       this._menuService.updateMenuByRoutes(<Routes>PAGES_MENU_LOGGED);
    } else {
      this._menuService.updateMenuByRoutes(<Routes>PAGES_MENU);
    }
   
  }

  setPosition(position){
    console.log(position.coords);
    localStorage.setItem('latitude', JSON.stringify({ latitude: position.coords.latitude})); 
    localStorage.setItem('longitude', JSON.stringify({ longitude: position.coords.longitude})); 
  }
}
