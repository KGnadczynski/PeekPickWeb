import { Component, OnInit, ViewEncapsulation, ViewChild} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalDirective } from 'ng2-bootstrap/modal';
import { Location } from '@angular/common';

import { IMultiSelectOption } from 'angular-2-dropdown-multiselect';
import { SearchService } from './search.service';

import { MessageType } from '../../enums/message-type.enum';

@Component({
    selector: 'search',
    encapsulation: ViewEncapsulation.None,
    template: require('./search.component.html'),
    styles: [require('./search.scss')],
    providers: [SearchService]
})

export class SearchComponent implements OnInit{

    messageTypes: string[] = Object.keys(MessageType);
    messageTypesOb: {name: string, value: string}[] = [];

    name: string = "szukaj";
    optionsModel: number[];
    optionsModel1: number[];
    optionsModel2: number[];
    optionsModel3: number[];
    optionsModel4: number[];
    optionsModel5: number[];
    optionsModel6: number[];
    optionsModel7: number[];
    allCatAndSubs: any[] = [];
    myOptionsTypeMessages: IMultiSelectOption[] = [];
    myOptions1: IMultiSelectOption[] = [];
    myOptions2: IMultiSelectOption[] = [];
    myOptions3: IMultiSelectOption[] = [];
    myOptions4: IMultiSelectOption[] = [];
    myOptions5: IMultiSelectOption[] = [];
    myOptions6: IMultiSelectOption[] = [];
    myOptions7: IMultiSelectOption[] = [];

    categories: {name: string, subcategories: any[]}[] = [];

    @ViewChild('childModal') public childModal: ModalDirective;

    constructor(
      private _location: Location,
      private searchService: SearchService
    ){}

    ngOnInit(): void {

        for(let i = this.messageTypes.length-1; i >= 0; i--)
            if(i%2 !== 0)
                this.messageTypesOb.push({name: this.messageTypes[i-1], value: this.messageTypes[i]});
        let id = 0;
        for(let m in this.messageTypesOb){
            this.myOptionsTypeMessages.push({
                id: id,
                name: this.messageTypesOb[m].value
            });
            id++;
        }

        this.myOptions1 = [
            {id: 1, name: 'Artyści i zespoły'},
            {id: 2, name: 'Escape roomy, parki rozrywki'},
            {id: 3, name: 'Kino, teatr'},
            {id: 4, name: 'Muzeum, wystawy'},
            {id: 5, name: 'Inne'},
        ]

        /*let _self = this;
        this.searchService.getCompanyCategories().subscribe(resultCategories => {
          for(let categ in resultCategories){
            this.searchService.getCategorySubcategories(resultCategories[categ].id).subscribe(resultSub => {
                this.categories.push({name: resultCategories[categ].name, subcategories: resultSub});
                _self.categories.push({name: resultCategories[categ].name, subcategories: resultSub});
            });
            
          }
          
        
          for(let c in this.categories){
              console.log(this.categories[c].name);
          }*/

          /*for(let c in this.categories){
            let name: string = this.categories[c].name;
            let myOptions: IMultiSelectOption[] = [];
            console.log('c name: ' + name);
            for(let s in this.categories[c].subcategories){
                console.log('sub name: ' + this.categories[c].subcategories[s].name);
                let ob = {
                    id: this.categories[c].subcategories[s].id,
                    name: this.categories[c].subcategories[s].name
                }
                myOptions.push(ob);
            }
            let ob2 = {
                name: name,
                subc: myOptions
            }
            console.log('ob2: ');
            console.dir(ob2);
            this.allCatAndSubs.push(ob2);
          }
          console.log('all: ');
          console.dir(this.allCatAndSubs);
        });*/
    }

    onChange(): void{
        console.log(this.optionsModel);
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
}