import {Component, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'emailconfirm',
  encapsulation: ViewEncapsulation.None,
  styles: [require('./emailconfirm.scss')],
  template: require('./emailconfirm.html'),
})
export class EmailConfirmComponent {
  constructor() {}
}
