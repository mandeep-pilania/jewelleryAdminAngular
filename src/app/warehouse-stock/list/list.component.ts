import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent {
  stockForm!: FormGroup;
  AllStock: any[] = [];
  AllWarehouses: any[] = [];
  dialogRef!: MatDialogRef<any>;

  constructor(private fb: FormBuilder, private dialog: MatDialog) {
    this.stockForm = this.fb.group({
      warehouse: ['', Validators.required],
      product: ['', Validators.required],
      quantity: ['', [Validators.required, Validators.min(1)]],
    });
  }

  get V() {
    return this.stockForm.controls;
  }

  openDialog(templateRef: any) {
    this.dialogRef = this.dialog.open(templateRef, {
      width: '400px',
      disableClose: true,
    });
  }
  onCancel() {
    this.dialogRef.close();
    this.stockForm.reset();
  }

  onSubmit() {
    if (this.stockForm.invalid) return;
  }

  editStock(item: any) {}
  deleteStock(item: any) {}
}
