import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs';

@Injectable()
export class BaPageTopService {

  loggedChange: Subject<number> = new Subject<number>();
  showLoading: Subject<boolean> = new Subject<boolean>();

  changedLoggedFlag(companyId:number):void {
      console.log('ba page service changed logged flag is working');
      this.loggedChange.next(companyId)
  }

  public showLoadingBar(show:boolean):void {
      this.showLoading.next(show);
  }

  getCompanyId(): Observable<any>{
      return this.loggedChange.asObservable();
  }

}
