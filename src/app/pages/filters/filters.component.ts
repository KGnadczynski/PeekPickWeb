import { Component, OnInit, ViewEncapsulation, ElementRef, ViewChild, Output, EventEmitter, NgZone, Input } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { MessageType } from '../../globals/enums/message-type.enum';
import { FiltersService } from './filters.service';
import { MapsAPILoader } from '@agm/core';
import { NouisliderComponent } from 'ng2-nouislider';

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
    someValue: number = 101;
    google:any;
    @Output() myEvent: EventEmitter<any> = new EventEmitter<any>();
    @Input() id: number;

    public latitude: number;
    public longitude: number;
    public zoom: number;
    width: any;
    subcategories: {id: number, checked: boolean}[]= [];
    types: {name: string, checked: boolean}[] = [];
    ifGeolocation: boolean = true;
    params: {sortType: string, startBeforeDate: string, range: number, messageTypeList: string, latitude:number, longitude: number, companyCategoryIdList: string} = {
        sortType: 'CREATE_DATE',
        startBeforeDate: '',
        range: 0,
        messageTypeList: "",
        latitude: null,
        longitude: null,
        companyCategoryIdList: ""
    };

    @ViewChild("search") public searchElementRef: ElementRef;
    @ViewChild("nouislider") nouislider: NouisliderComponent;
    counter: number = 0;

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
            
            this.counter++;

            if(data.filterBy === 'DISTANCE' && !data.searchControl){
                let filterBy = <FormControl>this.filterForm.get('filterBy');
                filterBy.reset('CREATE_DATE');
                data.filterBy = 'CREATE_DATE';
                this.params.latitude = null;
                this.params.longitude = null;
                this.params.sortType = 'CREATE_DATE';
            }

            if(this.params.latitude && this.params.longitude){
                this.nouislider.disabled = false;
            }

            // if((this.params.latitude && this.params.longitude))

            //wieksze od dwoch bo counter zwieksza sie do dwoch przy inicie gdy uzupełnia branze
            if(!data.searchControl && this.counter > 2){
                this.nouislider.disabled = true;
                this.params.latitude = null;
                this.params.longitude = null;
                this.ifGeolocation = false;
            }

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
                        this.params.latitude = this.latitude;
                        this.params.longitude = this.longitude;
                        
                        this.myEvent.emit(this.params);
                        this.nouislider.disabled = false;
                        this.ifGeolocation = true;
                        
                        this.zoom = 12;
                        
                    })
                })
            });

            if(data.filterBy)
                this.params.sortType = data.filterBy;
            
            if(data.distance < 101)
                this.params.range = data.distance;
            
            if(data.startBeforeDate){
                this.params.startBeforeDate = moment().startOf('day').format("YYYY-MM-DD HH:mm");
            } else {
                this.params.startBeforeDate = '';
            }

            if(data.types)
                this.params.messageTypeList = data.types;
            else
                this.params.messageTypeList = '';

            if(data.subtrades)
                this.params.companyCategoryIdList = data.subtrades;
            else
                this.params.companyCategoryIdList = '';

            let i = 0, j = 0;
            Object.keys(this.params).forEach((key)=>{
                if(this.params[key]) i++;
                if(this.params[key] === 'DISTANCE'){
                    j++;
                }
            });

            console.log('params: ');
            console.dir(this.params);

            if(i > 1 || j > 0){
                x = 1;
                this.myEvent.emit(this.params);
            } else if(i === 1 && x === 1){
                this.myEvent.emit(this.params);
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

        navigator.geolocation.getCurrentPosition(
            position => {},
            error => {
                if(error.code === error.PERMISSION_DENIED)
                    console.log('you denied me');
                console.log('another error');
                this.ifGeolocation = false;
                this.nouislider.disabled = true;
            }
        );

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

    clearFilters(){

        let distance = this.filterForm.get('distance');
        distance.reset();
        let searchControl = this.filterForm.get('searchControl');
        searchControl.reset();
        let subtrades = this.filterForm.get('subtrades');
        subtrades.reset();
        let types = this.filterForm.get('types');
        types.reset();
        let startBeforeDate = this.filterForm.get('startBeforeDate');
        startBeforeDate.reset();

        let checkboxesValues = document.getElementById('checkboxesValues').getElementsByTagName('input');
        let companyCategories = document.getElementById('companyCategories').getElementsByTagName('input');
        
        for(let i = 0; i < checkboxesValues.length; i++){
            checkboxesValues[i].checked = false;
        }

        for(let i = 0; i < companyCategories.length; i++){
            companyCategories[i].checked = false;
        }
    }
    
}