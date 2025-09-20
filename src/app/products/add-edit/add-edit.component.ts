import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.css'],
})
export class AddEditComponent {
  productForm!: FormGroup;
  subcategories = ['22k', '24k', '18k', '15k'];
  categories = ['Gold', 'Silver', 'Diamond'];
  constructor(private fb: FormBuilder) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(1)]],
      grossWeight: ['', [Validators.required, Validators.min(0.1)]],
      meterial: this.fb.array([]), // Only one FormArray
    });
  }

  ngOnInit(): void {
    // Start with one row
    this.addItem();
  }

  // Getters for easy access
  get V() {
    return this.productForm.controls;
  }

  get meterial(): FormArray {
    return this.productForm.get('meterial') as FormArray;
  }

  // Create a single row
  newItem(): FormGroup {
    return this.fb.group({
      category: ['', Validators.required],
      subcategory: ['', Validators.required],
      weight: ['', [Validators.required, Validators.min(0.1)]],
    });
  }

  // Add a row
  addItem() {
    this.meterial.push(this.newItem());
  }

  // Remove a row
  removeItem(i: number) {
    if (this.meterial.length > 1) {
      this.meterial.removeAt(i);
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

    console.log('✅ Product Submitted:', this.productForm.value);

    // Reset form
    this.productForm.reset();
    this.meterial.clear();
    this.addItem();
  }
}
