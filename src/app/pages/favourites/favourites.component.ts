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
            filterBy: 'CREATE_DATE'
        });

        this.filterForm.valueChanges.subscribe(data => {

            let sortBy:string = "";

            switch (sortBy) {
                case "DISTANCE":
                    this.messageComponent.filterFavourites('DISTANCE');
                break;
                    
                case "CREATE_DATE":
                    this.messageComponent.filterFavourites('CREATE_DATE');
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