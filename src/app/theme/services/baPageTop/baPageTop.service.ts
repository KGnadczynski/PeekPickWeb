import {Injectable} from '@angular/core';
import { Subject }    from 'rxjs/Subject';

@Injectable()
export class BaPageTopService {

  loggedChange: Subject<boolean> = new Subject<boolean>();

  constructor() {
  }

  public changedLoggedFlag():void {
    this.loggedChange.next(true)
  }

}
