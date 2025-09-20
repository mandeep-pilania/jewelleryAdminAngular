import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportsRoutingModule } from './reports-routing.module';
import { ListComponent } from './list/list.component';
import { MatPaginatorModule } from '@angular/material/paginator';

@NgModule({
  declarations: [ListComponent],
  imports: [CommonModule, ReportsRoutingModule, MatPaginatorModule],
})
export class ReportsModule {}
