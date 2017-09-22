import { Component, OnInit, ViewEncapsulation, ViewChild} from '@angular/core';
import { ProfileService } from '../../profile.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AgmMap, MapsAPILoader } from '@agm/core';
import { ModalDirective } from 'ng2-bootstrap/modal';

@Component({
    selector: 'profile-branches',
    encapsulation: ViewEncapsulation.None,
    styles: [require('./profile-branches.scss')],
    template: require('./profile-branches.component.html'),
    providers: [ProfileService]
})

export class ProfileBranchesComponent implements OnInit {

	companyBranches: any[];
	isCollapse:boolean = true;
	error: string = "";

	title: string = 'Czy jesteś pewny że chcesz usunąć ten oddział?';
    confirmClicked: boolean = false;
    cancelClicked: boolean = false;
    isOpen: boolean = false;
    geocoder:any;
    lat: number = 52.0409;
    lng: number = 19.2850;
    localization:any;
    zoom: number = 6;
    @ViewChild('childModal') childModal: ModalDirective;
    @ViewChild(AgmMap) sebmGoogleMap: any;
    valueForMap:any;
    

    constructor(private profileService: ProfileService, private fb: FormBuilder,private mapsAPILoader: MapsAPILoader){
                this.mapsAPILoader.load().then(() => {
                    console.log('google script loaded');
                    this.geocoder = new google.maps.Geocoder();
                    console.log(this.geocoder);
            });
            }

    ngOnInit(): void {

        this.profileService.getUser().subscribe(
            user => {
                this.profileService.getCompanyBranches(user.company.id).subscribe(
                    branches => {
                        this.companyBranches = branches;
                        this.companyBranches.forEach((obj) => {
                            obj.collapse = true;
                        });
                    }
                );
            }
        );
    }
    
    addOrEdit(event: any){
        console.log('emmitiing is working');
        console.dir(event);
    }
	
	editBranch(value:any, id: number){
         console.log('edditing '+value.city+value.street+value.streetNo);
         

          this.editBranchGeo(id,value,fun => {
            if(value.error != null && value.error ==true) {
              this.childModal.show();
              setTimeout(() => this.sebmGoogleMap.triggerResize().then(res => { 
                        console.log('triggerResize');  
                        console.log('this.lat: ' + this.lat);
                        this.valueForMap = value;
                        this.sebmGoogleMap._mapsWrapper.setCenter({lat: this.lat, lng: this.lng});
                        this.changeAddress(this.callbackEdit);
                    }),300);        
            } else {
             this.editBranchCallback(id,value); 
             } 
        });
    }
    
 
	addNewBranch(value,fn): void{
        var address =  value.city+" "+value.street+" "+value.streetNo;
            console.log('address'+ address);
            this.geocoder.geocode( { 'address': address}, function(results, status) {

            if (status == google.maps.GeocoderStatus.OK) {
        
    
             value.lat = results[0].geometry.location.lat();
             value.lng =  results[0].geometry.location.lng();
             console.log('value.lng '+ value.lng);
             fn(value);
            } else {

             value.error =true;
             fn(value);    
            } 
        }); 
       
    }

    editBranchGeo(id,value,fn): void{
        var address =  value.city+" "+value.street+" "+value.streetNo;
            console.log('address'+ address);
            this.geocoder.geocode( { 'address': address}, function(results, status) {

            if (status == google.maps.GeocoderStatus.OK) {
        
    
             value.lat = results[0].geometry.location.lat();
             value.lng =  results[0].geometry.location.lng();
             console.log('value.lng '+ value.lng);
             fn(id,value);
            } else {

             value.error =true;
             fn(id,value);    
            } 
        }); 
       
    }

    
    callbackEdit = (address: string) : void => {
        console.log('callbackEdit');  
         this.localization = address;
    }

     changeAddress(callback: Function):void {
         var address="";

             var latlng = {lat: this.lat, lng:this.lng};
                this.geocoder.geocode( { 'location': latlng}, function(results, status) {
                // and this is function which processes response
                    if (status == google.maps.GeocoderStatus.OK) {
                        console.log('geocoder inside: '+results[1].formatted_address);  
                        address=results[0].formatted_address;
                    } else {
                        console.log("Geocode was not successful for the following reason: " + status);
                    }
                    callback(address);  
                }); 
    }

    addNewBranchLatLng(value): void {
     /*   this.addNewBranch(value,function(value) {
            console.log('ADRESS '+value.lat);
             this.addNewBranchCallback(value);  
        });*/

        this.addNewBranch(value,fun => {
            if(value.error != null && value.error ==true) {
              this.childModal.show();
              setTimeout(() => this.sebmGoogleMap.triggerResize().then(res => { 
                        console.log('triggerResize');  
                        console.log('this.lat: ' + this.lat);
                        this.valueForMap = value;
                        this.sebmGoogleMap._mapsWrapper.setCenter({lat: this.lat, lng: this.lng});
                        this.changeAddress(this.callbackEdit);
                    }),300);        
            } else {
             this.addNewBranchCallback(value); 
             } 
        });
    }

     mapClicked($event: any) {
      console.log('Map clicked');
      this.lat =  $event.coords.lat;
      this.lng = $event.coords.lng;
       this.changeAddress(this.callbackEdit);
    }

    editBranchCallback(id,value) : void {

		console.log('value:');
		console.dir(value);
		console.log('id: ' + id);

        this.profileService.getCompanyBranch(id).subscribe(
			branch => {
				console.log('branch:');
				console.dir(branch);
				// branch.main = true;
				this.profileService.editBranch(branch, id).subscribe(
					editedBranch => {
						console.log('edited branch:');
						console.dir(editedBranch);
					},
					error => {
						console.log('errorEdited:');
						console.dir(error);
					}
				);
			},
			error => {
				console.log('error');
				console.dir(error);
			}
		);
           /*this.profileService.getCompanyBranch(id).subscribe(companyBranch => {

            console.log('companyBranch before:');
            console.dir(companyBranch);

            Object.keys(value).forEach((key) => {
                if(value[key])
                    companyBranch[key] = value[key];
            });

            console.log('companyBranch after:');
            console.dir(companyBranch);

            this.profileService.editBranch(companyBranch, companyBranch.id).subscribe(editedBranch => {
                
                let objIndex = this.companyBranches.findIndex((obj => obj.id === companyBranch.id));
                this.companyBranches[objIndex] = editedBranch;
                this.companyBranches[objIndex].collapse = !this.companyBranches[objIndex].collapse;
            });
        });*/
    }

   addNewBranchCallback(value) : void {
            this.profileService.getUser().subscribe(user => {
            this.profileService.getCompanyBranches(user.company.id).subscribe(branches => {
                let size = branches.length;
                let body = {
                    "city": value.city,
                    "company": {
                        "category": {
                            "id": user.company.category.id,
                            "name": user.company.category.name
                        },
                        "id": user.company.id,
                        "name": user.company.name
                    },
                    "description": value.description,
                    "distance": 0,
                    "email": value.email,
                    "main": false,
                    "latitude": value.lat,
                    "longitude": value.lng,
                    "name": value.name,
                    "openingHours": value.openingHours,
                    "phoneNumber": value.phoneNumber,
                    "street": value.street,
                    "streetNo": value.streetNo,
                    "website": value.website
                }
                
                if(size === 0)
                    body.main = true;
                
                this.profileService.addNewBranch(body).subscribe(result => {
                    this.companyBranches.push(result);
                    
                    this.companyBranches.forEach((obj) =>{
                        obj.collapse = true;
                    });
                    this.isCollapse = !this.isCollapse;

                    console.log('result adding: ');
                    console.dir(result);
                },
                error => {
                    console.log('error post');
                    console.dir(error);
                }
                );
            });
        })
    }
	
	deleteBranch(id: number): void{
        console.log('deleteing');

        this.profileService.deleteBranch(id).subscribe(
            result => {
                this.companyBranches = this.companyBranches.filter((el) => {
                    return el.id !== id
                });
            },
            error => {
                this.error = "Nie można usunąć głównego oddziału";
                console.log('error from deleting: ');
                console.dir(error);
            }
        )
        
	}
	
	changeMainBranch(id: number): void{
        this.profileService.getCompanyBranch(id).subscribe(companyBranch => {
            if(companyBranch.latitude != 0 && companyBranch.longitud) {
                localStorage.setItem('latitude', companyBranch.latitude);
                localStorage.setItem('longitude', companyBranch.longitude);
            }
            companyBranch.main = true;
            this.companyBranches[this.companyBranches.findIndex(x => x.main)].main = false;

            this.profileService.editBranch(companyBranch, id).subscribe(edited => {
                let objIndex = this.companyBranches.findIndex((obj => obj.id === companyBranch.id));
                this.companyBranches[objIndex] = edited;
                this.companyBranches.forEach((obj) =>{
                    obj.collapse = true;
                });
            });
        });
    }

     closeModal(){
        this.childModal.hide();
    }

    confirmMap(): void {
        this.childModal.hide();
        this.valueForMap.lat = this.lat;
        this.valueForMap.lng =  this.lng
        console.log('this.valueForMap '+this.valueForMap.lat);
        this.addNewBranchCallback(this.valueForMap);
    }

}