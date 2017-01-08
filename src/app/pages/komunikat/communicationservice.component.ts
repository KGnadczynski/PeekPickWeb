import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';

@Injectable()

export class CommunicationService {
  // Observable string sources
  private dodanieKomunkatuSubject = new Subject<string>();
  // Observable string streams
  dodanieKomunkatuSubject$ = this.dodanieKomunkatuSubject.asObservable();
  // Service message commands
  dodanoKomunikat(mission: string) {
    this.dodanieKomunkatuSubject.next(mission);
  }


}
