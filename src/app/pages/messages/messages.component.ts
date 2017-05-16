import { Component, OnInit, ViewEncapsulation, Input, EventEmitter, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router,ActivatedRoute } from '@angular/router';
import { MessagesService } from './messages.service';
import { MessageList } from './messageList.model';


@Component({
    selector: 'messages',
    encapsulation: ViewEncapsulation.None,
    styles: [require('./messages.scss')],
    template: require('./messages.component.html'),
    providers: [MessagesService]
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

    constructor(private messageService: MessagesService, private router: Router, private route: ActivatedRoute){
        let moment = require('../../../../node_modules/moment/moment.js');
        moment.locale('pl');
    }

    ngOnInit():void{

        this.route.queryParams.subscribe(params => {
            this.searchTerm = params["searchTerm"];
            
            console.log('search Terms: ' + this.searchTerm);
            this.messageList = new MessageList();
            if(this.searchTerm !== undefined){
                console.log('search messages');
                this.getSearchMessages(this.searchTerm);
            } else {
                console.log('po prostu get messages');
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
            }
        }
    }

    getMessages(page: any){
        
        switch (this.dest) {
            case '':
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
                        });
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
                            if(page === 1)
                                this.messageList = result;
                            else {
                                this.messageList.messages = this.messageList.messages.concat(result.messages);
                                this.messageList.isLastPage = result.isLastPage;
                                this.canScrool = true;
                            }
                        });
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
                    });
                }
                
                break;

            case 'favourites':
                let x = JSON.parse(localStorage.getItem("favs"));

                if(x.length !== 0){
                    if("geolocation"  in navigator){
                        navigator.geolocation.getCurrentPosition((position) => {
                            this.latitude = position.coords.latitude;
                            this.longitude = position.coords.longitude;
                            this.busy = this.messageService.getMessagesList(x.join(';'), this.pageNumber, this.latitude, this.longitude).subscribe(result => {
                                this.messageList = result;
                            });
                        });
                    }
                }
                else
                    this.messageList = {messages: [], isLastPage: false};
                
                break;

            default:
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
        this.router.navigate(['/pages/mapmodal', id]);
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

    filter(event){
        console.log('data event: ');
        console.dir(event);
        event.messageTypeList = event.messageTypeList.substring(0, event.messageTypeList.length-1);
        event.companyCategoryMainIdList = event.companyCategoryMainIdList.substring(0, event.companyCategoryMainIdList.length-1);
        
        let params: string = "";
        Object.keys(event).forEach((key) => {
            if(event[key])
                params += key + "=" + event[key] + "&";
        });
        params = params.substring(0, params.length-1);

        if(event.latitude === 0 && event.longitude === 0){
            if("geolocation"  in navigator){
                navigator.geolocation.getCurrentPosition((position) => {
                    this.latitude = position.coords.latitude;
                    this.longitude = position.coords.longitude;
                    params += "&latitude=" + this.latitude + "&longitude=" + this.longitude;
                });
            }
        }
        
        console.log('params: ' + params);
        if(params !== "")
            this.messageService.getFilterMessages(params, this.pageNumber).subscribe(result => {
                this.messageList = result;
            });
        else
            this.getMessages(this.pageNumber);

    }

    getSearchMessages(searchTerm: string) {
        if("geolocation"  in navigator){
            navigator.geolocation.getCurrentPosition((position) => {
                this.latitude = position.coords.latitude;
                this.longitude = position.coords.longitude;
                this.messageService.searchMessages(searchTerm, this.pageNumber, this.latitude, this.longitude).subscribe(result => {
                    this.messageList = result;
                });
            });
        }
        this.messageService.searchMessages(searchTerm, this.pageNumber, 0, 0).subscribe(result => {
            this.messageList = result;
        });
    }

    showSocialShare() {
        this.socialVisible =  !this.socialVisible;
    }  

}