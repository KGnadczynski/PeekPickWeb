import { NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { routing } from './favourites.routes';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FavouritesComponent } from './favourites.component';
import { MessagesModule } from '../messages/messages.module';

@NgModule({
    imports: [
        CommonModule,
        routing,
        MessagesModule,
        FormsModule,
        ReactiveFormsModule
    ],
    declarations: [ FavouritesComponent ]
})

export class FavouritesModule{}