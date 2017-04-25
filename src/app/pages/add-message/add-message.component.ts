import { Component, OnInit, ViewEncapsulation, ViewChild, Input } from '@angular/core';
import { Location } from '@angular/common';
import { AddMessageService } from './add-message.service';
import { CommunicationService } from '../komunikat/communicationservice.component';
import { ActivatedRoute, Params } from '@angular/router';

import { ModalDirective } from 'ng2-bootstrap';
import { MessageType } from '../../enums/message-type.enum';
import { MessageAddModel } from './add-message-model';
import { NgUploaderOptions } from 'ngx-uploader';
import { AgmCoreModule } from 'angular2-google-maps/core';

let moment = require('../../../../node_modules/moment/moment');

@Component({
    selector: 'add-message',
    encapsulation: ViewEncapsulation.None,
    styles: [require('./add-message.scss')],
    template: require('./add-message.component.html'),
    providers: [AddMessageService]
})

export class AddMessageComponent implements OnInit {

    messageTypeValue: string;
    messageTypeName: any;
    messageTypes: string[] = Object.keys(MessageType);
    messageTypesOb: {name: string, value: string}[] = [];
    msgAddModel: any = {};
    messageAddModel: MessageAddModel;
    addedMessage: any;
    image:File;
    isCollapsed:boolean = false;
    id: number;
    paramValue: any;
    public defaultPicture = 'assets/img/theme/no-photo.png';
    public profile:any = {
        picture: 'assets/img/theme/no-photo.png'
    };
    public uploaderOptions:NgUploaderOptions = {
        // url: 'http://website.com/upload'
        url: '',
    };

    
    zoom: number = 8;   
    lat:number = JSON.parse(localStorage.getItem('latitude')).latitude;
    lng:number = JSON.parse(localStorage.getItem('longitude')).longitude;

    //   var latitudeObject = JSON.parse(localStorage.getItem('latitude')).latitude;
      //  var longitudeObject = JSON.parse(localStorage.getItem('longitude')).longitude;
        //this.lat = latitudeObject;
       // this.lng = longitudeObject;
       /// console.log('latitude : ' + this.lat);
       // console.log('latitude : ' + this.lng);

    mapClicked($event: any) {
       console.log('Map clicked');
      this.lat =  $event.coords.lat;
      this.lng = $event.coords.lng;
    }

    pickerOptions: Object = {
        'showDropdowns': true,
        'showWeekNumbers': true,
        "timePicker": true,
        'timePickerIncrement': 5,
        "timePicker24Hour": true,
        'autoApply': true,
        "locale": {
            format: 'MM/DD/YYYY H:mm',
            "applyLabel": "Wybierz",
            "cancelLabel": "Anuluj",
             "daysOfWeek": [
                    "Ndz",
                    "Pon",
                    "Wt",
                    "Śr",
                    "Czw",
                    "Pi",
                    "Sob"
                ],
                "monthNames": [
                    "Styczeń",
                    "Luty",
                    "Marzec",
                    "Kwiecień",
                    "Maj",
                    "Czerwiec",
                    "Lipiec",
                    "Sierpień",
                    "Wrzesień",
                    "Październik",
                    "Listopad",
                    "Grudzień"
                ],
        },
        "singleDatePicker": true
    };

    selectStartDate(message) {
        this.msgAddModel.startDate = moment().utc(new Date(message.end._d)).format("YYYY-MM-DD'T'HH:mm:ss\\Z");
    }

    selectEndDate(message) {
        this.msgAddModel.endDate = moment().utc(new Date(message.end._d)).format("YYYY-MM-DD'T'HH:mm:ss\\Z");
    }

    @ViewChild('childModal') public childModal: ModalDirective;

    constructor(
        private route: ActivatedRoute,
        private addMessageService: AddMessageService,
        private _location: Location,
        private communicationservice: CommunicationService
    ){}

    ngOnInit(): void{
      console.log('latitude : ' + this.lat);
      console.log('latitude : ' + this.lng);
        for(let i = this.messageTypes.length-1; i >= 0; i--)
            if(i%2 !== 0)
                this.messageTypesOb.push({name: this.messageTypes[i-1], value: this.messageTypes[i]});

        this.route.params.subscribe((params: Params) => {
            this.paramValue = Object.keys(params)[0];
            switch (this.paramValue) {
                case 'message_id':
                    console.log('PARAMETER IS ' + Object.keys(params)[0]);
                    this.id = params[this.paramValue];
                    console.log('this id : ' + this.id);
                    break;
                
                case 'message_type':
                    this.messageTypeValue = params[this.paramValue];
                    for(let a = 0; a < this.messageTypesOb.length; a++)
                        if(this.messageTypesOb[a].value === this.messageTypeValue)
                            this.messageTypeName = this.messageTypesOb[a].name;
                    console.log('this name : ' + this.messageTypeName);
                    break;

                default:

                    break;
            }
            
            
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

    addprop():void {
        this.isCollapsed = !this.isCollapsed;
    }

    public collapsed(event:any):void {
        console.log(event);
    }

    public expanded(event:any):void {
        console.log(event);
    }

    addMessage(): void{
        this.messageAddModel = new MessageAddModel();
        //content
        this.messageAddModel.content = this.msgAddModel.content;
        
        //startDate
        this.messageAddModel.startDate = this.msgAddModel.startDate;

        //endDate
        this.messageAddModel.endDate = this.msgAddModel.endDate;

        //type
        this.messageAddModel.type = this.messageTypeName;

        //status
        this.messageAddModel.status = "NEW";

        //user
        let user = JSON.parse(localStorage.getItem('user'));
        this.messageAddModel.user = user.user;

        //companyBranchList
        let companyBranchList = JSON.parse(localStorage.getItem('companyBranchList'));
        this.messageAddModel.companyBranchList = companyBranchList.companyBranchList;

        //companyBranchCount
        this.messageAddModel.companyBranchCount = this.messageAddModel.companyBranchList.length;

        //location
        this.messageAddModel.location.name = this.messageAddModel.companyBranchList[0].name;
        this.messageAddModel.location.city = this.messageAddModel.companyBranchList[0].city;
        this.messageAddModel.location.latitude = this.messageAddModel.companyBranchList[0].latitude;
        this.messageAddModel.location.longitude = this.messageAddModel.companyBranchList[0].longitude;
        this.messageAddModel.location.street = this.messageAddModel.companyBranchList[0].street;
        this.messageAddModel.location.streetNo = this.messageAddModel.companyBranchList[0].streetNo;
        this.messageAddModel.location.address = this.messageAddModel.companyBranchList[0].city;

        console.dir(this.msgAddModel);

        this.addMessageService.addMessage(this.messageAddModel).subscribe(
      data => {
        this.addedMessage = data;
        this.communicationservice.dodanoKomunikat(this.addedMessage.id,this.image);
      },
      error => {
      });
    }

    

}