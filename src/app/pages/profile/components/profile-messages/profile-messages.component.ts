import { Component, OnInit, ViewEncapsulation, ViewChild, Input, ElementRef } from '@angular/core';
import { MessagesComponent } from '../../../messages/messages.component';

@Component({
  selector: 'profile-messages',
  encapsulation: ViewEncapsulation.None,
  styles: [require('./profile-messages.scss')],
  template: require('./profile-messages.component.html'),
})

export class ProfileMessagesComponent implements OnInit {

    @ViewChild('msgs') messagesCom: ElementRef;
    @Input() idCompany: number;
    info: string = "";

    constructor(){}

    ngOnInit(): void {
        console.log('this.messageCom: ');
        console.dir(this.messagesCom);
    }

    showActive(): void {
        
    }

}