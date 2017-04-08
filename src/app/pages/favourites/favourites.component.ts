import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'favourites',
    encapsulation: ViewEncapsulation.None,
    template: require('./favourites.component.html'),
    styles: [require('./favourites.scss')]
})

export class FavouritesComponent{
    name: string = 'Favourites';
}