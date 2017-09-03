import { Component, OnInit, ViewEncapsulation, Input, EventEmitter, Output, LOCALE_ID } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router,ActivatedRoute } from '@angular/router';
import { MessagesService } from './messages.service';
import { MessageList } from './messageList.model';
import { BaPageTopService} from '../../theme';
import { KomunikatServiceComponent } from '../komunikat-single/komunikat-single.service';
import { ObjectList } from '../komunikat/komunikat';
import { ProfileService } from '../profile/profile.service';

let moment = require('../../../../node_modules/moment/moment');

@Component({
    selector: 'messages',
    encapsulation: ViewEncapsulation.None,
    styles: [require('./messages.scss')],
    template: require('./messages.component.html'),
    providers: [ MessagesService, KomunikatServiceComponent, {provide: LOCALE_ID, useValue: "pl"}, ProfileService ]
})

export class MessagesComponent implements OnInit{
    
    @Input() dest: string;
    @Input() id: number;
    @Output() sendMessagesLength: EventEmitter<any> = new EventEmitter<any>();

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
    ifGeolocation: boolean = true;
    showInfo: string;
    params: string = "";

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

        this.messageService.changeImageSubject.subscribe(
            url => {
                console.log('IM GETTING URL IN MESSAGES COMPONENT');
                this.messageList.messages.forEach(m => {
                    m.mainImageUrl = url;
                });
            }
        );
    }

    ngOnInit():void{

        navigator.geolocation.getCurrentPosition(
            position => {},
            error => {
                if(error.code === error.PERMISSION_DENIED)
                    console.log('you denied me');
                this.ifGeolocation = false;
            }
        );

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

        if(this.params){
            console.log('sa paramsy');
        } else{
            console.log('nie ma paramsow');
        }

        if(!this.messageList.isLastPage){
            if(this.canScrool){
                this.pageNumber += 1;
                this.canScrool = false;
                if(this.params){
                    this.messageService.getFilterMessages(this.params, this.pageNumber).subscribe(
                        result => {
                            if(this.pageNumber === 1){
                                this.messageList = result;
                            } else {
                                this.messageList.messages = this.messageList.messages.concat(result.messages);
                                this.messageList.isLastPage = result.isLastPage;
                                this.canScrool = true;
                            }
                        }
                    );
                }
                else {
                    this.getMessages(this.pageNumber);
                }
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
                    console.log('GETTING ACTIVE POSTS');
                    this.getActivePost();
                break;

                case 'ended':
                    console.log('GETTING ENDED POSTS');
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
                if (win) {
                //Browser has allowed it to be opened
                    win.focus();
                } else {
                    //Browser has blocked it
                    alert('Zezwól na wyskakujące okienka aby wyświetlić trasę');
                }
        });
         
      //  this.router.navigate(['/pages/mapmodal', id]);
    }

    getMessagesWhenGeolocationDisabled(page :any) {
          console.log('GEOLOCATION ERROR');
            this.busy = this.messageService.getMessages(page, 0, 0).subscribe(result => {           
            if(page === 1) {
                this.messageList = result;
                this.messageList.messages.forEach(m => {
                    m["info"] = "ten post wygasza " + moment(m.startDate).add(14, 'days').format("DD.MM.YYYY")
                    + ", godz. " + moment(m.startDate).add(14, 'days').format("HH:mm");
                });
                console.log('messages:');
                console.dir(this.messageList);
                this.sendMessagesLength.emit({count: result.messages.length, s: 'a'});
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

        console.log('messages data event: ');
        console.dir(event);
        
        this.pageTopService.showLoadingBar(true);
        let params: string = "";
        this.pageNumber = 1;
        event.companyCategoryIdList = event.companyCategoryIdList.substring(0, event.companyCategoryIdList.length-1);

        if(this.dest === 'companyCategory'){
            params += 'companyCategoryMainIdList=' + this.id + "&";
        }

        if("geolocation" in navigator){
            navigator.geolocation.getCurrentPosition(
                position => {
                    //jesli nie przesylam zadnych coordynatow, czyli nie wybrano miasta to daj kordynaty z przegladarki
                    //jesli dalem kordynaty z okrslonego miasta to w petli ponizej zostana uwzglednione
                    if(!(event.latitude && event.longitude))
                        params += "latitude=" + position.coords.latitude + "&longitude=" + position.coords.longitude + "&";
                    Object.keys(event).forEach((key) => {
                        if(event[key])
                            params += key + "=" + event[key] + "&";
                    });
                    params = params.substring(0, params.length-1);
                    this.params = params;

                    console.log('lok params: ' + params);
                    this.messageService.getFilterMessages(params, this.pageNumber).subscribe(result => {
                        this.messageList = result;
                        this.pageTopService.showLoadingBar(false);
                        console.log('result: ');
                        console.dir(result);
                    }, (error) => {
                        this.pageTopService.showLoadingBar(false);
                    });
                },
                error => {
                    Object.keys(event).forEach((key) => {
                        if(event[key])
                            params += key + "=" + event[key] + "&";
                    });
                    params = params.substring(0, params.length-1);
                    this.params = params;

                    console.log('not lok params: ' + params);
                    this.messageService.getFilterMessages(params, this.pageNumber).subscribe(result => {
                        this.messageList = result;
                        this.pageTopService.showLoadingBar(false);
                        console.log('result: ');
                        console.dir(result);
                    }, (error) => {
                        this.pageTopService.showLoadingBar(false);
                    });
                }
            ); 
        }
        
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

        let date: any;
        date = moment().endOf('day').format("YYYY-MM-DD HH:mm");

        if("geolocation"  in navigator){
            navigator.geolocation.getCurrentPosition((position) => {
                this.latitude = position.coords.latitude;
                this.longitude = position.coords.longitude;
                this.busy = this.messageService.getActiveMessages(this.pageNumber, date, this.latitude, this.longitude, this.id).subscribe(
                    result => {
                        this.messageList = result;
                        this.messageList.messages.forEach(m => {
                            m["info"] = "ten post wygasza " + moment(m.startDate).add(14, 'days').format("DD.MM.YYYY")
                            + ", godz. " + moment(m.startDate).add(14, 'days').format("HH:mm");
                        });
                        this.sendMessagesLength.emit({count: result.messages.length, s: 'a'});
                        this.pageTopService.showLoadingBar(false);
                        console.log('active posts: ');
                        console.dir(this.messageList);
                    },
                    err => {
                        this.pageTopService.showLoadingBar(false);
                        console.log('error from active posts:');
                        console.dir(err);
                    }
                );
            },
            error => {
                this.getMessagesWhenGeolocationDisabled(this.pageNumber);
            }
        );
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
                        this.sendMessagesLength.emit({count: result.messages.length, s: 'e'});
                        this.pageTopService.showLoadingBar(false);
                        console.log('ended posts: ');
                        console.dir(result);
                    },
                    err => {
                        this.pageTopService.showLoadingBar(false);
                        console.log('error from ended posts:');
                        console.dir(err);
                    }
                );
            },
        error => {
            this.getMessagesWhenGeolocationDisabled(this.pageNumber);
        });
        }
    }

    deleteMessage(id: number):void {

        if(localStorage.getItem("favs") !== null){
            let storedParse = JSON.parse(localStorage.getItem("favs"));
            
            var index = storedParse.indexOf(id);

            if(index > -1){
                storedParse.splice(index, 1);
            }
            localStorage.setItem("favs", JSON.stringify(storedParse));
        }

        this.messageService.deleteMessage(id).subscribe(
            result => {
                this.messageList.messages = this.messageList.messages.filter((el) => {
                    return el.id !== id
                });
            },
            error => {
                console.log('Cannot delete message');
            }
        )
    }

    getLocation(message:any): string {
        if(message.location != null) {
           return message.location.address;
        } else if(message.companyBranchCount == 1) {
           return message.nearestCompanyBranch.city +','+ message.nearestCompanyBranch.street+" "+ message.nearestCompanyBranch.streetNo;
        }else if(message.companyBranchCount > 1 && message.companyBranchCount < 5) {
           return message.companyBranchCount+" lokalizacje, Najbliższa: "+message.nearestCompanyBranch.city +','+ message.nearestCompanyBranch.street+" "+ message.nearestCompanyBranch.streetNo;
        }
        else if(message.companyBranchCount >= 5) {
           return message.companyBranchCount+" lokalizacji, Najbliższa: "+message.nearestCompanyBranch.city +','+ message.nearestCompanyBranch.street+" "+ message.nearestCompanyBranch.streetNo;
        }
        return '';
    }

    getDistance(message:any): string {
        //	<p>({{ message.distance | number: '1.2-2'}} km)</p>
         if("geolocation"  in navigator){
            //  console.log('GEEEOOO');
            return '('+message.distance.toFixed(2) +' km)'; 
         } else {
            return '';
         }
    }

}