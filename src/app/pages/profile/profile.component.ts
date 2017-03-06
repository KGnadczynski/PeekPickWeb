import {Component,OnInit ,ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'profile',
  encapsulation: ViewEncapsulation.None,
  styles: [require('./profile.scss')],
  template: require('./profile.html')
})
export class ProfileComponent implements OnInit {
  constructor() {}

  ngOnInit() {
    
  }
}