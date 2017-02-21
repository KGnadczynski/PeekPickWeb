import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {  ActivatedRoute } from '@angular/router';

@Component({
  template: `
        <h2>{{name}}</h2>
    `,
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
