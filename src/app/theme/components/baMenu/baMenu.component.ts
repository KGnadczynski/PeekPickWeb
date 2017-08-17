import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { BaMenuService } from '../../services';
import { GlobalState } from '../../../global.state';
import 'style-loader!./baMenu.scss';
import { ProfileService } from '../../../pages/profile/profile.service';
import { BaPageTopService } from '../../services';
import { PAGES_MENU } from '../../../pages/pages.menu';
import { Routes } from '@angular/router';

@Component({
  selector: 'ba-menu',
  templateUrl: './baMenu.html',
  providers: [ ProfileService ]
})

export class BaMenu implements OnInit {

  @Input() sidebarCollapsed: boolean = false;
  @Input() menuHeight: number;
  @Output() expandMenu = new EventEmitter<any>();

  public menuItems: any[];
  protected _menuItemsSub: Subscription;
  public showHoverElem: boolean;
  public hoverElemHeight: number;
  public hoverElemTop: number;
  protected _onRouteChange: Subscription;
  public outOfArea: number = -200;
  public imageUrl: string;
  public name: string;
  public companyName: string;
  public email: string;
  public isLoggedIn: boolean = false;

  constructor(private _router: Router, private _service: BaMenuService, private _state: GlobalState, private profileService: ProfileService, private pageTopService: BaPageTopService) {
    this._service.loggedChange.subscribe((value) => {
        this.profileService.getUser().subscribe(
          user => {
              this.isLoggedIn = true;
              this.companyName = user.company.name;
              this.email = user.email;
              this.profileService.getUserImages(value).subscribe(
                  images => {
                      this.imageUrl = images.imageUrl;
                  },
                  error => {
                      this.name = user.company.name;
                  }
              );
          },
          error => {
              this.isLoggedIn = false;
          }
        )
    });

    this._service.imageChange.subscribe((url) => {
        this.imageUrl = url;
        this.name = null;
    });
  }

  public updateMenu(newMenuItems) {
    this.menuItems = newMenuItems;
    this.selectMenuAndNotify();
  }

  public selectMenuAndNotify(): void {
    if (this.menuItems) {
      this.menuItems = this._service.selectMenuItem(this.menuItems);
      this._state.notifyDataChanged('menu.activeLink', this._service.getCurrentItem());
    }
  }

  ngOnInit(): void {

    this.profileService.getUser().subscribe(
        user => {
            console.log('logged in: ');
            console.dir(user);
            this.companyName = user.company.name;
            this.email = user.email;
            this.isLoggedIn = true;
            this.profileService.getUserImages(user.company.id).subscribe(
                images => {
                    this.imageUrl = images.imageUrl;
                    console.log('images:');
                    console.dir(images);
                },
                error => {
                    this.name = user.company.name;
                }
            )
        },
        error => {
            console.log('not logged in, in bamenu component: ');
            console.dir(error);
            this.isLoggedIn = false;
            this._service.updateMenuByRoutes(<Routes>PAGES_MENU);
        }
    )

    this._onRouteChange = this._router.events.subscribe((event) => {

      if (event instanceof NavigationEnd) {
        if (this.menuItems) {
          this.selectMenuAndNotify();
        } else {
          // on page load we have to wait as event is fired before menu elements are prepared
          setTimeout(() => this.selectMenuAndNotify());
        }
      }
    });

    this._menuItemsSub = this._service.menuItems.subscribe(this.updateMenu.bind(this));
  }

  public ngOnDestroy(): void {
    this._onRouteChange.unsubscribe();
    this._menuItemsSub.unsubscribe();
  }

  public hoverItem($event): void {
    this.showHoverElem = true;
    this.hoverElemHeight = $event.currentTarget.clientHeight;
    // TODO: get rid of magic 66 constant
    this.hoverElemTop = $event.currentTarget.getBoundingClientRect().top - 66;
  }

  public toggleSubMenu($event): boolean {
    let submenu = jQuery($event.currentTarget).next();

    if (this.sidebarCollapsed) {
      this.expandMenu.emit(null);
      if (!$event.item.expanded) {
        $event.item.expanded = true;
      }
    } else {
      $event.item.expanded = !$event.item.expanded;
      submenu.slideToggle();
    }

    return false;
  }

  logout(): void {
      console.log('logging out');
      localStorage.removeItem('currentUserToken');
      localStorage.removeItem('user');
      localStorage.removeItem('isTokenFCMRegister'); 
      localStorage.removeItem('latitude');
      localStorage.removeItem('longitude');
      this._service.changedLoggedFlag(-1);
      this.pageTopService.changedLoggedFlag(-1);
      this.pageTopService.showLoadingBar(false);
      this._service.updateMenuByRoutes(<Routes>PAGES_MENU );
      this._router.navigate(['/komunikat']);
      this._service.updateMenuByRoutes(<Routes>PAGES_MENU);
  }
}
