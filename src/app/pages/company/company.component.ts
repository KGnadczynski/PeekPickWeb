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
  template: require('./company.html'),
})

export class CompanyComponent implements OnInit {
  
  private sub:any;
  private id: number;
  private otherOneCompany: Company;
  private companyImages: any;
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
      console.log('this other company:');
      console.dir(this.otherOneCompany);
      this.lat = this.otherOneCompany.latitude;
      this.lng = this.otherOneCompany.longitude;
      let imgs = this._companyService.getCompanyImages({id:this.id});
      imgs.$observable.subscribe((receivedImgs: any) => {
        this.companyImages = receivedImgs;
        console.log('this other imgs:');
        console.dir(this.companyImages);
      });
    });

  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}