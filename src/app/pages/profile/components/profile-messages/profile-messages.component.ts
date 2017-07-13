import { Component, OnInit, ViewEncapsulation, ViewChild, Input } from '@angular/core';
import { MessagesComponent } from '../../../messages/messages.component';

@Component({
  selector: 'profile-messages',
  encapsulation: ViewEncapsulation.None,
  template: require('./profile-messages.component.html'),
})

export class ProfileMessagesComponent implements OnInit {

    @ViewChild('msgs') messagesCom: MessagesComponent;
    @Input() idCompany: number;

    constructor(){}

    ngOnInit(): void {

    }

    showActive(): void {
        this.messagesCom.getActivePost();
    }

}