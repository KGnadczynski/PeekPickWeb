import {Component, OnInit} from '@angular/core';

import { DialogRef, ModalComponent, CloseGuard } from 'angular2-modal';
import { BSModalContext } from 'angular2-modal/plugins/bootstrap';
import {KomunikatService} from "./../komunikatservice.component.ts";
import {KomunikatDodanie} from "./../komunikatdodanie";
import {CommunicationService} from "./../communicationservice.component.ts";
import {ObjectList} from "./../komunikat.ts"

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
      <img class="photo-icon" src="{{ context.komunikat.user.company.mainImageUrl}}" height="50" width="50">
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
  constructor(public dialog: DialogRef<CustomModalContext>,private komunikatyService: KomunikatService,private communicationservice: CommunicationService) {
    this.context = dialog.context;
  }
  ngOnInit() {
  }
  onKeyUp(value) {
    this.dialog.close();
  }

  clickedZamknij(){
    this.dialog.close();
  }

}
