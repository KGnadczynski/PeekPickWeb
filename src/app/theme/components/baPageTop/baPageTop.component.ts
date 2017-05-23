import {Component, ViewEncapsulation, OnInit, NgModule} from '@angular/core';
import {GlobalState} from '../../../global.state';
import {CommunicationService} from '../../../pages/komunikat/communicationservice.component';
import { MessageType } from '../../../globals/enums/message-type.enum';
import { BaPageTopService } from '../../services';
import { url } from '../../../globals/url';
import { ProfileService } from '../../../pages/profile/profile.service';
import { CompleterService, CompleterData } from 'ng2-completer';

@Component({
  selector: 'ba-page-top',
  styles: [require('./baPageTop.scss')],
  template: require('./baPageTop.html'),
  encapsulation: ViewEncapsulation.None,
  providers: [ProfileService]
})

export class BaPageTop implements OnInit{

  messageTypes: string[] = Object.keys(MessageType);
  messageTypesOb: {name: string, value: string}[] = [];
  isLogged: boolean;
  userLogo: string;
  name: string = '';

  public isScrolled:boolean = false;
  public isMenuCollapsed:boolean = false;

  protected searchStr: string;
  protected dataService: CompleterData;
  protected searchData = [
    { color: 'red', value: '#f00' },
    { color: 'green', value: '#0f0' },
    { color: 'blue', value: '#00f' },
    { color: 'cyan', value: '#0ff' },
    { color: 'magenta', value: '#f0f' },
    { color: 'yellow', value: '#ff0' },
    { color: 'black', value: '#000' }
  ];

  constructor(private _state:GlobalState,private communicationservice: CommunicationService,private pageTopService: BaPageTopService,private profileService: ProfileService,private completerService: CompleterService) {
    this.dataService =  completerService.remote(url+ '/messages/page/1?searchTerm=','Firma','Firma');
    this._state.subscribe('menu.isCollapsed', (isCollapsed) => {
      this.isMenuCollapsed = isCollapsed;
    });
    this.pageTopService.loggedChange.subscribe((value) => { 
      this.isLogged = true;
      this.profileService.getUserImages(value).subscribe((value)=> {
        this.userLogo = value.imageUrl;
      }) ;
      
    });

  }

  ngOnInit(): void {
    
    let currentUser = JSON.parse(localStorage.getItem('currentUserToken'));

    let user = JSON.parse(localStorage.getItem('user'));
   
    if(currentUser != null) {
      this.isLogged = true;
    }

     if(user != null) {
     this.profileService.getUserImages(user.user.company.id).subscribe((value)=> {
        this.userLogo = value.imageUrl;
      })
      this.profileService.getUser().subscribe(
        user => {
            this.name = user.company.name;
            console.log('name: ' + name);
        }
      );
    }

    for(let i = this.messageTypes.length-1; i >= 0; i--){
      if(i%2 !== 0)
        this.messageTypesOb.push({name: this.messageTypes[i-1], value: this.messageTypes[i]});
    }
    //console.dir(this.messageTypesOb);
    
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
       localStorage.removeItem('isTokenFCMRegister'); 
       //localStorage.removeItem('latitude');
       //localStorage.removeItem('longitude');
  }
}
