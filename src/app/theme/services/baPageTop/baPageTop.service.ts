import {Injectable} from '@angular/core';
import { Subject }    from 'rxjs/Subject';

@Injectable()
export class BaPageTopService {

  loggedChange: Subject<number> = new Subject<number>();

  constructor() {
  }

  public changedLoggedFlag(companyId:number):void {
    this.loggedChange.next(companyId)
  }

}