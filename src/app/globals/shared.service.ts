import { Injectable } from '@angular/core';

@Injectable()
export class SharedService {

    x: boolean = false;

    functionShared(msg: string): void{
        if(msg === 'profile')
            this.x = true;
        console.log('Message from shared with msg: ' + msg + ' and x: ' + this.x);

    }

}