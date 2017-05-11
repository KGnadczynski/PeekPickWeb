import { Component, OnInit, ViewEncapsulation, ElementRef, ViewChild, Output, EventEmitter, NgZone } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { MessageType } from '../../globals/enums/message-type.enum';
import { FiltersService } from './filters.service';
import { MapsAPILoader } from '@agm/core';

@Component({
    selector: 'filters',
    encapsulation: ViewEncapsulation.None,
    template: require('./filters.component.html'),
    styles: [require('./filters.scss')],
    providers: [ FiltersService ]
})

export class FiltersComponent implements OnInit{
    
    isFiltryCollapse:boolean = true;
    filterForm: FormGroup;
    messageTypes: string[] = Object.keys(MessageType);
    messageTypesOb: {name: string, value: string}[] = [];
    categories: {name: string, subcategories: any[], bol: boolean}[] = [];
    someValue: number = 0;
    google:any;
    @Output() myEvent: EventEmitter<any> = new EventEmitter<any>();
    trade: string = "";

    public latitude: number;
    public longitude: number;
    public zoom: number;

    @ViewChild("search")
    public searchElementRef: ElementRef;

    constructor(private fb: FormBuilder, private filtersService: FiltersService, private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone){
        this.filterForm = this.fb.group({
            filterBy: '',
            distance : [10],
            types: fb.array([false, false, false, false, false]),
            searchControl: '',
            trades: fb.array([false, false, false, false, false, false, false])
        });

        this.filterForm.valueChanges.subscribe(data => {

            //console.log('data from filtrs component: ');
            //console.dir(data);

            this.setCurrentPosition();

            this.mapsAPILoader.load().then(() => {
                let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {});

                autocomplete.addListener("place_changed", () => {
                    this.ngZone.run(() => {
                        let place: google.maps.places.PlaceResult = autocomplete.getPlace();

                        if(place.geometry === undefined || place.geometry === null){
                            return;
                        }

                        this.latitude = place.geometry.location.lat();
                        this.longitude = place.geometry.location.lng();
                        this.zoom = 12;
                    })
                })
            });

            let params: {sortType: string, range: number, messageTypeList: string, companyCategoryMainIdList: string} = {
                sortType: '',
                range: 0,
                messageTypeList: "",
                companyCategoryMainIdList: ""
            };

            if(data.filterBy)
                params.sortType = data.filterBy;
            
            if(data.distance)
                params.range = data.distance;
            
            for(let i = 0; i < data.types.length; i++)
                if(data.types[i])
                    params.messageTypeList += this.messageTypesOb[i].name + ";";
                
            for(let i = 0; i < data.trades.length; i++)
                if(data.trades[i]){
                    params.companyCategoryMainIdList += (i+1) + ";";
                }
                    //params.companyTypeMainList.push(i+1);


            //console.log('trades:');
            //console.dir(params.companyTypeMainList);

            this.myEvent.emit(params);
        });
    }

    function2(params: string): void {
        this.myEvent.emit(params);
    }

    ngOnInit(): void {

        this.zoom = 4;
        this.latitude = 39.8282;
        this.longitude = -98.5795;

        this.filtersService.getCompanyCategories().subscribe(resultCategories => {
          for(let categ in resultCategories){
            this.filtersService.getCategorySubcategories(resultCategories[categ].id).subscribe(resultSub => {
                this.categories.push({name: resultCategories[categ].name, subcategories: resultSub, bol: true});
            });
          }
        });
        
        for(let i = this.messageTypes.length-1; i >= 0; i--)
            if(i%2 !== 0)
                this.messageTypesOb.push({name: this.messageTypes[i-1], value: this.messageTypes[i]});
        
    }

    private setCurrentPosition(){
        if("geolocation"  in navigator){
            navigator.geolocation.getCurrentPosition((position) => {
                this.latitude = position.coords.latitude;
                this.longitude = position.coords.longitude;
                this.zoom = 12;
            })
        }
    }

    public collapsed(event:any):void {
        //console.log(event);
    }

    public expanded(event:any):void {
        //console.log(event);
    }

    showRange():void{
        console.log('someRange: ' + this.someValue);
    }

    
}