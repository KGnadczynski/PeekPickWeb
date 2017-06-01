import {Injectable} from '@angular/core';
import { Subject }    from 'rxjs/Subject';

@Injectable()
export class BaPageTopService {

  loggedChange: Subject<number> = new Subject<number>();
  showLoading: Subject<boolean> = new Subject<boolean>();

  public changedLoggedFlag(companyId:number):void {
      this.loggedChange.next(companyId)
  }

  public showLoadingBar(show:boolean):void {
      this.showLoading.next(show);
  }

 

}
