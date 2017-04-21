///<reference path="../../../../node_modules/@types/googlemaps/index.d.ts"/>
import { Component, OnInit, ViewEncapsulation, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { MessageType } from '../../enums/message-type.enum';
import { FiltersService } from './filters.service';

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

    @ViewChild("google_places_ac")
    searchElementRef: ElementRef;

    constructor(private fb: FormBuilder, private filtersService: FiltersService){
        this.filterForm = this.fb.group({
            filterBy: '',
            distance : [10],
            type: ''
        });

        this.filterForm.valueChanges.subscribe(data => {
            console.log('form changes: ');
            console.dir(data);
        });
    }

    ngOnInit(): void {
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

        var autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {});
        google.maps.event.addListener(autocomplete, 'place_changed', function() {
            var place = autocomplete.getPlace();
            console.log(place)
        });
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