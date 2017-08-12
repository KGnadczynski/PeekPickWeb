import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class SortingService{

    sendSortSubject: Subject<any> = new Subject<any>();

    sendMessage(data: any){
        this.sendSortSubject.next(data);
    }
}

