import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { Subscription } from 'rxjs';

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
    
    @Input() amount: number;
    @Input() dest: string;
    @Input() id: number;

    selected = [];
    pageNumber: number = 1;
    messageList: MessageList;
    canScrool: boolean = true;
    busy: Subscription;

    constructor(private messageService: MessagesService){
        let moment = require('../../../../node_modules/moment/moment.js');
        moment.locale('pl');
    }

    ngOnInit():void{
        this.messageList = new MessageList();
        this.getMessages(this.pageNumber);
    }

    onScroll () {
	    console.log('scrolled!!')
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
        if(params.length != 0){
            this.busy = this.messageService.getMessages(page, params).subscribe(result => {
                if(page === 1){
                    this.messageList = result;
                    console.log('this.messageList: ');
                    console.dir(this.messageList);
                }
                    
                else {
                    this.messageList.messages = this.messageList.messages.concat(result.messages);
                    this.messageList.isLastPage = result.isLastPage;
                    this.canScrool = true;
                }
            });
        } else {
            this.busy = this.messageService.getMessages(page).subscribe(result => {
                if(page === 1){
                    this.messageList = result;
                }
                else {
                    this.messageList.messages = this.messageList.messages.concat(result.messages);
                    this.messageList.isLastPage = result.isLastPage;
                    this.canScrool = true;
                }
            });
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
    
}