import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute } from '@angular/router';
import { Company } from './company';
import { CompanyService } from './company.service';
import { ObjectList,MarkerObject } from './company';

@Component({
  selector: 'company',
  encapsulation: ViewEncapsulation.None,
  styles: [require('./company.scss')],
  template: require('./company.html'),
  providers: [CompanyService]
})

export class CompanyComponent implements OnInit {
  
  private sub:any;
  private id: number;
  private otherOneCompany: Company;
  private companyImages: any;
  name: string = '';
  lat: number;
  lng: number;
  companyBranches: any[];
  markers= new Array<MarkerObject>();
  zoom: number = 7;
  
  constructor(private route: ActivatedRoute, private _companyService: CompanyService) {}

  ngOnInit() {
    
    this.sub = this.route.params.subscribe(params =>  {
        this.id = +params['name'];
        console.log('id: ' + this.id);
        this._companyService.getCompany(this.id).subscribe(
          receivedCompany => {
            console.log('received company: ');
            console.dir(receivedCompany);
              this.otherOneCompany = receivedCompany;
              this.name = receivedCompany.company.name;
              this.lat = receivedCompany.latitude;
              this.lng = receivedCompany.longitude;
              
              this._companyService.getCompanyBranches(receivedCompany.company.id).subscribe(
                branches => {
                    this.companyBranches = branches;
               
                    for (let companyBranch of this.companyBranches) {
                       var marker =new MarkerObject();
                    console.log('Branch '+companyBranch.latitude); // 1, "string", false
                      marker.label = companyBranch.name;
                      marker.lat = companyBranch.latitude;
                      marker.lng = companyBranch.longitude;
                     
                       console.log('Branch '+marker.label); //
                      this.markers.push(marker);
                    }
                    console.log('Branch '+JSON.stringify(this.markers)); //
                },
                error => {}
              );
              console.log('this.name : ' + this.name);
              console.log('received company:');
              console.dir(receivedCompany);
              this._companyService.getCompanyImages(this.id).subscribe(
                  receivedImgs => {
                      this.companyImages = receivedImgs;
                      console.log('this other imgs:');
                      console.dir(this.companyImages);
                  },
                  imageError => {
                      console.log('Error from image');
                      console.dir(imageError);
                  }
              )
          },
          companyError => {}
        );
    });

  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}