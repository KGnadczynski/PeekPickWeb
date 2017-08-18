import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { TradeComponent } from './trade.component';
import { routing } from './trade.routing';
import { MessagesModule } from '../messages/messages.module';
import { FiltersModule } from '../filters/filters.module';
import { SortingModule } from '../filters/components/sorting/sorting.module';

@NgModule({
  imports: [
    CommonModule,
    routing,
    MessagesModule,
    FiltersModule,
    SortingModule
  ],
  declarations: [
    TradeComponent
  ]
})
export class TradeModule {}
