import {Component, OnInit, ViewEncapsulation} from '@angular/core';
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


  sum = 100;
  pageNumber = 1;
  throttle = 300;
  scrollDistance = 1;
  private komunikatyList: KomunikatyList;
  logged = false;
  public isCollapsed:boolean = true;
  public isCollapsedGastro:boolean = true;
  public latitude: number;
  public longitude: number;


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
  }

  getDataFromServer (page :any){
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



  onDateChanged(event:any) {
    console.log('onDateChanged(): ', event.date, ' - formatted: ', event.formatted, ' - epoc timestamp: ', event.epoc);
  }



  postDataToServer (){
/*    this._httpCarService.postCarRestful(this.productCode,this.productName,this.productLine,this.buyPrice).subscribe(//call the post
      data => this.postMyCarToServer = JSON.stringify(data), // put the data returned from the server in our variable
      error => console.log("Error HTTP Post Service"), // in case of failure show this message
      () => console.log("Job Done Post !")//run this code in all cases
    );*/
  }
}
