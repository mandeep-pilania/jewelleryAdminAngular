import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private _http: HttpClient) {}

  Post(url: string, payload: any) {
    return this._http.post(environment.apiUrl + url, payload);
  }
  Get(url: string) {
    return this._http.get(url);
  }
}
