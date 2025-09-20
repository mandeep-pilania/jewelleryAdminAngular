import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/helpers/api.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent {
  AllBrands: any[] = [];
  brandForm: FormGroup;
  dialogRef!: MatDialogRef<any>;
  constructor(
    private toastr: ToastrService,
    private _service: ApiService,
    private fb: FormBuilder,
    private dialog: MatDialog
  ) {
    this.brandForm = this.fb.group({
      brand: ['', [Validators.required]],
    });
  }

  get V() {
    return this.brandForm.controls;
  }
  ngOnInit(): void {
    this.GetAllCategories();
  }

  GetAllCategories(): void {
    this._service.GetAll('').subscribe({
      next: (res: any) => {
        this.AllBrands = res;
      },
      error: (err) => {
        this.toastr.error(err);
      },
    });
  }

  dataSource = new MatTableDataSource<any>(this.AllBrands);
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
    if (this.brandForm.valid) {
      console.log('New Category:', this.brandForm.value);
      this.dialogRef.close();
    }
  }

  onCancel() {
    this.dialogRef.close();
  }

  onEdit(data: any) {}
  onDelete(data: any) {}
}
