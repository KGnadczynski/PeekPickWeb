///<reference path="../../../../node_modules/@types/googlemaps/index.d.ts"/>
import { Component, OnInit, ViewEncapsulation, ViewChild} from '@angular/core';
import {KomunikatService} from './komunikatservice.component';
import { Modal,BSModalContext } from 'angular2-modal/plugins/bootstrap';
import {overlayConfigFactory } from 'angular2-modal';
//import { DodajKomunikatModal } from './dialogs/dodajkomunikat-modal';
import {ClickedKomunikatModal} from './dialogs/clickedkomunikat-modal';
import {CommunicationService} from "./communicationservice.component";
import {ObjectList} from "./komunikat"

import { MessagesComponent } from '../messages/messages.component';


@Component({
  selector: 'komunikatcomponent',
  templateUrl: './komunikat.html',
  encapsulation: ViewEncapsulation.None,
  styles: [require('./komunikat.scss')],
  providers: [KomunikatService,Modal]
})
export class KomunikatComponent implements OnInit {

  logged = false;

  @ViewChild('messagesChild') messageChild: MessagesComponent;

  constructor(
    private _komunikatyService: KomunikatService, 
    private modal: Modal,
    private communicationservice: CommunicationService,
  ){}

  ngOnInit() {
        var currentUser = JSON.parse(localStorage.getItem('currentUserToken'));
    
        if(currentUser != null) {
          var token = currentUser.token
          this.logged = true;
        }

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

  /*onClick() {
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
  }*/
  /*
  openCustom() {
    return this.modal.open(DodajKomunikatModal, overlayConfigFactory({ num1: 2, num2: 3 },BSModalContext));
  }

  handleClick(e:MouseEvent, komunikat: ObjectList) {
    return this.modal.open(ClickedKomunikatModal,  overlayConfigFactory({ komunikat: komunikat }, BSModalContext));
  }*/


}
