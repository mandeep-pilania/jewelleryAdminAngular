import { Component } from '@angular/core';
import { SignalRService } from './helpers/signal-r.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'copyright-project';

  constructor(private _signalRservice: SignalRService) {}
  ngOnInit() {
    this._signalRservice.startConnection();
    this._signalRservice.AddListener();
  }
}
