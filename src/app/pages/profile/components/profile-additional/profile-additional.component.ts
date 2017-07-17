import { Component, OnInit, ViewEncapsulation, Input} from '@angular/core';
import { ProfileService } from '../../profile.service';
import { FormGroup, FormBuilder} from '@angular/forms';

@Component({
    selector: 'profile-additional',
    encapsulation: ViewEncapsulation.None,
    styles: [require('./profile-additional.scss')],
    template: require('./profile-additional.component.html'),
    providers: [ProfileService]
})

export class ProfileAdditionalComponent implements OnInit{

    additionalForm: FormGroup;
    messageAfterUpdate: boolean = false;
    @Input() otherUser: any;

    constructor(private profileService: ProfileService, private fb: FormBuilder){
        this.additionalForm = fb.group({
            'contact': fb.group({
                'website': '',
                'openingHours': '',
                'phoneNumber': '',
                'email': '',
                'description': ''
            })
        });
    }

    ngOnInit(): void {
        
        this.profileService.getUser().subscribe(
            user => {
                this.profileService.getMainCompanyBranch(user.company.id).subscribe(
                    branch => {
                        let additionalGroup = <FormGroup>this.additionalForm.get('contact');
                        additionalGroup.setValue({
                            website: branch.website,
                            openingHours: branch.openingHours,
                            phoneNumber: branch.phoneNumber,
                            email: branch.email,
                            description: branch.description
                        });
                    }
                );

            }
        )
    }

    udpateCompanyAdditional(value: any){
        this.profileService.getUser().subscribe(
            user => {
                this.profileService.getCompanyBranches(user.company.id).subscribe(
                    branches => {
                        let objIndex = branches.findIndex((obj => obj.main));
                        let branch = branches[objIndex];
                        Object.keys(value.contact).forEach((key) => {
                            if(value.contact[key])
                                branch[key] = value.contact[key];
                        });
                        this.profileService.updateCompanyBranch(branch, branch.id).subscribe(
                            editedBranch => {
                                console.log('branch: ');
                                console.dir(branch);
                                this.additionalForm.reset();
                                this.messageAfterUpdate = true;
                            }
                        );
                    },
                    errBranches => {
                        console.log('error get company branches:');
                        console.dir(errBranches);
                    }
                )
            },
            errUser => {
                console.log('error get company branches:');
                console.dir(errUser);
            }
        );

    }
}