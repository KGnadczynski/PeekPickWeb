import {Component, OnInit} from '@angular/core';

import { DialogRef, ModalComponent, CloseGuard } from 'angular2-modal';
import { BSModalContext } from 'angular2-modal/plugins/bootstrap';
import {KomunikatService} from "./../komunikatservice.component";
import {KomunikatDodanie,CompanyBranchList} from "./../komunikatdodanie";
import {CommunicationService} from "./../communicationservice.component";
import { ImageResult, ResizeOptions } from 'ng2-imageupload';

export class CustomModalContext extends BSModalContext {
  public num1: number;
  public num2: number;
}

/**
 * A Sample of how simple it is to create a new window, with its own injects.
 */
@Component({
  selector: 'modal-content',
  styles: [require('./dodajkomunikat.scss')],
  //TODO: [ngClass] here on purpose, no real use, just to show how to workaround ng2 issue #4330.
  // Remove when solved.
  /* tslint:disable */
  template: require('./dodajkomunikat.html')
})

export class DodajKomunikatModal implements CloseGuard, ModalComponent<CustomModalContext>, OnInit {


  context: CustomModalContext;
  typyKomunikatow = [ "WORK", "PROMOTION", "EVENT", "SHORT_TERM_OFFER", "WORTH_SEEING"];
  public tekst: any;
  result:any;
  komunikatDodanie:KomunikatDodanie;
  companyBranch:CompanyBranchList;
  komunikatModel:any = {};
  selectedTyp:string;
  image:File;
  src: string = "";
  resizeOptions: ResizeOptions = {
    resizeMaxHeight: 300,
    resizeMaxWidth: 300
  };

  constructor(public dialog: DialogRef<CustomModalContext>,private komunikatyService: KomunikatService,private communicationservice: CommunicationService) {
    this.context = dialog.context;
  }

  ngOnInit() {

  }

  onKeyUp(value) {
    this.dialog.close();
  }


  beforeDismiss(): boolean {
    return true;
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
    this.komunikatDodanie.user= JSON.parse(localStorage.getItem('user'));
   // this.komunikatDodanie.companyBranchCount=  1;
    this.komunikatDodanie.companyBranchList = JSON.parse(localStorage.getItem('companyBranchList'));
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
  selected(imageResult: ImageResult) {
    this.src = imageResult.resized
      && imageResult.resized.dataURL
      || imageResult.dataURL;

    this.image =  imageResult.file;
  }
}
