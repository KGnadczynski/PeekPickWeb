import {Component, Input, Output, EventEmitter, OnInit} from '@angular/core';

import 'style-loader!./baMenuItem.scss';

@Component({
  selector: 'ba-menu-item',
  templateUrl: './baMenuItem.html'
})
export class BaMenuItem implements OnInit{

  @Input() menuItem:any;
  @Input() child:boolean = false;
  @Input() section: string;

  @Output() itemHover = new EventEmitter<any>();
  @Output() toggleSubMenu = new EventEmitter<any>();

  ngOnInit(): void {
    console.log('section: ' + this.section);
  }

  public onHoverItem($event):void {
    this.itemHover.emit($event);
  }

  public onToggleSubMenu($event, item):boolean {
    $event.item = item;
    this.toggleSubMenu.emit($event);
    return false;
  }
}
