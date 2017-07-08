import { Component, OnInit, ViewEncapsulation, ViewChild} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { KomunikatServiceComponent } from './komunikat-single.service';
import { Observable } from 'rxjs/Observable';
import { ObjectList } from '../komunikat/komunikat';
import { ModalDirective } from 'ng2-bootstrap/modal';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { HaversineService, GeoCoord } from 'ng2-haversine';

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
    private message: ObjectList;
    private imgs: any;
    socialVisible: boolean = false;
    name: string = '';
    latitude: number;
    longitude: number;
    lat: number;
    lng: number;


    @ViewChild('childModal') public childModal: ModalDirective;

    constructor(
      private route: ActivatedRoute, 
      private komunikatSingleService: KomunikatServiceComponent,
      private _location: Location,
      private router: Router,
      private haversineService: HaversineService
    ){
      let moment = require('../../../../node_modules/moment/moment.js');
      moment.locale('pl');
    }

    ngOnInit(): void {

      this.sub = this.route.params.subscribe(params =>  {
          this.id = +params['id_komunikat'];
      });

      this.komunikatSingleService.getKomunikat(this.id).subscribe(komunikat => {
        
        let kilometers;
        if("geolocation" in navigator){
            navigator.geolocation.getCurrentPosition((position)=>{

                let browserCoordinates: GeoCoord = {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                };

                let otherCoordinates: GeoCoord = {
                    latitude: komunikat.location.latitude,
                    longitude: komunikat.location.longitude
                };
                
                kilometers = this.haversineService.getDistanceInKilometers(browserCoordinates, otherCoordinates);
                komunikat.distance = kilometers;

            });
        }
        
        this.message = komunikat;
        
        this.komunikatSingleService.getUserImages(this.message.companyBranchList[0].company.id).subscribe(
            images => {
                this.imgs = images;
            },
            error => {
                this.name = komunikat.companyBranchList[0].company.name;
            }
        );
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

    checkIfFavourite(id: number){
        if(JSON.parse(localStorage.getItem("favs"))){
            if(JSON.parse(localStorage.getItem("favs")).indexOf(id) > -1) return true;
            else return false;
        }
    }

    addToFavourites(id: number){

        if(localStorage.getItem("favs") === null){
            let storedArray = [];
            storedArray.push(id);
            localStorage.setItem("favs", JSON.stringify(storedArray));
        } else {
            let storedParse = JSON.parse(localStorage.getItem("favs"));

            if(storedParse.indexOf(id) === -1){
                storedParse.push(id);
            } else{
                storedParse.splice(storedParse.indexOf(id), 1);
            }
            
            localStorage.setItem("favs", JSON.stringify(storedParse));
            console.dir(localStorage);
            
        }

    }

    navigateToMap(id: number){
        console.log('odpalamy mape');
          console.log('odpalamy mape');
            this.komunikatSingleService.getKomunikat(id).subscribe(komunikat => {
                    this.message = komunikat;
                    console.log('mapa lng '+JSON.stringify(this.message));
                    this.lat =  this.message.companyBranchList[0].latitude;
                    this.lng = this.message.companyBranchList[0].longitude;
                    console.log('mapa lng '+this.lat);
                    var URL =  "https://maps.google.com/maps?q="+this.lat+","+this.lng;
                    var win = window.open(URL, "_blank");
            });
    }

    showSocialShare() {
        this.socialVisible =  !this.socialVisible;
    }
}