import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { routing } from './profile-branches.routing';
import { CollapseModule } from 'ng2-bootstrap/ng2-bootstrap';
import { ConfirmationPopoverModule } from 'angular-confirmation-popover';
import { ProfileBranchesComponent } from './profile-branches.component';
import { ProfileFormModule } from '../profile-form/profile-form.module';
import { AgmCoreModule } from '@agm/core';

@NgModule({
    imports: [ CommonModule, FormsModule, ReactiveFormsModule, routing, CollapseModule, AgmCoreModule,
        ConfirmationPopoverModule.forRoot({
            confirmText: 'usuń',
            cancelText: 'anuluj'
    }), ProfileFormModule ],
    declarations: [ ProfileBranchesComponent ],
    exports: [ ProfileBranchesComponent ]
})

export class ProfileBranchesModule {}