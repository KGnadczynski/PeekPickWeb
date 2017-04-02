import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { AddMessageService } from './add-message.service';
import { ActivatedRoute, Params } from '@angular/router';

import { ModalDirective } from 'ng2-bootstrap';
import { MessageType } from '../../enums/message-type.enum';

@Component({
    selector: 'add-message',
    encapsulation: ViewEncapsulation.None,
    styles: [require('./add-message.scss')],
    template: require('./add-message.component.html'),
    providers: [AddMessageService]
})

export class AddMessageComponent implements OnInit {

    messageTypeName: any;
    messageTypes: string[] = Object.keys(MessageType);
    messageTypesOb: {name: string, value: string}[] = [];
    @ViewChild('childModal') public childModal: ModalDirective;

    constructor(
        private route: ActivatedRoute,
        private addMessageService: AddMessageService,
        private _location: Location
    ){}

    ngOnInit(): void{

        for(let i = this.messageTypes.length-1; i >= 0; i--)
            if(i%2 !== 0)
                this.messageTypesOb.push({name: this.messageTypes[i-1], value: this.messageTypes[i]});

        this.route.params.subscribe((params: Params) => {

            for(let a = 0; a < this.messageTypesOb.length; a++)
                if(this.messageTypesOb[a].value === params['message_type'])
                    this.messageTypeName = this.messageTypesOb[a].name;
            console.log('this name : ' + this.messageTypeName);
        });
    }

    ngAfterViewInit(): void {
        this.showChildModal();
    }

    public showChildModal(): void {
      this.childModal.show();
    }

    public hideChildModal(): void {
      this.childModal.hide();
      this._location.back();
    }

}