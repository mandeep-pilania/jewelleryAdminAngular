import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/helpers/api.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent {
  AllBranches: any[] = [];

  constructor(private toastr: ToastrService, private _service: ApiService) {}

  ngOnInit(): void {
    this.GetAllBranches();
  }

  GetAllBranches(): void {
    this._service.Get('').subscribe({
      next: (res: any) => {
        this.AllBranches = res;
      },
      error: (err) => {
        this.toastr.error(err);
      },
    });
  }

  dataSource = new MatTableDataSource<any>(this.AllBranches);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}
