import { Component, OnInit,AfterViewChecked, ViewEncapsulation , ViewChild} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute } from '@angular/router';
import { Company } from './company';
import { CompanyService } from './company.service';
import { ObjectList,MarkerObject } from './company';
import { AgmMap, MapsAPILoader} from '@agm/core';

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
	latlngBounds: any;
	markers= new Array<MarkerObject>();
	zoom: number = 7;
	@ViewChild(AgmMap) sebmGoogleMap: any;

	constructor(private route: ActivatedRoute, private _companyService: CompanyService, private mapsAPILoader: MapsAPILoader) {}

	ngOnInit() {

		this.sub = this.route.params.subscribe(
			params =>  {
				this.id = +params['name'];

				this._companyService.getCompanyBranches(this.id).subscribe(
					branches => {
						this.otherOneCompany = branches[0];
						this.name = branches[0].name;
						this.lat = branches[0].latitude;
						this.lng = branches[0].longitude;
						this.companyBranches = branches;
						for (let companyBranch of this.companyBranches) {
							var marker = new MarkerObject();
							console.log('Branch '+companyBranch.latitude);
							marker.label = companyBranch.name;
							marker.lat = companyBranch.latitude;
							marker.lng = companyBranch.longitude;
							console.log('Branch '+ marker.label);
							this.markers.push(marker);
						}
						this.mapsAPILoader.load().then(() => {
							this.latlngBounds = new window['google'].maps.LatLngBounds();
							for (let marker of this.markers)
								this.latlngBounds.extend(new window['google'].maps.LatLng(marker.lat, marker.lng));
							
						});  
					}
				);
				/*
				this._companyService.getCompanyMainBranch(this.id).subscribe(
					receivedCompany => {

						console.log('received company: ');
						console.dir(receivedCompany);

						this.otherOneCompany = receivedCompany;
						this.name = receivedCompany.company.name;
						this.lat = receivedCompany.latitude;
						this.lng = receivedCompany.longitude;

						this._companyService.getCompanyBranches(this.id).subscribe(
							branches => {
								this.companyBranches = branches;

								for (let companyBranch of this.companyBranches) {
									var marker = new MarkerObject();
									console.log('Branch '+companyBranch.latitude);
									marker.label = companyBranch.name;
									marker.lat = companyBranch.latitude;
									marker.lng = companyBranch.longitude;

									console.log('Branch '+ marker.label);
									this.markers.push(marker);
								}


								this.mapsAPILoader.load().then(() => {
									this.latlngBounds = new window['google'].maps.LatLngBounds();
									//  this.markers.forEach((this.companyBranch) => {
									//    this.latlngBounds.extend(new window['google'].maps.LatLng(this.companyBranch.latitude, this.companyBranch.longitude));
									// });
									for (let marker of this.markers)
										this.latlngBounds.extend(new window['google'].maps.LatLng(marker.lat, marker.lng));
									
								});  

								console.log('Branch '+JSON.stringify(this.markers)); //
							},
							error => {
								console.log('error getting branches');
								console.dir(error);
							}
						);

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
					error => {
						console.log('error getting main branch:');
						console.dir(error);
					}
				);
				*/
			}
		);

	}

	ngOnDestroy() {
		this.sub.unsubscribe();
	}

}