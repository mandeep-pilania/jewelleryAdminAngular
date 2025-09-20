import { HttpClient } from '@angular/common/http';
import { Component, Inject, Optional } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/helpers/api.service';
import { SignalRService } from 'src/app/helpers/signal-r.service';
import { environment } from 'src/environment/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  LoginForm: FormGroup;
  ShowDetailButton: boolean = false;
  Credentials: any;

  constructor(
    private _service: ApiService,
    private _fb: FormBuilder,
    private _toastr: ToastrService,
    private router: Router,
    private signalRService: SignalRService,
    private http: HttpClient,
    @Optional() public dialogRef: MatDialogRef<LoginComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.Credentials = localStorage.getItem('Credentials');
    if (this.Credentials) {
      this.router.navigateByUrl('/dashboard');
      this._toastr.error('Please Logout First');
    }

    if (this.data?.productId && this.data?.fullUrl) {
      this.ShowDetailButton = true;
    }

    this.LoginForm = this._fb.group({
      userName: [''],
      password: [''],
    });
  }

  get V() {
    return this.LoginForm.controls;
  }

  Login() {
    if (this.LoginForm.invalid) return;

    const payload = { ...this.LoginForm.value };

    this.http
      .post(`${environment.apiUrl}AkashalokJewellers/GetLogin`, payload)
      .subscribe({
        next: (res: any) => {
          this._toastr.success('Login successful');
          // localStorage.setItem('Credentials', JSON.stringify(payload));

          // SignalR connection + automatic API call
          if (this.data?.productId && this.data?.fullUrl) {
            this.dialogRef.close();
          }
          // Navigate to dashboard
          this.router.navigateByUrl('/dashboard');
        },
        error: (err) => {
          this._toastr.error('Login failed');
          console.error(err);
        },
      });
  }

  viewProductDetails() {
    this.router.navigateByUrl('/product-details');
  }
}
