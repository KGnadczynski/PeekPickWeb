import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormBuilder} from '@angular/forms';
import { MessagesComponent } from '../messages/messages.component';

@Component({
    selector: 'favourites',
    encapsulation: ViewEncapsulation.None,
    template: require('./favourites.component.html'),
    styles: [require('./favourites.scss')]
})

export class FavouritesComponent implements OnInit{
    
    name: string = 'Obserwowane';
    filterForm: FormGroup;
    @ViewChild("messageComponent") messageComponent: MessagesComponent;

    constructor(private fb: FormBuilder){
        this.filterForm = this.fb.group({
            filterBy: ''
        });

        this.filterForm.valueChanges.subscribe(data => {

            let sortBy:string = "";

            switch (sortBy) {
                case "lokalizacja":
                    this.messageComponent.getMessagesByDistance(this.messageComponent.pageNumber);
                break;
                    
                case "data dodania":
                    this.messageComponent.getMessagesByCreateDate(this.messageComponent.pageNumber);
                break;
            
                default:
                    break;
            }
        });
    }

    ngOnInit(): void {
        console.log('fav ls: ');
        console.dir(localStorage);
    }
}