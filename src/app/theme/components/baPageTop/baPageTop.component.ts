import { Component, ViewEncapsulation, OnInit, NgModule} from '@angular/core';
import { GlobalState } from '../../../global.state';
import { CommunicationService } from '../../../pages/komunikat/communicationservice.component';
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

    isScrolled:boolean = false;
    isMenuCollapsed:boolean = false;
    ifDarkened: boolean = false;

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

    constructor(
        private _state: GlobalState,
        private communicationservice: CommunicationService,
        private pageTopService: BaPageTopService,
        private profileService: ProfileService,
        private completerService: CompleterService,
        private slimLoadingBarService: SlimLoadingBarService, 
        private router: Router
    ){
        this.dataService =  completerService.remote(url+ '/messages/page/1?searchTerm=','user.name,content','user.name,content')
        .imageField("user.company.mainImageUrl");
        this.dataService.dataField('objectList');
        this._state.subscribe('menu.isCollapsed', (isCollapsed) => {
            this.isMenuCollapsed = isCollapsed;
        });
    
        this.pageTopService.loggedChange.subscribe((value) => {
        
            this.profileService.getUser().subscribe(
                result => {
                    this.isLogged = true;
                }, 
                error => {
                    this.isLogged = false;
                }
            );
      
            if(value === -1)
                this.isLogged = false;
        
        });

        this.pageTopService.showLoading.subscribe((value) => { 
            if(value) this.startLoading();
            else this.completeLoading();
        });
    }

    sendMessage():void {
        this.profileService.getUser().subscribe(
            result => {
                this.pageTopService.sendMessage('Message from page top component to app component');
            }, error => {
                console.log('eerroooroo');
                this.pageTopService.sendMessage('Message from page top component to app component');
            }
        );
        
    }

    ngOnInit(): void {
        
        this.profileService.getUser().subscribe(
            result => {
                this.isLogged = true;
            }, 
            error => {
                this.isLogged = false;
            }
        );

        for(let i = 0; i < this.messageTypes.length; i = i+2)
            this.messageTypesOb.push({name: this.messageTypes[i], value: this.messageTypes[i+1]});
        
    }

    toggleMenu() {
        this.isMenuCollapsed = !this.isMenuCollapsed;
        this._state.notifyDataChanged('menu.isCollapsed', this.isMenuCollapsed);
    
        return false;
    }

    scrolledChanged(isScrolled) {
        this.isScrolled = isScrolled;
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
      console.log('Wybranoo '+JSON.stringify(item));
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

  darkenBody():void {
        this.ifDarkened = !this.ifDarkened;
        
        switch (this.ifDarkened) {
            case true:
            
                $('div.al-main').css({
                    "position": 'fixed',
                    "width": "100%",
                    "height": "100%",
                    "background-color": "white",
                    "opacity": 0.6,
                    "top": "0px",
                    "left": 0,
                    "right": "1000px"
                });
                $('#footer').css({
                    "display": "none"
                });

                break;
            case false:
            
                $('div.al-main').css({
                    "position": 'relative',
                    "width": "100%",
                    "height": "100%",
                    "background-color": "transparent",
                    "opacity": 1,
                    "top": "auto",
                    "left": "auto",
                    "right": 0
                });
                $('#footer').css({
                    "display": "block"
                });

                break;
            default:
                break;
        }

        $('.dropdown.keep-open').on({
            "shown.bs.dropdown": function() { this.closable = false; },
            "click":             function() { this.closable = true; },
            "hide.bs.dropdown":  function() { return this.closable; }
        });
        

  }

    fixStyles(): void {
        $('div.al-main').css({
            "position": 'relative',
            "width": "100%",
            "height": "100%",
            "background-color": "transparent",
            "opacity": 1,
            "top": "auto",
            "left": "auto",
            "right": 0
        });
        $('#footer').css({
            "display": "block"
        });
        this.ifDarkened = !this.ifDarkened;
    }

}
