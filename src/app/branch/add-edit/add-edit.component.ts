import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.css'],
})
export class AddEditComponent {
  branchForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.branchForm = this.fb.group({
      branchName: ['', Validators.required],
      manager: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  get V() {
    return this.branchForm.controls;
  }

  onSubmit() {
    if (this.branchForm.valid) {
      console.log('Form Submitted:', this.branchForm.value);
      alert('Branch added successfully!');
      this.branchForm.reset();
    } else {
      this.branchForm.markAllAsTouched();
    }
  }
}
