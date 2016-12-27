///<reference path="../../../../node_modules/@types/googlemaps/index.d.ts"/>
import {Component, OnInit, ViewEncapsulation, ViewChild, ElementRef} from '@angular/core';
import {KomunikatService} from './komunikatservice.component';
import {KomunikatyList} from "./komunikatlist.model";


@Component({
  selector: 'komunikatcomponent',
  templateUrl: './komunikat.html',
  encapsulation: ViewEncapsulation.None,
  styles: [require('./komunikat.scss')],
  providers: [KomunikatService]

})
export class KomunikatComponent implements OnInit {

  typyKomunikatow = ["Promocja" ,"Praca" , "Wydarzenie" ,"Oferta krótkoterminowa" ,"Warto zajrzeć"];
  kulturairozrywka = ["artyści, zespoły", "escape roomy, parki rozrywki", "kino, teatr" ,"muzeum, wystawy" ,"inne"];
  gastronomiainocnezycie = ["food truck","kawiarnie","kluby","puby","restauracje" , "inne"];
  selected = [];

  google:any;
  pageNumber = 1;
  private komunikatyList: KomunikatyList;
  logged = false;
  public isCollapsed:boolean = true;
  public isCollapsedGastro:boolean = true;


  @ViewChild("google_places_ac")
  public searchElementRef: ElementRef;


  public collapsed(event:any):void {
    console.log(event);
  }

  public expanded(event:any):void {
    console.log(event);
  }

  onScrollDown () {
    this.pageNumber+=1
    console.log('scrolled!!'+this.pageNumber);
    this.getDataFromServer(this.pageNumber);
  }


  constructor(private _komunikatyService: KomunikatService){

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

  getDataFromServer (page :any,params = null){
    if(params != null) {
      this._komunikatyService.getKomunikaty(page,params)
            .subscribe(
              (result => {
                  if (page === 1) {
                    this.komunikatyList = result;
                  } else {
                    this.komunikatyList.komunikaty = this.komunikatyList.komunikaty.concat(result.komunikaty);
                  }
                }
              ));
    } else {
    this._komunikatyService.getKomunikaty(page)
      .subscribe(
        (result => {
            if (page === 1) {
              this.komunikatyList = result;
            } else {
              this.komunikatyList.komunikaty = this.komunikatyList.komunikaty.concat(result.komunikaty);
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


  postDataToServer (){
/*    this._httpCarService.postCarRestful(this.productCode,this.productName,this.productLine,this.buyPrice).subscribe(//call the post
      data => this.postMyCarToServer = JSON.stringify(data), // put the data returned from the server in our variable
      error => console.log("Error HTTP Post Service"), // in case of failure show this message
      () => console.log("Job Done Post !")//run this code in all cases
    );*/
  }
}
