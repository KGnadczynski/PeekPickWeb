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
    latitude: number = JSON.parse(localStorage.getItem("latitude")).latitude;
    longitude: number = JSON.parse(localStorage.getItem("longitude")).longitude;
    searchTerm: string;

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
                break;
            
            case 'company':
            case 'profile':
                this.busy = this.messageService.getCompanyMessages(page, this.id, this.latitude,this.longitude).subscribe(result => {
                    if(page === 1)
                        this.messageList = result;
                    else {
                        this.messageList.messages = this.messageList.messages.concat(result.messages);
                        this.messageList.isLastPage = result.isLastPage;
                        this.canScrool = true;
                    }
                });
                break;

            case 'favourites':    
                let x = JSON.parse(localStorage.getItem("favs")).join(';');
                this.busy = this.messageService.getMessagesList(x, this.latitude,this.longitude).subscribe(result => {
                    this.messageList = result;
                });
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
        }

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

    getMessagesByType(params: string):void {
        this.messageService.getMessagesByType(params, this.latitude,this.longitude).subscribe(result => {
            this.messageList = result;
        });
    }

    getMessagesByDistance(page: number){

        this.busy = this.messageService.getMessages(page, this.latitude,this.longitude).subscribe(result => {
                this.messageService.sortMessagesByDistance(page, this.latitude, this.longitude).subscribe(result => {
                this.messageList = result;
            });
        });
    }

    getMessagesByCreateDate(page: number){

        this.busy = this.messageService.getMessages(page, this.latitude, this.longitude).subscribe(result => {
                this.messageService.sortMessagesByCreateDate(page, this.latitude, this.longitude).subscribe(result => {
                this.messageList = result;
            });
        });

    }

    filter(event){
        console.log('data event: ');
        console.dir(event);
        //vent.messageTypes = event.messageTypes.substring(0, event.messageTypes.length-1);
        
        /*this.getMessagesByType(event.messageTypes);
        if(event.filterBy === 'lokalizacja'){
            this.getMessagesByDistance(this.pageNumber);
        } else if(event.filterBy === 'data dodania'){
            this.getMessagesByCreateDate(this.pageNumber);
        }*/

    }

    getRange(range: number): void{
        this.messageService.getRange(this.latitude, this.longitude, this.pageNumber, range).subscribe(result => {
            console.log('range: ');
            console.dir(result);
        });
    }

    getSearchMessages(searchTerm: string) {
        this.messageService.searchMessages(searchTerm, this.pageNumber, this.latitude, this.longitude).subscribe(result => {
            this.messageList = result;
            console.log('search ML: ');
            console.dir(this.messageList);
        })
    }

}