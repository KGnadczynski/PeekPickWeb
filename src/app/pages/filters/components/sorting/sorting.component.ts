import { Component, OnInit, ViewEncapsulation, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { MessageType } from '../../globals/enums/message-type.enum';
import { SortingService } from './sorting.service';
import { MapsAPILoader } from '@agm/core';
import { NouisliderComponent } from 'ng2-nouislider';

@Component({
    selector: 'sorting',
    encapsulation: ViewEncapsulation.None,
    template: require('./sorting.component.html'),
    styles: [require('./sorting.scss')],
})

export class SortingComponent implements OnInit {

    ifGeolocation: boolean = true;
    filterForm: FormGroup;
    @Output('sendSort') sendSort: EventEmitter<any> = new EventEmitter<any>();

    constructor(private fb: FormBuilder){
        this.filterForm = this.fb.group({
            filterBy: 'CREATE_DATE'
        });

        this.filterForm.valueChanges.subscribe(
            data => {
                console.log('data: ');
                console.dir(data);
                this.sendSort.emit(data);
            }
        )
    }

    ngOnInit(): void {
        navigator.geolocation.getCurrentPosition(
            position => {},
            error => {
                this.ifGeolocation = false;
            }
        );
    }



}