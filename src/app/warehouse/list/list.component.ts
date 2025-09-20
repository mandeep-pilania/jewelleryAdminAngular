import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent {
  warehouseForm: FormGroup;
  AllWarehouses: any[] = [];
  dialogRef!: MatDialogRef<any>;
  categories: string[] = ['Electronics', 'Furniture', 'Clothing'];
  subcategories: string[] = ['Mobile', 'Table', 'Shirt'];
  constructor(private fb: FormBuilder, private dialog: MatDialog) {
    this.warehouseForm = this.fb.group({
      quantity: ['', Validators.required],
      subcategory: ['', Validators.required],
      category: ['', Validators.required],
    });
  }

  get V() {
    return this.warehouseForm.controls;
  }

  openDialog(templateRef: any) {
    this.dialogRef = this.dialog.open(templateRef, {
      width: '600px',
      disableClose: true,
    });
  }

  onCancel() {
    this.dialogRef.close();
    this.warehouseForm.reset();
  }

  onSubmit() {
    if (this.warehouseForm.valid) {
      this.AllWarehouses.push({
        ...this.warehouseForm.value,
        createdAt: new Date(),
      });
      this.warehouseForm.reset();
    }
  }

  editWarehouse(item: any) {
    // edit logic
  }

  deleteWarehouse(item: any) {
    // delete logic
    this.AllWarehouses = this.AllWarehouses.filter((i) => i !== item);
  }
}
