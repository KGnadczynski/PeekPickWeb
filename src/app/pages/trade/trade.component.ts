import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'trade',
    templateUrl: './trade.component.html',
    styleUrls: ['./trade.scss']
})

export class TradeComponent implements OnInit {
    
    sub: any;
    id: number;

    constructor(private route: ActivatedRoute){}

    ngOnInit(): void{

        this.sub = this.route.params.subscribe(params => {
            this.id = +params.id;
        });

    }
    
}