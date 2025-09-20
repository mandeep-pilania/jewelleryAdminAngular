import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.css'],
})
export class AddEditComponent {
  invoiceForm!: FormGroup;

  constructor(private fb: FormBuilder) {
    this.invoiceForm = this.fb.group({
      invoiceNumber: ['', Validators.required],
      customerName: ['', Validators.required],
      invoiceDate: ['', Validators.required],
      dueDate: ['', Validators.required],
      totalAmount: ['', [Validators.required, Validators.min(0.01)]],
      paidAmount: ['', [Validators.required, Validators.min(0)]],
      paymentMethod: ['', Validators.required],
      notes: [''],
    });
  }

  ngOnInit(): void {
    // Reactive form initialization with validators
  }

  // Getter for easy access to form controls in template
  get V() {
    return this.invoiceForm.controls;
  }

  // Back button logic
  onBack() {
    history.back();
  }

  // Submit form
  onSubmit() {
    if (this.invoiceForm.invalid) {
      this.invoiceForm.reset();
    }
  }
}
