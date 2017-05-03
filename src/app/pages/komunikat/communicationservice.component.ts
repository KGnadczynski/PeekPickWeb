import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';
import {ImageModel} from "./imagemodel";
import "rxjs/add/operator/debounceTime";
import "rxjs/add/operator/distinctUntilChanged";

@Injectable()
export class CommunicationService {
  // Observable string sources
  private dodanieKomunkatuSubject = new Subject<ImageModel>();
  // Observable string streams
  dodanieKomunkatuSubject$ = this.dodanieKomunkatuSubject.asObservable();

  private szukanieKomunkatuSubject = new Subject<string>();
  // Observable string streams
  szukanieKomunkatuSubject$ = this.szukanieKomunkatuSubject.asObservable().debounceTime(400)
    .distinctUntilChanged();
  imageModel: ImageModel;
  // Service message commands
  dodanoKomunikat(messageId: number,file: File) {
    console.log('Message id ' + messageId);
    console.log('Message id ' + file);
    this.imageModel = new ImageModel(messageId,file);
    this.dodanieKomunkatuSubject.next(this.imageModel);
  }

  szukajKomunikat(term: string) {
    this.szukanieKomunkatuSubject.next(term);
  }


}
