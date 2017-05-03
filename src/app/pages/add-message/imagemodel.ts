/**
 * Created by Wojtek on 2017-01-10.
 */
export class ImageModel {


  constructor(messageId: number,file:File) {
    this.messageId=messageId;
    this.file = file;
  }
  messageId: number;
  file: File;
}
