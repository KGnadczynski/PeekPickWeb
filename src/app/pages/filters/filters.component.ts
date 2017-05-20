import { Component, OnInit, ViewEncapsulation, ElementRef, ViewChild, Output, EventEmitter, NgZone, Input } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, FormArray } from '@angular/forms';
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
    categories: {id: number, name: string, subcategories: any[], bol: boolean}[] = [];
    someValue: number = 0;
    google:any;
    @Output() myEvent: EventEmitter<any> = new EventEmitter<any>();
    @Input() id: number;

    public latitude: number;
    public longitude: number;
    public zoom: number;

    @ViewChild("search")
    public searchElementRef: ElementRef;

    get trades(): FormArray{
        return this.filterForm.get('trades') as FormArray;
    }

    get subtrades(): FormGroup{
        return this.filterForm.get('subtrades') as FormGroup;
    }

    addTrade(){
        this.trades.push(new FormControl(false));
    }

    addSubTrade(id: number) {
        let name: string = 'subtrade' + id;
        this.subtrades.addControl(name, new FormArray([]));
    }

    addSubSubTrade(id: number) {
        let subSub = <FormArray>this.subtrades.get('subtrade' + id);
        subSub.push(new FormControl(false));
    }

    constructor(private fb: FormBuilder, private filtersService: FiltersService, private mapsAPILoader: MapsAPILoader, private ngZone: NgZone){
        this.filterForm = this.fb.group({
            filterBy: '',
            distance : [10],
            types: fb.array([false, false, false, false, false]),
            searchControl: '',
            trades: this.fb.array([]),
            subtrades: this.fb.group({})
        });

        this.filterForm.valueChanges.subscribe(data => {

            console.log('data: ');
            console.dir(data);

            let params: {sortType: string, range: number, messageTypeList: string, companyCategoryMainIdList: string, latitude:number, longitude: number, companyCategoryIdList: string} = {
                sortType: '',
                range: 0,
                messageTypeList: "",
                companyCategoryMainIdList: "",
                latitude: 0,
                longitude: 0,
                companyCategoryIdList: ""
            };

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
                        params.latitude = this.latitude;
                        params.longitude = this.longitude;
                        
                        this.myEvent.emit(params);
                        
                        this.zoom = 12;
                    })
                })
            });

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
            
            // console.log('params: ');
            // console.dir(params);
            //this.myEvent.emit(params);
        });
    }

    setTrade(id: number){
        let valueBool = this.trades.at(id-1);
        let trades = this.trades.at(id-1).setValue(!valueBool.value);
    }

    ngOnInit(): void {

        console.log('id from filters: ' + this.id);

        this.zoom = 4;
        this.latitude = 39.8282;
        this.longitude = -98.5795;

        this.filtersService.getCompanyCategories().subscribe(resultCategories => {
            resultCategories.forEach(()=>this.addTrade());
            resultCategories.forEach((i) => this.addSubTrade(i.id));
            for(let categ in resultCategories){
                this.filtersService.getCategorySubcategories(resultCategories[categ].id).subscribe(resultSub => {
                    this.categories.push({id: resultCategories[categ].id, name: resultCategories[categ].name, subcategories: resultSub, bol: true});
                    resultSub.forEach(() => this.addSubSubTrade(resultCategories[categ].id));
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

    logText(mdCheckbox: any){
        console.log('md checkbox: ' + mdCheckbox.value);
    }
    
}