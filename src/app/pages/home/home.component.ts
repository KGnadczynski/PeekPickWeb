import { Component, ViewEncapsulation, OnInit } from '@angular/core';

@Component({
    selector: 'home',
    encapsulation: ViewEncapsulation.None,
    template: require('./home.component.html'),
    styles: [require('./home.scss')]
})

export class HomeComponent implements OnInit {

    ngOnInit():void {
    }

}