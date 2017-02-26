import { Component, OnInit ,ViewEncapsulation} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {  ActivatedRoute } from '@angular/router';

@Component({
  selector: 'company',
  encapsulation: ViewEncapsulation.None,
  styles: [require('./company.scss')],
  template: require('./company.html'),
})
// Component class implementing OnInit
export class CompanyComponent implements OnInit {

  private sub:any;
  private  name:string
  constructor(private route: ActivatedRoute) {

  }
  ngOnInit() {
      this.sub = this.route.params.subscribe(params => {
         this.name = params['name'];
    });
  }

  ngOnDestroy() {
      // Clean sub to avoid memory leak
    this.sub.unsubscribe();
  }
}
