import { Component, OnInit, ViewEncapsulation, Input, Output, EventEmitter} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProfileService } from '../../profile.service';

@Component({
    selector: 'profile-form',
    encapsulation: ViewEncapsulation.None,
    template: require('./profile-form.component.html'),
    styles: [require('./profile-form.scss')],
    providers: [ProfileService]
})

export class ProfileFormComponent implements OnInit {

    branchForm: FormGroup;
    @Input() type: string;
    @Input() branch: any;
    @Output() callParentMethod: EventEmitter<any> = new EventEmitter();

    constructor(private profileService: ProfileService, private fb: FormBuilder){
        this.branchForm = fb.group({
            'name': [null, Validators.required],
            'city': [null, Validators.required],
            'street': [null, Validators.required],
            'streetNo': [null, Validators.required],
            'website': '',
            'phoneNumber': '',
            'openingHours': '',
            'description': '',
            'email': [null, Validators.compose([Validators.email])]
        });
    }

    ngOnInit(): void {
        if(this.branch !== undefined)
            this.branchForm.patchValue(this.branch);
    }

    action(value: any): void{
        this.callParentMethod.emit(value);
        this.branchForm.reset();
    }

}