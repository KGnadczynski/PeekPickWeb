import { Component, OnInit, ViewEncapsulation, ViewChild, Input, ElementRef } from '@angular/core';
import { MessagesComponent } from '../../../messages/messages.component';

@Component({
  selector: 'profile-messages',
  encapsulation: ViewEncapsulation.None,
  styles: [require('./profile-messages.scss')],
  template: require('./profile-messages.component.html'),
})

export class ProfileMessagesComponent implements OnInit {

    @Input() idCompany: number;
    infoA: string = "";
    infoE: string = "";

    constructor(){}

    ngOnInit(): void {
    }

    setLength(event: any): void{
        console.log('dostalem length: ');
        console.dir(event);

        switch (event.s) {
            case 'a':
                if(event.count === 0 || event.count === null || event.count === undefined)
                    this.infoA = "Nie masz żadnych aktywnych postów";
                break;
            case 'e':
                if(event.count === 0 || event.count === null || event.count === undefined)
                    this.infoE = "Nie masz żadnych zakończonych postów";
                break;
        
            default:
                break;
        }

        
    }

}