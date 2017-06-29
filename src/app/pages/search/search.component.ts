import { Component, OnInit, ViewEncapsulation, ViewChild} from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { ModalDirective } from 'ng2-bootstrap/modal';
import { Location } from '@angular/common';
import { FormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IMultiSelectOption, IMultiSelectTexts, IMultiSelectSettings } from 'angular-2-dropdown-multiselect';
import { SearchService } from './search.service';

import { MessageType } from '../../globals/enums/message-type.enum';

@Component({
    selector: 'search',
    encapsulation: ViewEncapsulation.None,
    template: require('./search.component.html'),
    styles: [require('./search.scss')],
    providers: [SearchService]
})

export class SearchComponent implements OnInit{

    name: string = "szukaj";
    messageTypes: string[] = Object.keys(MessageType);
    messageTypesOb: {name: string, value: string}[] = [];
    categories: {id: number, name: string, subcategories: any[], bol: boolean}[] = [];
    isCollapsed:boolean = true;
    searchForm: FormGroup;
    someValue: number = 0;
    subcategories: {id: number, checked: boolean}[]= [];
    types: {name: string, checked: boolean}[] = [];

    constructor(
      private _location: Location,
      private searchService: SearchService,
      private fb: FormBuilder,
      private router: Router
    ){
        this.searchForm = this.fb.group({
            'searchTerm': [null, Validators.required],
            range : [10],
            messageTypeList: '',
            companyCategoryIdList: ''
        });
    }

    ngOnInit(): void {

        for(let i = this.messageTypes.length-1; i >= 0; i--)
            if(i%2 !== 0)
                this.messageTypesOb.push({name: this.messageTypes[i-1], value: this.messageTypes[i]});
        
        this.searchService.getCompanyCategories().subscribe(resultCategories => {
            for(let categ in resultCategories){
                this.searchService.getCategorySubcategories(resultCategories[categ].id).subscribe(resultSub => {
                    this.categories.push({id: resultCategories[categ].id, name: resultCategories[categ].name, subcategories: resultSub, bol: true});
                });
            }
        });

    }

    onSubmit(values: any){
        
        console.log('form value: ');
        console.dir(values);

        values.companyCategoryIdList = values.companyCategoryIdList.substring(0, values.companyCategoryIdList.length-1);
        if(values.range === 101){
            values.range = 0;
        }
            

        let params: string = "";

        Object.keys(values).forEach((key) => {
            if(values[key])
                params += key + "=" + values[key] + "&";
        });
        params = params.substring(0, params.length-1);
        console.log('params: ' + params);

        let navigationExtras: NavigationExtras = {
            queryParams: {
                "searchTerm": params
            }
        };

        this.router.navigate(['/pages/komunikat'], navigationExtras);

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

        let subtrades = this.searchForm.get('companyCategoryIdList');
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
        
        let types = this.searchForm.get('messageTypeList');
        types.reset(x.map((el) => {return el.name}).join(';'));
        

    }

}