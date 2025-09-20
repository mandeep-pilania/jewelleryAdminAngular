import { Component, ViewChild } from '@angular/core';
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
  AllSupplier: any[] = [];

  constructor(private toastr: ToastrService, private _service: ApiService) {}

  ngOnInit(): void {
    this.GetAllSupplier();
  }

  GetAllSupplier(): void {
    this._service.Get('').subscribe({
      next: (res: any) => {
        this.AllSupplier = res;
      },
      error: (err) => {
        this.toastr.error(err);
      },
    });
  }
  dataSource = new MatTableDataSource<any>(this.AllSupplier);
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  onEdit(data: any) {}
  onDelete(data: any) {}
}
