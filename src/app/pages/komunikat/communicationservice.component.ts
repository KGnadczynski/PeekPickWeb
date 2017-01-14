import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';
import {ImageModel} from "./imagemodel";

@Injectable()

export class CommunicationService {
  // Observable string sources
  private dodanieKomunkatuSubject = new Subject<ImageModel>();
  // Observable string streams
  dodanieKomunkatuSubject$ = this.dodanieKomunkatuSubject.asObservable();
  imageModel: ImageModel;
  // Service message commands
  dodanoKomunikat(messageId: number,file: File) {
    this.imageModel = new ImageModel(messageId,file);
    this.dodanieKomunkatuSubject.next(this.imageModel);
  }


}
