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

        for(let i = this.messageTypes.length-1; i >= 0; i--)
            if(i%2 !== 0)
                this.messageTypesOb.push({name: this.messageTypes[i-1], value: this.messageTypes[i]});
        
    }

    toggleMenu() {
        this.isMenuCollapsed = !this.isMenuCollapsed;
        this._state.notifyDataChanged('menu.isCollapsed', this.isMenuCollapsed);
    
        return false;
    }

    scrolledChanged(isScrolled) {
        this.isScrolled = isScrolled;
    }

    /*public search(term:string) {
        this.communicationservice.szukajKomunikat(term);
    }*/

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
        console.log('ifdarkened: ' + this.ifDarkened);

        // $('main').css('height', 'initial');
        // $('body').fadeTo('slow', 0.33);
        // $('body').find('.dropdown-menu').stop().fadeTo('slow',1);
        // $('body').children(":not(.dropdown-menu)").css('opacity', '0.6');
        // $('body > *').children(":not(.dropdown-menu)").css('background-color', 'black');
        // $('body > *').children(":not(.dropdown-menu)").css('z-index', '998');
        // $('body > *').children('.dropdown-menu').css('z-index', '999');
        /*$('body').find('.dropdown-menu').css('opacity', '0');
        $('body').find('.dropdown-menu').css('z-index', '999');
        $('body').find('*:not(.dropdown-menu)').each(function(){
            // $(this).unbind('click');
            $(this).css('opacity', '0.9');
            $(this).css('background-color', 'black');
            $(this).css('z-index', '998');

            console.log($(this));
        });*/
        // $('body').not($('.dropdown-menu')).fadeOut('fast');
        // $('body').find('*:not(.dropdown-menu)').fadeTo('fast', 0.4);
  }
}
