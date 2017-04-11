import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'favourites',
    encapsulation: ViewEncapsulation.None,
    template: require('./favourites.component.html'),
    styles: [require('./favourites.scss')]
})

export class FavouritesComponent implements OnInit{
    name: string = 'Favourites';

    ngOnInit(): void {
        console.log('fav ls: ');
        console.dir(localStorage);
    }
}