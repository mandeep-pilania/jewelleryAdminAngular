import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.css'],
})
export class AddEditComponent {
  supplierForm!: FormGroup;

  constructor(private fb: FormBuilder) {
    this.supplierForm = this.fb.group({
      supplierName: ['', Validators.required],
      contactPerson: ['', Validators.required],
      phone: [
        '',
        [Validators.required, Validators.pattern('[6-9]{1}[0-9]{9}')],
      ],
      email: ['', [Validators.required, Validators.email]],
      address: ['', [Validators.required]],
      type: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  get V() {
    return this.supplierForm.controls;
  }

  onBack() {
    history.back();
  }

  onSubmit() {
    if (this.supplierForm.invalid) return;

    // Normally, here you would emit or call API
    console.log('Supplier Added:', this.supplierForm.value);
    this.supplierForm.reset();
  }
}
