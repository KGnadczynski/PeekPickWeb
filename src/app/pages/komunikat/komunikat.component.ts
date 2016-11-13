import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {KomunikatService} from "./komunikatservice.component.ts";
import {Komunikat} from "./komunikat.ts";

import { Observable } from 'rxjs/Rx';
// Our HTTP Component
@Component({
  selector: 'komunikatcomponent',
  templateUrl: './komunikat.html',
  encapsulation: ViewEncapsulation.None,
  styles: [require('./komunikat.scss')],
  providers: [KomunikatService]

})
export class KomunikatComponent implements OnInit {

  komunikatyList: Komunikat[] = [];

  logged = true;

  constructor(private _komunikatyService: KomunikatService){
  }

  ngOnInit() { this.getDataFromServer(); }

  getDataFromServer (){
    this._komunikatyService.getKomunikaty()
      .subscribe(
        (data: Komunikat[]) => this.komunikatyList = data
      );
  }

  onDateChanged(event:any) {
    console.log('onDateChanged(): ', event.date, ' - formatted: ', event.formatted, ' - epoc timestamp: ', event.epoc);
  }
  expandMessage (komunikat){
    komunikat.expanded = !komunikat.expanded;
  }


  postDataToServer (){
/*    this._httpCarService.postCarRestful(this.productCode,this.productName,this.productLine,this.buyPrice).subscribe(//call the post
      data => this.postMyCarToServer = JSON.stringify(data), // put the data returned from the server in our variable
      error => console.log("Error HTTP Post Service"), // in case of failure show this message
      () => console.log("Job Done Post !")//run this code in all cases
    );*/
  }
}
