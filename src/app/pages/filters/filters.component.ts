import { Component, OnInit, ViewEncapsulation, ElementRef, ViewChild, Output, EventEmitter, NgZone, Input } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { MessageType } from '../../globals/enums/message-type.enum';
import { FiltersService } from './filters.service';
import { MapsAPILoader } from '@agm/core';

let moment = require('../../../../node_modules/moment/moment');

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
    width: any;
    subcategories: {id: number, checked: boolean}[]= [];
    types: {name: string, checked: boolean}[] = [];

    @ViewChild("search")
    public searchElementRef: ElementRef;

    constructor(private fb: FormBuilder, private filtersService: FiltersService, private mapsAPILoader: MapsAPILoader, private ngZone: NgZone){
        this.filterForm = this.fb.group({
            filterBy: 'CREATE_DATE',
            startBeforeDate: false,
            distance : [10],
            types: '',
            searchControl: '',
            subtrades: ''
        });
        
        let x = 0;

        this.filterForm.valueChanges.subscribe(data => {

            console.log('data: ');
            console.dir(data);

            let params: {sortType: string, startBeforeDate: string, range: number, messageTypeList: string, latitude:number, longitude: number, companyCategoryIdList: string} = {
                sortType: '',
                startBeforeDate: '',
                range: 0,
                messageTypeList: "",
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
            
            if(data.startBeforeDate){
                let date: any = Date.now();
                date = moment().format("YYYY-MM-DD HH:mm");
                params.startBeforeDate = date;
            }

            if(data.types)
                params.messageTypeList = data.types;

            if(data.subtrades)
                params.companyCategoryIdList = data.subtrades;

            let i = 0;
            Object.keys(params).forEach((key)=>{
                if(params[key]) i++;
            });

            console.log('params length: ' + i);
            
            if(i > 1){
                x = 1;
                // console.log('params: ');
                // console.dir(params);
                this.myEvent.emit(params);
            } else if(i === 1 && x === 1){
                this.myEvent.emit(params);
            }

        });

        window.onresize = (e) => {
            ngZone.run(() => {
                this.width = window.innerWidth;
                if(this.width > 992){
                    this.isFiltryCollapse = false;
                } 
                else {
                   this.isFiltryCollapse = true;
                }
            });
        };

    }

    ngOnInit(): void {

        if(window.innerWidth > 992){
            this.isFiltryCollapse = false;
        } else {
            this.isFiltryCollapse = true;
        }

        this.zoom = 4;
        this.latitude = 39.8282;
        this.longitude = -98.5795;

        this.filtersService.getCompanyCategories().subscribe(resultCategories => {
            for(let categ in resultCategories){
                this.filtersService.getCategorySubcategories(resultCategories[categ].id).subscribe(resultSub => {
                    this.categories.push({id: resultCategories[categ].id, name: resultCategories[categ].name, subcategories: resultSub, bol: true});
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

    setSubcategory(id: number): void {

        let o = {id: 0, checked:false};

        let checkIfIdExists = this.subcategories.findIndex(s => s.id === id) !== -1;
        let checkIfCheckedAndExists = this.subcategories.findIndex(s => s.id === id && s.checked) !== -1;

        if(checkIfIdExists){
            if(checkIfCheckedAndExists){
                this.subcategories[this.subcategories.findIndex(s => s.id === id)].checked = false;
            } 
             else{
                this.subcategories[this.subcategories.findIndex(s => s.id === id)].checked = true;
             }
        } else {
            o ={
                id: id,
                checked: true
            }
            this.subcategories.push(o);
        }

        let ids: string = "";
        for(let i = 0; i < this.subcategories.length; i++){
            if(this.subcategories[i].checked){
                ids += this.subcategories[i].id + ';';
            }
        }

        let subtrades = this.filterForm.get('subtrades');
        subtrades.reset(ids);

    }

    setType(name: string){
        
        let o = {name: '', checked: false};

        let checkIfNameExists = this.types.findIndex(t => t.name === name) !== -1;
        let checkIfCheckedAndExists = this.types.findIndex(t => t.name === name && t.checked) !== -1;

        if(checkIfNameExists){
            if(checkIfCheckedAndExists){
                this.types[this.types.findIndex(t => t.name === name)].checked = false;
            } else {
                this.types[this.types.findIndex(t => t.name === name)].checked = true;
            }
        } else {
            o = {
                name: name,
                checked: true
            };
            this.types.push(o);
        }

        this.types.map((el) => {
            if(el.checked)
                return el.name;
        }).join(";");

        let x = this.types.filter(t => {
            return t.checked
        });
        
        let types = this.filterForm.get('types');
        types.reset(x.map((el) => {return el.name}).join(';'));
        

    }
    
}