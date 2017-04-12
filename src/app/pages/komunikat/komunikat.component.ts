///<reference path="../../../../node_modules/@types/googlemaps/index.d.ts"/>
import { Component, OnInit, ViewEncapsulation, ViewChild, ElementRef} from '@angular/core';
import {KomunikatService} from './komunikatservice.component';
import { Modal,BSModalContext } from 'angular2-modal/plugins/bootstrap';
import {overlayConfigFactory } from 'angular2-modal';
import { DodajKomunikatModal } from './dialogs/dodajkomunikat-modal';
import {ClickedKomunikatModal} from './dialogs/clickedkomunikat-modal';
import {CommunicationService} from "./communicationservice.component";
import {ObjectList} from "./komunikat"

import { MessageType } from '../../enums/message-type.enum';

@Component({
  selector: 'komunikatcomponent',
  templateUrl: './komunikat.html',
  encapsulation: ViewEncapsulation.None,
  styles: [require('./komunikat.scss')],
  providers: [KomunikatService,Modal]

})
export class KomunikatComponent implements OnInit {

  messageTypes: string[] = Object.keys(MessageType);
  messageTypesOb: {name: string, value: string}[] = [];
  categories: {name: string, subcategories: any[], bol: boolean}[] = [];

  google:any;

  logged = false;
  isCollapsed:boolean = true;
  isFiltryCollapse:boolean = true;
  public distane: number;

  @ViewChild("google_places_ac")
  public searchElementRef: ElementRef;

  public collapsed(event:any):void {
    console.log(event);
  }

  public expanded(event:any):void {
    console.log(event);
  }

  constructor(private _komunikatyService: KomunikatService, public modal: Modal,private communicationservice: CommunicationService){
    let moment = require('../../../../node_modules/moment/moment.js');
    moment.locale('pl');
}

  ngOnInit() {
        this._komunikatyService.getCompanyCategories().subscribe(resultCategories => {
          for(let categ in resultCategories){
            this._komunikatyService.getCategorySubcategories(resultCategories[categ].id).subscribe(resultSub => {
                this.categories.push({name: resultCategories[categ].name, subcategories: resultSub, bol: true});
            });
          }
        });
        
        for(let i = this.messageTypes.length-1; i >= 0; i--)
            if(i%2 !== 0)
                this.messageTypesOb.push({name: this.messageTypes[i-1], value: this.messageTypes[i]});

        var currentUser = JSON.parse(localStorage.getItem('currentUserToken'));
    
        if(currentUser != null) {
          var token = currentUser.token
          this.logged = true;
        }
    
        var autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {});
        
       google.maps.event.addListener(autocomplete, 'place_changed', function() {
          var place = autocomplete.getPlace();
          console.log(place)
        });

        /*this.communicationservice.dodanieKomunkatuSubject$.subscribe(messageId=> {
            this.pageNumber = 1;
            if( messageId.file == null) {
              this.getDataFromServer(1);
            } else {
              this._komunikatyService.postKomunikatImage(messageId).subscribe((result => {
                this.getDataFromServer(1);
              }));
            }
        });*/
        
        /*this.communicationservice.szukanieKomunkatuSubject$.subscribe(term=> {
            this.getDataFromServerWithSearch(1,term);
        });*/
  }

  /*onDateChanged(event:any) {
    console.log('onDateChanged(): ', event.date, ' - formatted: ', event.formatted, ' - epoc timestamp: ', event.epoc);
  }*/

  onClick() {
    this.modal.prompt()
      .size('lg')
      .showClose(true)
      .title('Dodaj komunikat')
      .body(`

      <input type="file" name="pic" accept="image/*">
      <input type="submit">
      <p><strong>Note:</strong> The accept attribute of the input tag is not supported in Internet Explorer 9 (and earlier versions), and Safari 5 (and earlier).</p>
      <p><strong>Note:</strong> Because of security issues, this example will not allow you to upload files.</p>

            `)
      .open();
  }
/*
  openCustom() {
    return this.modal.open(DodajKomunikatModal, overlayConfigFactory({ num1: 2, num2: 3 },BSModalContext));
  }

  handleClick(e:MouseEvent, komunikat: ObjectList) {
    return this.modal.open(ClickedKomunikatModal,  overlayConfigFactory({ komunikat: komunikat }, BSModalContext));
  }*/

}
