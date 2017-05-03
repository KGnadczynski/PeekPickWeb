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
    isCollapsed:boolean = true;
    searchForm: FormGroup;

    mySettings: IMultiSelectSettings = {
        checkedStyle: 'checkboxes',
        buttonClasses: '',
        dynamicTitleMaxItems: 5,
    };

    myTexts: IMultiSelectTexts = {
        checkAll: 'Zaznacz wszystkie',
        uncheckAll: 'Odznacz wszystkie',
        checked: 'wybrany',
        checkedPlural: 'wybrane',
        searchPlaceholder: 'Szukaj...',
        defaultTitle: 'Wybierz',
        allSelected: 'Wszystkie zaznaczone',
    };

    arrayOfOptions: {name: string, optionsModel: number[], myOptions: IMultiSelectOption[]}[] = [];
    
    myOptionsTypeMessages: IMultiSelectOption[] = [];
    optionsModel: number[];

    @ViewChild('childModal') public childModal: ModalDirective;

    constructor(
      private _location: Location,
      private searchService: SearchService,
      private fb: FormBuilder,
      private router: Router
    ){
        this.searchForm = this.fb.group({
            'searchTerm': [null, Validators.required]
        });
    }

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

        this.searchService.getCompanyCategories().subscribe(result => {
            let categ: any[] = [];
            let myOptions1: IMultiSelectOption[] = []
            for(let ob in result){
                this.searchService.getCategorySubcategories(result[ob].id).subscribe(resSub => {
                    myOptions1 = [];
                    for(let s in resSub){
                        myOptions1.push({
                            id: resSub[s].id,
                            name: resSub[s].name
                        });
                    }
                    this.arrayOfOptions.push({name: result[ob].name, optionsModel: [], myOptions: myOptions1});
                });
                
            }
        });

    }

    searchSubmit(values){
        
        let navigationExtras: NavigationExtras = {
            queryParams: {
                "searchTerm": values.searchTerm
            }
        };

        this.router.navigate(['/pages/komunikat'], navigationExtras);

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
    
    collapsed(event:any):void {
        console.log(event);
    }

    expanded(event:any):void {
        console.log(event);
    }

    onChange(optionsModel: number[]) {
        console.log(optionsModel);
    }
}