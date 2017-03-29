import { Component, OnInit, ViewEncapsulation, ViewChild} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { KomunikatServiceComponent } from './komunikat-single.service';
import { Observable } from 'rxjs/Observable';
import { ObjectList } from '../komunikat/komunikat';
import { ModalDirective } from 'ng2-bootstrap/modal';
import { Location } from '@angular/common';

@Component({
  selector: 'komunikat-single',
  encapsulation: ViewEncapsulation.None,
  styles: [require('./komunikat-single.scss')],
  template: require('./komunikat-single.component.html'),
  providers: [KomunikatServiceComponent]
})

export class KomunikatSingleComponent implements OnInit {

    private sub: any;
    private id: number;
    private anotherObjectList: ObjectList;
    private imgs: any;
    @ViewChild('childModal') public childModal: ModalDirective;

    constructor(
      private route: ActivatedRoute, 
      private komunikatSingleService: KomunikatServiceComponent,
      private _location: Location
    ){
      let moment = require('../../../../node_modules/moment/moment.js');
      moment.locale('pl');
    }

    ngOnInit(): void {

      this.sub = this.route.params.subscribe(params =>  {
          this.id = +params['id_komunikat'];
      });

      this.komunikatSingleService.getKomunikat(this.id).subscribe(komunikat => {
        this.anotherObjectList = komunikat;
        this.komunikatSingleService.getUserImages(this.anotherObjectList.companyBranchList[0].company.id).subscribe(images => {
          this.imgs = images;
          console.log('images: ');
          console.dir(this.imgs);
        });
        console.log('another komunikat: ');
        console.dir(this.anotherObjectList);
      });

    }

    ngAfterViewInit(): void {
      this.showChildModal();
    }

    public showChildModal(): void {
      this.childModal.show();
    }

    public hideChildModal(): void {
      this.childModal.hide();
      this._location.back();
    }

}