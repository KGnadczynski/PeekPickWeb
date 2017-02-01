///<reference path="../../../../node_modules/@types/googlemaps/index.d.ts"/>
import {Component, OnInit, ViewEncapsulation, ViewChild, ElementRef} from '@angular/core';
import {KomunikatService} from './komunikatservice.component';
import {KomunikatyList} from "./komunikatlist.model";
import {Subscription} from 'rxjs';
import { Modal,BSModalContext } from 'angular2-modal/plugins/bootstrap';
import {overlayConfigFactory } from 'angular2-modal';
import { DodajKomunikatModal } from './dialogs/dodajkomunikat-modal';
import {ClickedKomunikatModal} from './dialogs/clickedkomunikat-modal';
import {CommunicationService} from "./communicationservice.component";
import {ObjectList} from "./komunikat.ts"



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
  canScrool = true;
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
      if(this.canScrool){
        this.pageNumber+=1
        this.canScrool = false;
        console.log('scrolled!!'+this.pageNumber);
        this.getDataFromServer(this.pageNumber);
      }
    }
  }


  constructor(private _komunikatyService: KomunikatService, public modal: Modal,private communicationservice: CommunicationService){
  }

  ngOnInit() {
    this.komunikatyList = new KomunikatyList();
    var currentUser = JSON.parse(localStorage.getItem('currentUserToken'));
    if(currentUser != null) {
      var token = currentUser.token
      this.logged = true;
    }
    this.getDataFromServer(this.pageNumber);
    var autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {});
    google.maps.event.addListener(autocomplete, 'place_changed', function() {
      var place = autocomplete.getPlace();
      console.log(place)
    });

    this.communicationservice.dodanieKomunkatuSubject$.subscribe(
      messageId=> {
        this.pageNumber = 1;
        if( messageId.file == null) {
          this.getDataFromServer(1);
        } else {
          this._komunikatyService.postKomunikatImage(messageId).subscribe(
            (result => {
                this.getDataFromServer(1);
              }
            ))
        }
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
                    this.canScrool = true;
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
              this.canScrool = true;
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
    return this.modal.open(DodajKomunikatModal, overlayConfigFactory({ num1: 2, num2: 3 },BSModalContext));
  }

  handleClick(e:MouseEvent, komunikat: ObjectList) {
    return this.modal.open(ClickedKomunikatModal,  overlayConfigFactory({ komunikat: komunikat }, BSModalContext));
  }

}
