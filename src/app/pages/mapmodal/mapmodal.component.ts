import { Component, OnInit, ViewEncapsulation, ViewChild} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ObjectList } from '../komunikat/komunikat';
import { KomunikatServiceComponent } from '../komunikat-single/komunikat-single.service';
import { ModalDirective } from 'ng2-bootstrap/modal';
import { Location } from '@angular/common';
import { AgmMap} from '@agm/core';


@Component({
  selector: 'mapmodal',
  encapsulation: ViewEncapsulation.None,
  styles: [require('./mapmodal.scss')],
  template: require('./mapmodal.component.html'),
  providers: [KomunikatServiceComponent]
})
export class MapModalComponent implements OnInit {

  private sub: any;
  private message: ObjectList;
  private id: number;
  zoom: number =8; 
  lat: number;
  lng: number;
   triggerResize:boolean = true;
   @ViewChild('childModal') public childModal: ModalDirective;
   @ViewChild(AgmMap) private sebmGoogleMap: any;

  constructor(private route: ActivatedRoute,private komunikatSingleService: KomunikatServiceComponent,private _location: Location) {}

  ngOnInit(): void {

      this.sub = this.route.params.subscribe(params =>  {
          this.id = +params['id_komunikat'];
      });
      this.komunikatSingleService.getKomunikat(this.id).subscribe(komunikat => {
        this.message = komunikat;
        this.lat =  this.message.location.latitude;
        this.lng = this.message.location.longitude;
      });

    }

      ngAfterViewChecked(){
        if(this.triggerResize){
            setTimeout(() => this.sebmGoogleMap.triggerResize().then(res => { 
              this.sebmGoogleMap._mapsWrapper.setCenter({lat: this.lat, lng: this.lng});
                console.log('triggerResize');  
            }),300);
            this.triggerResize = false;
        }             
        
     }  

  
        

    ngOnDestroy() { 
      this.triggerResize = true;   
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