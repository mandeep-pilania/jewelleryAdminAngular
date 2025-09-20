import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/helpers/api.service';
import { environment } from 'src/environment/environment';

@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.css'],
})
export class AddEditComponent {
  productForm!: FormGroup;
  ProductId:any;
  subcategories = ['22k', '24k', '18k', '15k'];
  constructor(private fb: FormBuilder, private _service:ApiService, private router:Router, private toastr:ToastrService, private _activeRouter:ActivatedRoute) {
    this.productForm = this.fb.group({
      ProductName: ['', Validators.required],
      Price: ['', [Validators.required, Validators.min(1)]],
      GrossWeight: ['', [Validators.required, Validators.min(0.1)]],
      Meterial: this.fb.array([]), // Only one FormArray
    });                                       

    this._activeRouter.queryParams.subscribe((res:any)=>{
     if(res?.id){
      this.ProductId=res?.id
      this.getSingleProduct(this.ProductId)
     }
    })
  }

  ngOnInit(): void {
    // Start with one row
    this.addItem();
    this.getCategies()
  }

  // Getters for easy access
  get V() {
    return this.productForm.controls;
  }

  get Meterial(): FormArray {
    return this.productForm.get('Meterial') as FormArray;
  }

  // Create a single row
  newItem(): FormGroup {
    return this.fb.group({
      CategoryID: ['', Validators.required],
      SubCategoryID: ['', Validators.required],
      Weight: ['', [Validators.required, Validators.min(0.1)]],
    });
  }

  // Add a row
  addItem() {
    this.Meterial.push(this.newItem());
  }

  // Remove a row
  removeItem(i: number) {
    if (this.Meterial.length > 1) {
      this.Meterial.removeAt(i);
    }
  }

  // Back button
  onBack() {
    history.back();
  }

  // Submit
  onSubmit() {
    if (this.productForm.invalid) {
      this.productForm.markAllAsTouched();
      return;
    }
    let payload={
      ...this.productForm.value
    }
    this._service.Post('AkashalokUsers/AddProduct',payload).subscribe({
      next: (res: any) => {
        if(res?.success){
           this.router.navigateByUrl('/products')
         }else{
           this.toastr.error(res?.message)
        }
          },
      error: (err) => {
        this.toastr.error(err);
      },
    });
    this.productForm.reset();
    this.Meterial.clear();
    this.addItem();
  }

  AllCategories:any=[];
  getCategies(){
    this._service.Get(environment.apiUrl+'AkashalokUsers/GetCategories').subscribe({
      next: (res: any) => {
        if(res?.success){
          this.AllCategories = res?.data;
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

  ChangeCategory(event:any){
    this.getSubCategies(event.target.value)
  }
  AllSubCategories:any=[];
  getSubCategies(categoryId:any){
    this._service.Get(environment.apiUrl+`AkashalokUsers/GetSubCategories?categoryId=${categoryId}`).subscribe({
      next: (res: any) => {
        if(res?.success){
          this.AllSubCategories = res?.data;
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


  getSingleProduct(id:any){
    this._service.Get(environment.apiUrl+'AkashalokUsers/GetProductById').subscribe({
      next: (res: any) => {
        if(res?.success){
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
}
