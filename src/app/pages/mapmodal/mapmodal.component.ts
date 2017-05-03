import { Component, OnInit, ViewEncapsulation, ViewChild} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ObjectList } from '../komunikat/komunikat';
import { KomunikatServiceComponent } from '../komunikat-single/komunikat-single.service';
import { ModalDirective } from 'ng2-bootstrap/modal';
import { Location } from '@angular/common';


@Component({
  selector: 'mapmodal',
  styles: [require('./mapmodal.scss')],
  template: require('./mapmodal.component.html'),
  providers: [KomunikatServiceComponent]
})
export class MapModalComponent implements OnInit {

  private sub: any;
  private message: ObjectList;
  private id: number;
   @ViewChild('childModal') public childModal: ModalDirective;

  constructor(private route: ActivatedRoute,private komunikatSingleService: KomunikatServiceComponent,private _location: Location) {}

  ngOnInit(): void {

      this.sub = this.route.params.subscribe(params =>  {
          this.id = +params['id_komunikat'];
      });

      this.komunikatSingleService.getKomunikat(this.id).subscribe(komunikat => {
        this.message = komunikat;
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