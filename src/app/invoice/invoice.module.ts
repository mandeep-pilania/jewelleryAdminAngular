import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InvoiceRoutingModule } from './invoice-routing.module';
import { AddEditComponent } from './add-edit/add-edit.component';
import { ListComponent } from './list/list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';

@NgModule({
  declarations: [AddEditComponent, ListComponent],
  imports: [
    CommonModule,
    InvoiceRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatPaginatorModule,
  ],
})
export class InvoiceModule {}
