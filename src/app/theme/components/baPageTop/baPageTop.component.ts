import {Component, ViewEncapsulation, OnInit, NgModule} from '@angular/core';
import {GlobalState} from '../../../global.state';
import {CommunicationService} from '../../../pages/komunikat/communicationservice.component';
import { MessageType } from '../../../globals/enums/message-type.enum';
import { BaPageTopService } from '../../services';
import { url } from '../../../globals/url';
import { ProfileService } from '../../../pages/profile/profile.service';
import { CompleterItem,CompleterService, RemoteData} from 'ng2-completer';
import {SlimLoadingBarService} from 'ng2-slim-loading-bar';
import { Router, NavigationExtras } from '@angular/router';

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
  protected dataService: RemoteData;
  protected searchData = [
    { color: 'red', value: '#f00' },
    { color: 'green', value: '#0f0' },
    { color: 'blue', value: '#00f' },
    { color: 'cyan', value: '#0ff' },
    { color: 'magenta', value: '#f0f' },
    { color: 'yellow', value: '#ff0' },
    { color: 'black', value: '#000' }
  ];

  constructor(private _state:GlobalState,private communicationservice: CommunicationService,private pageTopService: BaPageTopService,private profileService: ProfileService,private completerService: CompleterService,private slimLoadingBarService: SlimLoadingBarService, private router: Router) {
    this.dataService =  completerService.remote(url+ '/messages/page/1?searchTerm=','user.name,content','user.name,content').imageField("user.company.mainImageUrl");
    this.dataService.dataField('objectList');
    this._state.subscribe('menu.isCollapsed', (isCollapsed) => {
      this.isMenuCollapsed = isCollapsed;
    });
    this.pageTopService.loggedChange.subscribe((value) => { 
      this.isLogged = true;
      this.profileService.getUser().subscribe(
        result => {
            this.name = result.company.name;
        }
      );
      if(value === -1)
        this.isLogged = false;
        console.log('value: ' + value);
      this.profileService.getUserImages(value).subscribe((value)=> {
        this.userLogo = value.imageUrl;
        

      }) ;
      
    });

      this.pageTopService.showLoading.subscribe((value) => { 
      if(value) {
        this.startLoading();
      } else {
        this.completeLoading();
      }
  
 
    });

    

  }

  ngOnInit(): void {
    
    let currentUser = JSON.parse(localStorage.getItem('currentUserToken'));

    let user = JSON.parse(localStorage.getItem('user'));
   
    if(currentUser != null) {
      console.log('curent user not null');
        this.isLogged = true;
        this.profileService.getUser().subscribe(
          user => {
              this.name = user.company.name;
              console.log('name: ' + this.name);
              console.dir(user);
          }
        );
    }

     if(user != null) {
     this.profileService.getUserImages(user.user.company.id).subscribe((value)=> {
        this.userLogo = value.imageUrl;
        console.log('user logo: ' + this.userLogo);
      });
      
    }

    for(let i = this.messageTypes.length-1; i >= 0; i--){
      if(i%2 !== 0)
        this.messageTypesOb.push({name: this.messageTypes[i-1], value: this.messageTypes[i]});
    }
    
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

   startLoading() {
        this.slimLoadingBarService.start(() => {
            console.log('Loading complete');
        });
    }

    stopLoading() {
        this.slimLoadingBarService.stop();
    }

    completeLoading() {
        this.slimLoadingBarService.complete();
    }

    onSelected(item: CompleterItem) {
      console.log('Wybrano '+JSON.stringify(item));
      if(item == null) {
          this.router.navigate(['/pages/komunikat']);
      } else {
      let navigationExtras: NavigationExtras = {
            queryParams: {
                "searchTerm": item.originalObject.content
            }
        };
        this.router.navigate(['/pages/komunikat'], navigationExtras);
      }
  }
}
