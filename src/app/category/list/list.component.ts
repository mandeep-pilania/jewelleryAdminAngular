import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/helpers/api.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent {
  AllCategories: any[] = [];
  categoryForm: FormGroup;
  dialogRef!: MatDialogRef<any>;
  constructor(
    private toastr: ToastrService,
    private _service: ApiService,
    private fb: FormBuilder,
    private dialog: MatDialog
  ) {
    this.categoryForm = this.fb.group({
      category: ['', [Validators.required]],
    });
  }

  get V() {
    return this.categoryForm.controls;
  }
  ngOnInit(): void {
    this.GetAllCategories();
  }

  GetAllCategories(): void {
    this._service.GetAll('').subscribe({
      next: (res: any) => {
        this.AllCategories = res;
      },
      error: (err) => {
        this.toastr.error(err);
      },
    });
  }

  dataSource = new MatTableDataSource<any>(this.AllCategories);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  openDialog(templateRef: any) {
    this.dialogRef = this.dialog.open(templateRef, {
      width: '400px',
      disableClose: true,
    });
  }

  onSubmit() {
    if (this.categoryForm.valid) {
      console.log('New Category:', this.categoryForm.value);
      this.dialogRef.close();
    }
  }

  onCancel() {
    this.dialogRef.close();
    this.categoryForm.reset();
  }

  onEdit(data: any) {}
  onDelete(data: any) {}
}
