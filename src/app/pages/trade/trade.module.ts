import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { TradeComponent } from './trade.component';
import { routing } from './trade.routing';
import { MessagesModule } from '../messages/messages.module';
import { FiltersModule } from '../filters/filters.module';

@NgModule({
  imports: [
    CommonModule,
    routing,
    MessagesModule,
    FiltersModule
  ],
  declarations: [
    TradeComponent
  ]
})
export class TradeModule {}
