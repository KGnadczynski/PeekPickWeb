import { Component, OnInit, ViewEncapsulation, Input, EventEmitter, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router,ActivatedRoute } from '@angular/router';
import { MessagesService } from './messages.service';
import { MessageList } from './messageList.model';
import { BaPageTopService} from '../../theme';
import { ConfirmOptions, Position } from 'angular2-bootstrap-confirm';
import { Positioning } from 'angular2-bootstrap-confirm/position';
import { KomunikatServiceComponent } from '../komunikat-single/komunikat-single.service';
import { ObjectList } from '../komunikat/komunikat';

let moment = require('../../../../node_modules/moment/moment');

@Component({
    selector: 'messages',
    encapsulation: ViewEncapsulation.None,
    styles: [require('./messages.scss')],
    template: require('./messages.component.html'),
    providers: [MessagesService, KomunikatServiceComponent, ConfirmOptions, {provide: Position, useClass: Positioning}]
})

export class MessagesComponent implements OnInit{
    
    @Input() dest: string;
    @Input() id: number;

    pageNumber: number = 1;
    messageList: MessageList;
    canScrool: boolean = true;
    busy: Subscription;
    searchTerm: string;
    socialVisible: boolean = false;
    latitude: number;
    longitude: number;
    name: string = "";
    message: ObjectList;
    lat: number;
    lng: number;

    public title: string = 'Czy jesteś pewny że chcesz usunąć tę wiadomość?';
    public confirmClicked: boolean = false;
    public cancelClicked: boolean = false;
    public isOpen: boolean = false;

    constructor(
        private messageService: MessagesService, 
        private router: Router, 
        private route: ActivatedRoute,
        private pageTopService: BaPageTopService,
        private komunikatSingleService: KomunikatServiceComponent
    ){
        let moment = require('../../../../node_modules/moment/moment.js');
        moment.locale('pl');
    }

    ngOnInit():void{

        this.route.queryParams.subscribe(params => {
            this.searchTerm = params["searchTerm"];
            
            this.messageList = new MessageList();
            if(this.searchTerm !== undefined){
                this.getSearchMessages(this.searchTerm);
            } else {
                this.getMessages(this.pageNumber);
            }
            
        });    
    }

    onScrollDown(){
        if(!this.messageList.isLastPage){
            if(this.canScrool){
                this.pageNumber += 1;
                this.canScrool = false;
                this.getMessages(this.pageNumber);
                console.log('SCROLLLING BADDD');
            }
        }
    }

    getMessages(page: any){
        this.pageTopService.showLoadingBar(true);
        switch (this.dest) {
            case '':
                console.log('switch: same messages');
                if("geolocation"  in navigator){
                    navigator.geolocation.getCurrentPosition((position) => {
                        this.latitude = position.coords.latitude;
                        this.longitude = position.coords.longitude;
                        this.busy = this.messageService.getMessages(page, this.latitude, this.longitude).subscribe(result => {
                            if(page === 1) {
                                this.messageList = result;
                                console.log('komunikaty: ');
                                console.dir(this.messageList);
                            } else {
                                this.messageList.messages = this.messageList.messages.concat(result.messages);
                                this.messageList.isLastPage = result.isLastPage;
                                this.canScrool = true;
                                console.log('komunikaty: ');
                                console.dir(this.messageList);
                            }
                             this.pageTopService.showLoadingBar(false);
                        });
                    }, (error) => {
                            this.pageTopService.showLoadingBar(false);
                           this.getMessagesWhenGeolocationDisabled(page);
                    });
                } else {
                    this.busy = this.messageService.getMessages(page, 0, 0).subscribe(result => {           
                        if(page === 1) {
                            this.messageList = result;
                        } else {
                            this.messageList.messages = this.messageList.messages.concat(result.messages);
                            this.messageList.isLastPage = result.isLastPage;
                            this.canScrool = true;
                        }
                         this.pageTopService.showLoadingBar(false);
                    });
                }
                
                break;
            
            case 'company':
            case 'profile':
                if("geolocation"  in navigator){
                    navigator.geolocation.getCurrentPosition((position) => {
                        this.latitude = position.coords.latitude;
                        this.longitude = position.coords.longitude;
                        this.busy = this.messageService.getCompanyMessages(page, this.id, this.latitude, this.longitude).subscribe(result => {
                            console.log('page: ' + page);
                            if(page === 1){
                                
                                this.messageList = result;
                                console.log('komunikatY p1: ');
                                console.dir(this.messageList);
                            }
                            else {
                                console.log('komunikatY p>1: ');
                                console.dir(this.messageList);
                                    this.messageList.messages = this.messageList.messages.concat(result.messages);
                                    this.messageList.isLastPage = result.isLastPage;
                                    this.canScrool = true;
                               
                                
                            }
                             this.pageTopService.showLoadingBar(false);
                        });
                    }, (error) => {
                            this.pageTopService.showLoadingBar(false);
                           this.getMessagesWhenGeolocationDisabled(page);
                    });
                } else {
                    this.busy = this.messageService.getCompanyMessages(page, this.id, 0, 0).subscribe(result => {
                        if(page === 1)
                            this.messageList = result;
                        else {
                            this.messageList.messages = this.messageList.messages.concat(result.messages);
                            this.messageList.isLastPage = result.isLastPage;
                            this.canScrool = true;
                        }
                         this.pageTopService.showLoadingBar(false);
                    });
                }
                
                break;

            case 'favourites':
                console.log('switch: favourites');
                let x = JSON.parse(localStorage.getItem("favs"));
                console.log('x: ');
                console.dir(x.join(';'));
                if(x.length !== 0){
                    if("geolocation"  in navigator){
                        navigator.geolocation.getCurrentPosition((position) => {
                            this.latitude = position.coords.latitude;
                            this.longitude = position.coords.longitude;
                            this.busy = this.messageService.getMessagesList(x.join(';'), this.latitude, this.longitude, page).subscribe(result => {
                                this.messageList = result;
                                console.log('favsy message list:');
                                console.dir(result);
                                 this.pageTopService.showLoadingBar(false);
                            });
                        }, (error) => {
                            this.pageTopService.showLoadingBar(false);
                           this.getMessagesWhenGeolocationDisabled(page);
                    });
                    }
                }
                else
                    this.messageList = {messages: [], isLastPage: false};
                    this.pageTopService.showLoadingBar(false);
                break;

                case 'companyCategory':
                console.log('switch: companyCategory');
                     if("geolocation"  in navigator){
                        navigator.geolocation.getCurrentPosition((position) => {
                            this.latitude = position.coords.latitude;
                            this.longitude = position.coords.longitude;
                            this.busy = this.messageService.getCompanyCategoryMessages(this.id, page, this.latitude, this.longitude).subscribe(result => {
                                if(page === 1){
                                    this.messageList = result;
                                    console.log('komunikaty: ');
                                    console.dir(this.messageList);
                                }
                                else {
                                    this.messageList.messages = this.messageList.messages.concat(result.messages);
                                    this.messageList.isLastPage = result.isLastPage;
                                    this.canScrool = true;
                                }
                                 this.pageTopService.showLoadingBar(false);
                            });
                        }, (error) => {
                            this.pageTopService.showLoadingBar(false);
                           this.getMessagesWhenGeolocationDisabled(page);
                        });
                    } else {
                        this.busy = this.messageService.getCompanyCategoryMessages(this.id, page, 0, 0).subscribe(result => {
                            if(page === 1){
                                this.messageList = result;
                                console.log('komunikaty: ');
                                console.dir(this.messageList);
                            }
                            else {
                                this.messageList.messages = this.messageList.messages.concat(result.messages);
                                this.messageList.isLastPage = result.isLastPage;
                                this.canScrool = true;
                            }
                             this.pageTopService.showLoadingBar(false);
                        });
                    }
                break;

                case 'active':
                    this.getActivePost();
                break;

                case 'ended':
                    this.getEnded();
                break;

            default:
                this.pageTopService.showLoadingBar(false);
                console.log('something else')
                break;
        }
    
    }

    addToFavourites(id: number){

        if(localStorage.getItem("favs") === null){
            let storedArray = [];
            storedArray.push(id);
            localStorage.setItem("favs", JSON.stringify(storedArray));
        } else {
            let storedParse = JSON.parse(localStorage.getItem("favs"));

            if(storedParse.indexOf(id) === -1){
                storedParse.push(id);
            } else{
                storedParse.splice(storedParse.indexOf(id), 1);
            }
            
            localStorage.setItem("favs", JSON.stringify(storedParse));
            console.dir(localStorage);

            if(this.dest === 'favourites'){
                this.getMessages(this.pageNumber);
            }
        }

    }

    navigateToMap(id: number){
        console.log('odpalamy mape');
        this.komunikatSingleService.getKomunikat(id).subscribe(komunikat => {
                this.message = komunikat;
                 console.log('mapa lng '+JSON.stringify(this.message));
                this.lat =  this.message.companyBranchList[0].latitude;
                this.lng = this.message.companyBranchList[0].longitude;
                console.log('mapa lng '+this.lat);
                var URL =  "https://maps.google.com/maps?q="+this.lat+","+this.lng;
                var win = window.open(URL, "_blank");
        });
         
      //  this.router.navigate(['/pages/mapmodal', id]);
    }

    getMessagesWhenGeolocationDisabled(page :any) {
          console.log('GEOLOCATION ERROR');
            this.busy = this.messageService.getMessages(page, 0, 0).subscribe(result => {           
            if(page === 1) {
                this.messageList = result;
            } else {
                this.messageList.messages = this.messageList.messages.concat(result.messages);
                this.messageList.isLastPage = result.isLastPage;
                this.canScrool = true;
            }
            this.pageTopService.showLoadingBar(false);
        }, (error) => {
            this.pageTopService.showLoadingBar(false);
            });
    }

    goToSingle(id: number){
        this.router.navigate(['/pages/komunikat_single', id]);
    }

    checkIfFavourite(id: number){
        if(JSON.parse(localStorage.getItem("favs"))){
            if(JSON.parse(localStorage.getItem("favs")).indexOf(id) > -1) return true;
            else return false;
        }
    }

    filter(event: any){
        // console.log('data event: ');
        // console.dir(event);
        this.pageTopService.showLoadingBar(true);
        
        let params: string = "";
        event.companyCategoryIdList = event.companyCategoryIdList.substring(0, event.companyCategoryIdList.length-1);
        
        Object.keys(event).forEach((key) => {
            if(event[key])
                params += key + "=" + event[key] + "&";
        });
        params = params.substring(0, params.length-1);
        
        if(this.latitude !== undefined && this.longitude !== undefined && !event.latitude && !event.longitude)
            params += "&latitude=" + this.latitude + "&longitude=" + this.longitude;

        console.log('params: ' + params);

        this.messageService.getFilterMessages(params, this.pageNumber).subscribe(result => {
            this.messageList = result;
            this.pageTopService.showLoadingBar(false);
            console.log('result: ');
            console.dir(result);
        }, (error) => {
            this.pageTopService.showLoadingBar(false);
        });

    }

    filterFavourites(sortType: string): void{
        this.pageTopService.showLoadingBar(true);
        this.messageService.getFilterMessages('sortType=' + sortType, this.pageNumber).subscribe(result => {
            this.messageList = result;
            this.pageTopService.showLoadingBar(false);
        });
    }

    getSearchMessages(searchTerm: string) {
         
         this.pageTopService.showLoadingBar(true);

         if("geolocation"  in navigator){
            navigator.geolocation.getCurrentPosition((position) => {
                this.latitude = position.coords.latitude;
                this.longitude = position.coords.longitude;
                this.searchTerm += "&latitude="+this.latitude+"&longitude="+this.longitude;
                console.log('search term in messages component: ' + searchTerm);
                this.messageService.searchMessages(searchTerm, this.pageNumber, this.latitude, this.longitude).subscribe(result => {
                    this.messageList = result;
                    this.pageTopService.showLoadingBar(false);
                    console.log('search msgs:')
                    console.dir(result);
                });
            }); 
         } else {
                this.messageService.searchMessages(searchTerm, this.pageNumber, 0, 0).subscribe(result => {
                    this.messageList = result;
                    this.pageTopService.showLoadingBar(false);
                    console.log('search msgs:')
                    console.dir(result);
                });
         }
        
    }

    showSocialShare() {
        this.socialVisible =  !this.socialVisible;
    }

    getActivePost(){

        let date: any = Date.now();
        date = moment().format("YYYY-MM-DD HH:mm");

        if("geolocation"  in navigator){
            navigator.geolocation.getCurrentPosition((position) => {
                this.latitude = position.coords.latitude;
                this.longitude = position.coords.longitude;
                this.busy = this.messageService.getActiveMessages(this.pageNumber, date, this.latitude, this.longitude, this.id).subscribe(
                    result => {
                        this.messageList = result;
                         this.pageTopService.showLoadingBar(false);
                        // console.log('active posts: ');
                        // console.dir(result);
                    },
                    err => {
                        this.pageTopService.showLoadingBar(false);
                        console.log('error from active posts:');
                        console.dir(err);
                    }
                );
            });
        }

        
    }

    getEnded() {
        if("geolocation"  in navigator){
            navigator.geolocation.getCurrentPosition((position) => {
                this.latitude = position.coords.latitude;
                this.longitude = position.coords.longitude;

                let params: string = 'statusList=ENDED&latitude='+this.latitude+'&longitude='+this.longitude + '&companyId=' + this.id;

                this.busy = this.messageService.getFilterMessages(params, this.pageNumber).subscribe(
                    result => {
                        this.messageList = result;
                         this.pageTopService.showLoadingBar(false);
                        // console.log('ended posts: ');
                        // console.dir(result);
                    },
                    err => {
                        this.pageTopService.showLoadingBar(false);
                        console.log('error from ended posts:');
                        console.dir(err);
                    }
                );
            });
        }
    }

    deleteMessage(id: number):void {
        this.messageService.deleteMessage(id).subscribe(
            result => {
                this.messageList.messages = this.messageList.messages.filter((el) => {
                    return el.id !== id
                });
            },
            error => {
                console.log('Cannoc delete message');
            }
        )
    }

}