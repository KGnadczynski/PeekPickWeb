import { Component, OnInit ,ViewEncapsulation} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute } from '@angular/router';
import { Company } from './company';
import { CompanyService } from './company.service';
import { ObjectList } from './company';

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

  constructor(private route: ActivatedRoute, private _companyService: CompanyService) {}

  ngOnInit() {
    
    this.sub = this.route.params.subscribe(params =>  {
        this.id = +params['name'];
        console.log('id: ' + this.id);
        this._companyService.getCompany(this.id).subscribe(
          receivedCompany => {
              this.otherOneCompany = receivedCompany;
              this.name = receivedCompany.company.name;
              this.lat = receivedCompany.latitude;
              this.lng = receivedCompany.longitude;
              console.log('this.name : ' + this.name);
              console.log('this other company:');
              console.dir(this.otherOneCompany);
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