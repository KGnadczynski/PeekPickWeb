import { Component, OnInit } from '@angular/core';
import { Routes } from '@angular/router';
import { BaMenuService, BaPageTopService } from '../theme/services';
import { PAGES_MENU } from './pages.menu';
import { PAGES_MENU_LOGGED } from './pageslogged.menu';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'pages',
  templateUrl: './pages.component.html'
})

export class Pages implements OnInit {

    currentUser: any;
    showSearch: boolean = false;
    subscription: Subscription;

    constructor(private _menuService: BaMenuService, private pageTopService: BaPageTopService) {
        this.subscription = this.pageTopService.getMessage().subscribe(message => {
          console.log('message: ' + message.text);
          this.showSearch = !this.showSearch;
      });
    }

    ngOnInit() {

        this.currentUser = JSON.parse(localStorage.getItem('currentUserToken'));
        
        if(this.currentUser != null) {
            this._menuService.updateMenuByRoutes(<Routes>PAGES_MENU_LOGGED);
        } else {
            this._menuService.updateMenuByRoutes(<Routes>PAGES_MENU);
        }
   
    }

}
