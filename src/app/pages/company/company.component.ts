import { Component, OnInit ,ViewEncapsulation} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {  ActivatedRoute } from '@angular/router';

import { Company } from './company';
import { CompanyService } from './company.service';

@Component({
  selector: 'company',
  encapsulation: ViewEncapsulation.None,
  styles: [require('./company.scss')],
  template: require('./company.html')
})
// Component class implementing OnInit
export class CompanyComponent implements OnInit {
  
  private sub:any;
  private name:number;

  private otherOneCompany: Company;

  constructor(private route: ActivatedRoute, private _companyService: CompanyService) {}

  ngOnInit() {
    console.log('ngoninit started!!');

      /*this.sub = this.route.params.subscribe(params => {
         this.name = params['name'];
    });
*/
    let company = this._companyService.getCompany({id: 1});
    company.$observable.subscribe((receivedCompany: Company) => {
      this.otherOneCompany = receivedCompany;
    });
    console.dir(this.otherOneCompany);
  }

  ngOnDestroy() {
      // Clean sub to avoid memory leak
    //this.sub.unsubscribe();
  }
}
