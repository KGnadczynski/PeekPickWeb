import { Component, OnInit ,ViewEncapsulation} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {  ActivatedRoute } from '@angular/router';

import { Company } from './company';
import { CompanyService } from './company.service';

import { ObjectList } from './company';

@Component({
  selector: 'company',
  encapsulation: ViewEncapsulation.None,
  styles: [require('./company.scss')],
  template: require('./company.html')
})

export class CompanyComponent implements OnInit {
  
  private sub:any;
  private id: number;
  private otherOneCompany: Company;
  private otherObjectList: ObjectList;
  lat: number;
  lng: number;

  constructor(private route: ActivatedRoute, private _companyService: CompanyService) {}

  ngOnInit() {
    
    this.sub = this.route.params.subscribe(params =>  {
        this.id = +params['name'];
    });
    
    let company = this._companyService.getCompany({id: this.id});
    company.$observable.subscribe((receivedCompany: Company) => {
      this.otherOneCompany = receivedCompany;
      this.lat = this.otherOneCompany.latitude;
      this.lng = this.otherOneCompany.longitude;
      console.log('lat: ' + this.lat);
      console.log('lng: ' + this.lng);
    });

    let companyMsg = this._companyService.getCompanyMessages({id: this.id});
    companyMsg.$observable.subscribe((receivedMsg:ObjectList) => {
      this.otherObjectList = receivedMsg;

      console.dir(this.otherObjectList);
      
      
    });

    //this.lat = this.otherOneCompany.latitude;
    //this.lng = this.otherOneCompany.longitude;
    
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}