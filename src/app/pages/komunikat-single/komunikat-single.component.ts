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
    address: string = "";
    addressMap: string = "";

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

        if(komunikat.location){
            this.address = komunikat.location.address;
            this.addressMap = komunikat.location.address;
        } else if(komunikat.companyBranchList.length === 1){
            this.address = komunikat.companyBranchList[0].city +','+ komunikat.companyBranchList[0].street+" "+ komunikat.companyBranchList[0].streetNo;
            this.addressMap = komunikat.companyBranchList[0].city +','+ komunikat.companyBranchList[0].street+" "+ komunikat.companyBranchList[0].streetNo;
        } else if(komunikat.companyBranchList.length > 1 && komunikat.companyBranchList.length < 5) {
           this.address = komunikat.companyBranchList.length+" lokalizacje, Najbliższa: "+komunikat.companyBranchList[0].city +','+ komunikat.companyBranchList[0].street+" "+ komunikat.companyBranchList[0].streetNo;
           this.addressMap = komunikat.companyBranchList[0].city +','+ komunikat.companyBranchList[0].street+" "+ komunikat.companyBranchList[0].streetNo;
        }
        else if(komunikat.companyBranchList.length >= 5) {
           this.address = komunikat.companyBranchList.length+" lokalizacji, Najbliższa: "+komunikat.companyBranchList[0].city +','+ komunikat.companyBranchList[0].street+" "+ komunikat.companyBranchList[0].streetNo;
           this.addressMap = komunikat.companyBranchList[0].city +','+ komunikat.companyBranchList[0].street+" "+ komunikat.companyBranchList[0].streetNo;
        }

        let kilometers;
        if("geolocation" in navigator){
            navigator.geolocation.getCurrentPosition((position)=>{

                let browserCoordinates: GeoCoord = {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                };

                let otherCoordinates: GeoCoord = {
                    latitude: komunikat.companyBranchList[0].latitude,
                    longitude: komunikat.companyBranchList[0].longitude
                };
                
                kilometers = this.haversineService.getDistanceInKilometers(browserCoordinates, otherCoordinates);
                komunikat.distance = kilometers;

            });
        }
        
        this.message = komunikat;
        console.log('single message:');
        console.dir(komunikat);
        
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

    getLocation(message: any): string {
        
        
        /*if(message.location != null) {
           return message.location.address;
        } /*else if(message.companyBranchCount == 1) {
           return message.nearestCompanyBranch.city +','+ message.nearestCompanyBranch.street+" "+ message.nearestCompanyBranch.streetNo;
        }else if(message.companyBranchCount > 1 && message.companyBranchCount < 5) {
           return message.companyBranchCount+" lokalizacje, Najbliższa: "+message.nearestCompanyBranch.city +','+ message.nearestCompanyBranch.street+" "+ message.nearestCompanyBranch.streetNo;
        }
        else if(message.companyBranchCount >= 5) {
           return message.companyBranchCount+" lokalizacji, Najbliższa: "+message.nearestCompanyBranch.city +','+ message.nearestCompanyBranch.street+" "+ message.nearestCompanyBranch.streetNo;
        }*/
        return '';
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

    navigateToMap(location: any){
        console.log('odpalamy mape '+location);
        var URL =  "https://maps.google.com/maps?q="+location;
        var win = window.open(URL, "_blank");
        if (win) {
        //Browser has allowed it to be opened
            win.focus();
        } else {
            //Browser has blocked it
            alert('Zezwól na wyskakujące okienka aby wyświetlić trasę');
        }
    }

    showSocialShare() {
        this.socialVisible =  !this.socialVisible;
    }
}