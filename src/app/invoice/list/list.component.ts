import { Component, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/helpers/api.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent {
  AllInvoices: any[] = [];

  constructor(private toastr: ToastrService, private _service: ApiService) {}

  ngOnInit(): void {
    this.GetAllInvoices();
  }

  GetAllInvoices(): void {
    this._service.GetAll('').subscribe({
      next: (res: any) => {
        this.AllInvoices = res;
      },
      error: (err) => {
        this.toastr.error(err);
      },
    });
  }
  dataSource = new MatTableDataSource<any>(this.AllInvoices);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  onEdit(data: any) {}
  onDelete(data: any) {}
}
