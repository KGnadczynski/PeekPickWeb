import { Component } from '@angular/core';

import { DialogRef, ModalComponent, CloseGuard } from 'angular2-modal';
import { BSModalContext } from 'angular2-modal/plugins/bootstrap';

export class CustomModalContext extends BSModalContext {
  public num1: number;
  public num2: number;
}

/**
 * A Sample of how simple it is to create a new window, with its own injects.
 */
@Component({
  selector: 'modal-content',
  styles: [`
        .custom-modal-container {
            padding: 15px;
        }

        .custom-modal-header {
            background-color: #219161;
            color: #fff;
            -webkit-box-shadow: 0px 3px 5px 0px rgba(0,0,0,0.75);
            -moz-box-shadow: 0px 3px 5px 0px rgba(0,0,0,0.75);
            box-shadow: 0px 3px 5px 0px rgba(0,0,0,0.75);
            margin-top: -15px;
            margin-bottom: 40px;
        }
    `],
  //TODO: [ngClass] here on purpose, no real use, just to show how to workaround ng2 issue #4330.
  // Remove when solved.
  /* tslint:disable */ template: `
        <div class="container-fluid custom-modal-container">
            <div class="row custom-modal-header">
                <div class="col-sm-12">
                    <h1>Dodaj komunikat</h1>
                </div>
            </div>
            <div class="row" [ngClass]="{'myclass' : shouldUseMyClass}">
                <div class="col-xs-12">
                 <input class="form-control" type="text" [(ngModel)]="tekst" placeholder="Dodaj treść komunikatu">
    
    <input  type='file' name='userFile' accept="image/*" ><br>
<my-date-picker [options]="myDatePickerOptions"
                (dateChanged)="onDateChanged($event)"
                [selDate]="selectedDate"></my-date-picker>
<my-date-picker [options]="myDatePickerOptions"
                (dateChanged)="onDateChanged($event)"
                [selDate]="selectedDate"></my-date-picker>

        <select   class="form-control" >
            <option *ngFor="let typ of typyKomunikatow" [ngValue]="kategoria">{{typ}}</option>
          </select>
  <button type="button" class="btn btn-primary" (click)="clicked()"
          >Dodaj
  </button>
    <button type="button" class="btn btn-primary" (click)="clickedAnuluj()"
          >Anuluj
  </button>
        
                </div>
            </div>
        </div>`
})
export class CustomModal implements CloseGuard, ModalComponent<CustomModalContext> {
  context: CustomModalContext;
typyKomunikatow = [ "WORK", "PROMOTION", "EVENT", "SHORT_TERM_OFFER", "WORTH_SEEING"];
  public wrongAnswer: boolean;
  public tekst: any;

  constructor(public dialog: DialogRef<CustomModalContext>) {
    this.context = dialog.context;
    this.wrongAnswer = true;
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

  clicked(){
    console.log(this.tekst);
    this.dialog.close();
  }

  clickedAnuluj(){
    this.dialog.close();
  }

  onDateChanged(event:any) {
  console.log('onDateChanged(): ', event.date, ' - jsdate: ', new Date(event.jsdate).toLocaleDateString(), ' - formatted: ', event.formatted, ' - epoc timestamp: ', event.epoc);
}
}
