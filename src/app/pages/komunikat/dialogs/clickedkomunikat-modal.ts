import {Component, OnInit} from '@angular/core';

import { DialogRef, ModalComponent, CloseGuard } from 'angular2-modal';
import { BSModalContext } from 'angular2-modal/plugins/bootstrap';
import {KomunikatService} from "./../komunikatservice.component";
import {KomunikatDodanie} from "./../komunikatdodanie";
import {CommunicationService} from "./../communicationservice.component";
import {ObjectList} from "./../komunikat"

export class CustomModalContext extends BSModalContext {
  public komunikat: ObjectList;
}

/**
 * A Sample of how simple it is to create a new window, with its own injects.
 */
@Component({
  selector: 'modal-content',
  styles: [require('./../komunikat.scss')],
  //TODO: [ngClass] here on purpose, no real use, just to show how to workaround ng2 issue #4330.
  // Remove when solved.
  /* tslint:disable */ template: `
     <div class="container-fluid custom-modal-container">
  <div class="feed-messages-container">
        <div class="message-icon" >
      <img class="photo-icon" src="{{ context.komunikat.user.company.mainImageUrl}}">
    </div>

      <div class="text-block text-message">
        <div class="message-header">
          <span class="author">{{ context.komunikat.nearestCompanyBranch.name }} {{ context.komunikat.nearestCompanyBranch.city}} {{ context.komunikat.nearestCompanyBranch.street}} {{ context.komunikat.nearestCompanyBranch.streetNo}}

          </span>
        </div>
        <div class="message-content line-clamp">
          <span >{{ context.komunikat.content}} </span>
        </div>

        <div class="message-time">
          <div class="top-time">
          Data rozpoczęcia
          </div>
          <div class="post-time">
            {{ context.komunikat.startDate }}
          </div>
          <div class="ago-time">
            {{ context.komunikat.endDate }}
          </div>
        </div>
          <div class="preview" *ngIf="context.komunikat.mainImageUrl !== null">
              <img src="{{ context.komunikat.mainImageUrl}}"   height="500" width="500">
          </div>
        </div>
    </div>
     <button type="button" class="btn btn-primary" (click)="clickedZamknij()"
          >Zamknij
  </button>
     </div>
  `
})
export class ClickedKomunikatModal implements CloseGuard, ModalComponent<CustomModalContext>, OnInit {


  context: CustomModalContext;
  typyKomunikatow = [ "WORK", "PROMOTION", "EVENT", "SHORT_TERM_OFFER", "WORTH_SEEING"];
  public wrongAnswer: boolean;
  public tekst: any;
  result:any;
  komunikatDodanie:KomunikatDodanie;
  komunikatModel:any = {};
  selectedTyp:string;
  image:File;

  constructor(public dialog: DialogRef<CustomModalContext>,private komunikatyService: KomunikatService,private communicationservice: CommunicationService) {
    this.context = dialog.context;
    this.wrongAnswer = true;
  }

  ngOnInit() {

  }

  onKeyUp(value) {
    this.wrongAnswer = value != 5;
    this.dialog.close();
  }


  beforeDismiss(): boolean {
    return true;
  }

  beforeClose(): boolean {
    return this.wrongAnswer;
  }


  clickedZamknij(){
    this.dialog.close();
  }
  changeTyp(event:any){
    console.log(event);
    this.komunikatModel.type.toString
  }


  onDateChanged(event:any) {
  console.log('onDateChanged(): ', event.date, ' - jsdate: ', new Date(event.jsdate).toLocaleDateString(), ' - formatted: ', event.formatted, ' - epoc timestamp: ', event.epoc);
}

  fileChange(event) {
    let fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      this.image = fileList[0];
    }
  }
}
