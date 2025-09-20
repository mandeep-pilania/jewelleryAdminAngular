import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaymentsRoutingModule } from './payments-routing.module';
import { ListComponent } from './list/list.component';
import { MatPaginatorModule } from '@angular/material/paginator';

@NgModule({
  declarations: [ListComponent],
  imports: [CommonModule, PaymentsRoutingModule, MatPaginatorModule],
})
export class PaymentsModule {}
