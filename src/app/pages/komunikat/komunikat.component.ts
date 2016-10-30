import {Component, OnInit} from '@angular/core';
import {KomunikatService} from "./komunikatservice.component.ts";
import {Komunikat} from "./komunikat.ts";
// Our HTTP Component
@Component({
  selector: 'komunikatcomponent',
  templateUrl: './komunikat.html',
  providers: [KomunikatService]

})
export class KomunikatComponent implements OnInit {
  komunikatyList: Komunikat[];

  constructor(private _komunikatyService: KomunikatService){
  }

  ngOnInit() { this.getDataFromServer(); }

  getDataFromServer (){
    this._komunikatyService.getKomunikaty()
      .subscribe(
        komunikatyList => this.komunikatyList = komunikatyList, // put the data returned from the server in our variable
        error => console.log("Error HTTP GET Service"), // in case of failure show this message
        () => console.log(this.komunikatyList)//run this code in all cases
      );
  }
  postDataToServer (){
/*    this._httpCarService.postCarRestful(this.productCode,this.productName,this.productLine,this.buyPrice).subscribe(//call the post
      data => this.postMyCarToServer = JSON.stringify(data), // put the data returned from the server in our variable
      error => console.log("Error HTTP Post Service"), // in case of failure show this message
      () => console.log("Job Done Post !")//run this code in all cases
    );*/
  }
}
