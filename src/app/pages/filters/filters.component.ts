import { Component, OnInit, ViewEncapsulation, ElementRef, ViewChild, Output, EventEmitter, NgZone } from '@angular/core';
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
    categories: {name: string, subcategories: any[], bol: boolean}[] = [];
    someValue: number = 0;
    google:any;
    @Output() myEvent: EventEmitter<any> = new EventEmitter<any>();
    trade: string = "";
    o: Object = {};
    f: FormGroup = new FormGroup({});

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
        this.trades.push(new FormControl());
    }

    //add subtrades arrays to form group
    addSubtradesArrays(subTradesLength: number, i: number) : FormGroup{

        //define object property 'sub+i'
        Object.defineProperty(this.o, "sub"+i, {
            value: this.fb.array([])
        });

        //let subi: FormArray = <FormArray>this.filterForm.get('sub'+i);
        let subi: FormArray = new FormArray([]);
        let name: string = "sub"+i;

        for(let i = 0; i < subTradesLength; i++)
            subi.push(new FormControl());

        this.f.addControl(name, subi);

        return this.f;

    }

    constructor(private fb: FormBuilder, private filtersService: FiltersService, private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone){
        this.filterForm = this.fb.group({
            filterBy: '',
            distance : [10],
            types: fb.array([false, false, false, false, false]),
            searchControl: '',
            //trades: fb.array([false, false, false, false, false, false, false]),
            trades: this.fb.array([]),
            //subtrades: this.fb.group(this.initArrays())
            /*
            
            subtrades1: fb.array([
                false, false, false, false, false
            ]),
            subtrades2: fb.array([
                false, false, false, false, false, false
            ]),
            subtrades3: fb.array([
                false, false, false, false, false
            ]),
            subtrades4: fb.array([
                false, false, false, false, false
            ]),
            subtrades5: fb.array([
                false, false, false, false, false, false
            ]),
            subtrades6: fb.array([
                false, false, false, false, false, false
            ]),
            subtrades7: fb.array([
                false, false, false, false, false
            ])

            */
        });

        //this.addTrade();

        this.filterForm.valueChanges.subscribe(data => {

            console.log('data: ');
            console.dir(data);

            let params: {sortType: string, range: number, messageTypeList: string, companyCategoryMainIdList: string, latitude:number, longitude: number} = {
                sortType: '',
                range: 0,
                messageTypeList: "",
                companyCategoryMainIdList: "",
                latitude: 0,
                longitude: 0
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

    function2(params: string): void {
        this.myEvent.emit(params);
    }

    ngOnInit(): void {

        this.zoom = 4;
        this.latitude = 39.8282;
        this.longitude = -98.5795;

        this.filtersService.getCompanyCategories().subscribe(resultCategories => {
            resultCategories.forEach(()=>this.addTrade());
            console.log('result categ');
            console.dir(resultCategories);
            for(let categ in resultCategories){
                this.filtersService.getCategorySubcategories(resultCategories[categ].id).subscribe(resultSub => {
                    this.categories.push({name: resultCategories[categ].name, subcategories: resultSub, bol: true});
                    this.addSubtradesArrays(resultSub.length, resultCategories[categ].id);
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

    logText(mdCheckbox: any){
        console.log('md checkbox: ' + mdCheckbox.value);
    }
    
}