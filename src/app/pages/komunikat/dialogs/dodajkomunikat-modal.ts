import {Component, OnInit} from '@angular/core';

import { DialogRef, ModalComponent, CloseGuard } from 'angular2-modal';
import { BSModalContext } from 'angular2-modal/plugins/bootstrap';
import {KomunikatService} from "./../komunikatservice.component.ts";
import {KomunikatDodanie} from "./../komunikatdodanie";
import {CommunicationService} from "./../communicationservice.component.ts";

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
            background-color: #A20E12;
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
                 <input class="form-control" type="text" [(ngModel)]="komunikatModel.content" placeholder="Dodaj treść komunikatu">

     <input  type='file' name='userFile'   (change)="fileChange($event)"accept="image/*" ><br>
<my-date-picker  [options]="myDatePickerOptions"
                (dateChanged)="onDateChanged($event)"
                [selDate]="selectedDate"></my-date-picker>
<my-date-picker  [options]="myDatePickerOptions"
                (dateChanged)="onDateChanged($event)"
                [selDate]="selectedDate"></my-date-picker>

        <select   name="sel2" class="form-control"  [(ngModel)]="selectedTyp">
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
export class DodajKomunikatModal implements CloseGuard, ModalComponent<CustomModalContext>, OnInit {


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

  clicked(){
    console.log(this.tekst);
    this.komunikatDodanie = new KomunikatDodanie();
    this.komunikatDodanie.content = this.komunikatModel.content;
    this.komunikatDodanie.type = "WORK";
    this.komunikatDodanie.startDate = "2017-04-23T18:25:43Z";//this.komunikatModel.startDate;
    this.komunikatDodanie.endDate = "2017-04-23T18:25:43Z";//this.komunikatModel.endDate;
   // this.komunikatDodanie.createDate ="2017-04-23T18:25:43Z" ;//this.komunikatModel.startDate;
    this.komunikatDodanie.status = "NEW";
    this.komunikatDodanie.companyBranch.id = 2;
    this.komunikatDodanie.companyBranch.city = "Chwaszczyno";
    this.komunikatDodanie.companyBranch.name  = "aaaaaaa";
    this.komunikatDodanie.companyBranch.street  = "Gdyńska";
    this.komunikatDodanie.companyBranch.streetNo  = "34";
    this.komunikatDodanie.companyBranch.latitude = "53.32131";
    this.komunikatDodanie.companyBranch.longitude = "53.32131";
    this.komunikatyService.postKomunikat(this.komunikatDodanie).subscribe(
      data => {
        this.result = data;
        this.communicationservice.dodanoKomunikat(this.result.id,this.image);
      },
      error => {
      });
    this.dialog.close();
  }

  clickedAnuluj(){
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
