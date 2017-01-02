///<reference path="../../../../node_modules/@types/googlemaps/index.d.ts"/>
import {Component, OnInit, ViewEncapsulation, ViewChild, ElementRef,ViewContainerRef} from '@angular/core';
import {KomunikatService} from './komunikatservice.component';
import {KomunikatyList} from "./komunikatlist.model";
import {Subscription} from 'rxjs';
import { Modal,BSModalContext } from 'angular2-modal/plugins/bootstrap';
import { Overlay, overlayConfigFactory } from 'angular2-modal';
import { CustomModalContext, CustomModal } from './custom-modal-sample';


@Component({
  selector: 'komunikatcomponent',
  templateUrl: './komunikat.html',
  encapsulation: ViewEncapsulation.None,
  styles: [require('./komunikat.scss')],
  providers: [KomunikatService,Modal]

})
export class KomunikatComponent implements OnInit {

  typyKomunikatow = [ "WORK", "PROMOTION", "EVENT", "SHORT_TERM_OFFER", "WORTH_SEEING"];
  kulturairozrywka = ["artyści, zespoły", "escape roomy, parki rozrywki", "kino, teatr" ,"muzeum, wystawy" ,"inne"];
  gastronomiainocnezycie = ["food truck","kawiarnie","kluby","puby","restauracje" , "inne"];
  selected = [];

  google:any;
  pageNumber = 1;
  private komunikatyList: KomunikatyList;
  logged = false;
  public isCollapsed:boolean = true;
  public isCollapsedGastro:boolean = true;
  busy: Subscription;


  @ViewChild("google_places_ac")
  public searchElementRef: ElementRef;


  public collapsed(event:any):void {
    console.log(event);
  }

  public expanded(event:any):void {
    console.log(event);
  }

  onScrollDown () {
    if(!this.komunikatyList.isLastPage) {
      this.pageNumber+=1
      console.log('scrolled!!'+this.pageNumber);
      this.getDataFromServer(this.pageNumber);
    }
  }


  constructor(private _komunikatyService: KomunikatService, public modal: Modal){

  }

  ngOnInit() {
    this.komunikatyList = new KomunikatyList();
    this.getDataFromServer(this.pageNumber);


    var autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {});
    google.maps.event.addListener(autocomplete, 'place_changed', function() {
      var place = autocomplete.getPlace();
      console.log(place)
    });

  }

  getDataFromServer (page :any,params = []){
    if(params.length !=0) {
     this.busy = this._komunikatyService.getKomunikaty(page,params)
            .subscribe(
              (result => {
                  if (page === 1) {
                    this.komunikatyList = result;
                  } else {
                    this.komunikatyList.komunikaty = this.komunikatyList.komunikaty.concat(result.komunikaty);
                    this.komunikatyList.isLastPage = result.isLastPage;
                  }
                }
              ));
    } else {
   this.busy = this._komunikatyService.getKomunikaty(page)
      .subscribe(
        (result => {
            if (page === 1) {
              this.komunikatyList = result;
            } else {
              this.komunikatyList.komunikaty = this.komunikatyList.komunikaty.concat(result.komunikaty);
              this.komunikatyList.isLastPage = result.isLastPage;
            }
          }
        ));
  }
  }



  onDateChanged(event:any) {
    console.log('onDateChanged(): ', event.date, ' - formatted: ', event.formatted, ' - epoc timestamp: ', event.epoc);
  }

  clicked(event) {
     console.log('clicked');
     this.getDataFromServer(this.pageNumber,this.selected);
  }

  toggle(id) {
    var index = this.selected.indexOf(id);
    if (index === -1) this.selected.push(id);
    else this.selected.splice(index, 1);

  }

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

  openCustom() {
    return this.modal.open(CustomModal,  overlayConfigFactory({ num1: 2, num2: 3 }, BSModalContext));
  }


  postDataToServer (){
/*    this._httpCarService.postCarRestful(this.productCode,this.productName,this.productLine,this.buyPrice).subscribe(//call the post
      data => this.postMyCarToServer = JSON.stringify(data), // put the data returned from the server in our variable
      error => console.log("Error HTTP Post Service"), // in case of failure show this message
      () => console.log("Job Done Post !")//run this code in all cases
    );*/
  }
}
