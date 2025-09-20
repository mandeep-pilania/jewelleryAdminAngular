import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as signalR from '@microsoft/signalr';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root',
})
export class SignalRService {
  constructor(private _router: Router) {}
  hubConnection: any;
  Credentials: any;
  public startConnection() {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(`${environment.apiUrl}deviceHub`, {
        transport: signalR.HttpTransportType.WebSockets,
        skipNegotiation: true,
      })
      .withAutomaticReconnect()
      .configureLogging(signalR.LogLevel.Information)
      .build();
    this.hubConnection
      .start()
      .then(() => console.log('SignalR Connected'))
      .catch((err: any) =>
        console.log('Error while starting connection: ' + err)
      );
  }
  public AddListener = () => {
    this.hubConnection.on('SendSignal', (UserName: any) => {
      let data: any = localStorage.getItem('Credentials');
      this.Credentials = JSON.parse(data);
      if (this.Credentials?.userName == UserName) {
        this._router.navigateByUrl('invoice/add');
      }
    });
  };
}
