import { Component, OnInit, ViewEncapsulation, Input, EventEmitter, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

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
    @Output() myEvent = new EventEmitter();

    selected = [];
    pageNumber: number = 1;
    messageList: MessageList;
    canScrool: boolean = true;
    busy: Subscription;

    constructor(private messageService: MessagesService, private router: Router){
        let moment = require('../../../../node_modules/moment/moment.js');
        moment.locale('pl');
    }

    ngOnInit():void{
        this.messageList = new MessageList();
        this.getMessages(this.pageNumber);
        console.log('id: ' + this.id);
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

    getMessages(page: any, params = []){

        if(params.length !== 0){

        } else {
            switch (this.dest) {
                case '':
                    this.busy = this.messageService.getMessages(page).subscribe(result => {
                        if(page === 1){
                            this.messageList = result;
                            for(let i = 0; i < this.messageList.messages.length; i++){
                                this.messageService.getDistance(this.messageList.messages[i].nearestCompanyBranch.latitude, this.messageList.messages[i].nearestCompanyBranch.longitude, this.pageNumber).subscribe(result => {
                                    this.messageList.messages[i].distance = result.messages[0].distance;
                                });
                            }

                            console.log('komunikaty: ');
                            console.dir(this.messageList);
                        } else {
                            
                            this.messageList.messages = this.messageList.messages.concat(result.messages);
                            for(let i = 0; i < this.messageList.messages.length; i++){
                                this.messageService.getDistance(this.messageList.messages[i].nearestCompanyBranch.latitude, this.messageList.messages[i].nearestCompanyBranch.longitude, this.pageNumber).subscribe(result => {
                                    this.messageList.messages[i].distance = result.messages[0].distance;
                                });
                            }
                            this.messageList.isLastPage = result.isLastPage;
                            this.canScrool = true;
                            console.log('komunikaty: ');
                            console.dir(this.messageList);
                        }
                    });
                    break;
                
                case 'company':
                case 'profile':
                    this.busy = this.messageService.getCompanyMessages(page, params, this.id).subscribe(result => {
                        if(page === 1){
                            this.messageList = result;
                            for(let i = 0; i < this.messageList.messages.length; i++){
                                this.messageService.getDistance(this.messageList.messages[i].nearestCompanyBranch.latitude, this.messageList.messages[i].nearestCompanyBranch.longitude, this.pageNumber).subscribe(result => {
                                    this.messageList.messages[i].distance = result.messages[0].distance;
                                });
                            }
                        } else {
                            this.messageList.messages = this.messageList.messages.concat(result.messages);
                            for(let i = 0; i < this.messageList.messages.length; i++){
                                this.messageService.getDistance(this.messageList.messages[i].nearestCompanyBranch.latitude, this.messageList.messages[i].nearestCompanyBranch.longitude, this.pageNumber).subscribe(result => {
                                    this.messageList.messages[i].distance = result.messages[0].distance;
                                });
                            }
                            this.messageList.isLastPage = result.isLastPage;
                            this.canScrool = true;
                        }
                    });
                    break;

                case 'favourites':    
                    let x = JSON.parse(localStorage.getItem("favs")).join(';');
                    if(x){
                        this.busy = this.messageService.getMessagesList(x).subscribe(result => {
                            this.messageList = result;
                            for(let i = 0; i < this.messageList.messages.length; i++){
                                this.messageService.getDistance(this.messageList.messages[i].nearestCompanyBranch.latitude, this.messageList.messages[i].nearestCompanyBranch.longitude, this.pageNumber).subscribe(result => {
                                    this.messageList.messages[i].distance = result.messages[0].distance;
                                });
                            }
                        });
                    }
                    
                    break;

                default:
                    console.log('something else')
                    break;
            }
        }
    }

    clicked(event: any) {
        this.getMessages(this.pageNumber, this.selected);
    }

    toggle(id: number){
        let index = this.selected.indexOf(id);
        if(index === -1) this.selected.push(id);
        else this.selected.splice(index,1);
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
        this.messageService.getMessagesByType(params).subscribe(result => {
            this.messageList = result;
        });
    }

    filter(event){
        event = event.substring(0, event.length-1);
        this.getMessagesByType(event);
    }

}