import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../auth/login/login.component';
import { SignalRService } from '../helpers/signal-r.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environment/environment';
@Component({
  selector: 'app-generate-invoice',
  templateUrl: './generate-invoice.component.html',
  styleUrls: ['./generate-invoice.component.css'],
})
export class GenerateInvoiceComponent {
  ProductId: any;
  Credentials: any;
  constructor(
    private _activeRoute: ActivatedRoute,
    private dialog: MatDialog,
    private signalRService: SignalRService,
    private http: HttpClient
  ) {
    this._activeRoute.queryParams.subscribe((params) => {
      this.ProductId = params['id'];
    });
  }

  ngOnInit() {
    const storedCredentials = sessionStorage.getItem('Credentials');
    if (!storedCredentials) {
      this.OpenLoginModal();
      return;
    }

    this.Credentials = JSON.parse(storedCredentials);

    // Start SignalR connection and call API automatically when ready
  }

  OpenLoginModal() {
    this.dialog.open(LoginComponent, {
      width: '400px',
      disableClose: true,
      data: {
        productId: this.ProductId,
        fullUrl: window.location.href,
      },
    });
  }
}
