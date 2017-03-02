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

export class CompanyComponent implements OnInit {
  
  private sub:any;
  private id: number;
  private otherOneCompany: Company;

  constructor(private route: ActivatedRoute, private _companyService: CompanyService) {}

  ngOnInit() {
    
    this.sub = this.route.params.subscribe(params =>  {
        this.id = +params['name'];
    });
    
    let company = this._companyService.getCompany({id: this.id});
    company.$observable.subscribe((receivedCompany: Company) => {
      this.otherOneCompany = receivedCompany;
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}