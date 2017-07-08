import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
// import { CompanyInfoService } from './company-info.service';

@Component({
  selector: 'company-info',
  encapsulation: ViewEncapsulation.None,
  styles: [require('./company-info.scss')],
  template: require('./company-info.component.html'),
//   providers: [CompanyInfoService]
})

export class CompanyInfoComponent implements OnInit {

    @Input() otherOneCompany: any;

    constructor(){}

    ngOnInit(): void {

    }

}