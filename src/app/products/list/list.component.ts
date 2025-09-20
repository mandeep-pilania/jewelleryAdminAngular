import { Component, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/helpers/api.service';
import { environment } from 'src/environment/environment';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent {
  dialogRef!: MatDialogRef<any>;
  // AllProducts: any[] = [];
  AllProducts: any[] = [
    {
      id: 1,
      name: 'Gold Ring Set',
      price: 12000,
      status: 'Active',
      createdDate: new Date('2025-09-01T10:30:00'),
      grossWeight: 15.5, // in grams
      items: [
        { category: 'Ring', subcategory: 'Gold', quantity: 2, weight: 5 },
        { category: 'Ring', subcategory: 'Silver', quantity: 1, weight: 5.5 },
      ],
    },
    {
      id: 2,
      name: 'Silver Necklace',
      price: 8000,
      status: 'Inactive',
      createdDate: new Date('2025-09-05T14:20:00'),
      grossWeight: 25, // in grams
      items: [
        {
          category: 'Necklace',
          subcategory: 'Silver',
          quantity: 1,
          weight: 25,
        },
      ],
    },
  ];
  Domain = 'http://10.112.232.46:4200';
  constructor(
    private toastr: ToastrService,
    private _service: ApiService,
    private dialog: MatDialog,
    private router:Router
  ) {}

  ngOnInit(): void {
    this.GetAllProducts();
  }

  GetAllProducts(): void {
    this._service.Get(environment.apiUrl+'AkashalokUsers/GetAllProducts').subscribe({
      next: (res: any) => {
        if(res?.success){
          this.AllProducts = res?.data;
          console.log(res)
         }else{
           this.toastr.error(res?.message)
        }
          },
      error: (err) => {
        this.toastr.error(err);
      },
    });
  }
  dataSource = new MatTableDataSource<any>(this.AllProducts);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  onEdit(product: any) {
    this.router.navigate(['/products/edit'], {
      queryParams: { id: product.productID }
    });
  }
  onDelete(data: any) {}
  selectedProduct: any = null;

  viewBarcode(templateRef: TemplateRef<any>, product: any) {
    this.selectedProduct = product;
    this.dialogRef = this.dialog.open(templateRef, {
      width: '400px',
      height: '340px',
      disableClose: true,
      panelClass: 'no-scroll-dialog',
      data: product,
    });
  }
  getBarcodeWidth(value: string, desiredWidth: number): number {
    const numChars = value.length;
    return desiredWidth / numChars; // approximate
  }
}
