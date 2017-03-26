import {Component, ViewEncapsulation} from '@angular/core';

import {GlobalState} from '../../../global.state';
import {CommunicationService} from '../../../pages/komunikat/communicationservice.component';

@Component({
  selector: 'ba-page-top',
  styles: [require('./baPageTop.scss')],
  template: require('./baPageTop.html'),
  encapsulation: ViewEncapsulation.None
})
export class BaPageTop {

  public isScrolled:boolean = false;
  public isMenuCollapsed:boolean = false;

  constructor(private _state:GlobalState,private communicationservice: CommunicationService) {
    this._state.subscribe('menu.isCollapsed', (isCollapsed) => {
      this.isMenuCollapsed = isCollapsed;
    });
  }

  public toggleMenu() {
    this.isMenuCollapsed = !this.isMenuCollapsed;
    this._state.notifyDataChanged('menu.isCollapsed', this.isMenuCollapsed);
    return false;
  }

  public scrolledChanged(isScrolled) {
    this.isScrolled = isScrolled;
  }

  public search(term:string) {
    this.communicationservice.szukajKomunikat(term);
  }

  public profileClick() {
       console.log("Profile clicked");
  }

   public settingsClick() {
       console.log("Settings clicked");
  }

   public signoutClick() {
       console.log("Signout clicked");
       localStorage.removeItem('currentUserToken');
       localStorage.removeItem('user');
       localStorage.removeItem('latitude');
       localStorage.removeItem('longitude');
  }
}
