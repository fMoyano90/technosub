import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { global } from './global';
import { Correo } from '../models/correo';

@Injectable()
export class CorreoService {
  public url: string;

  constructor(public _http: HttpClient) {
    this.url = global.url;
  }

  contactanos(contacto: Correo): Observable<any> {
    let json = JSON.stringify(contacto);
    let params = 'json=' + json;

    let headers = new HttpHeaders().set(
      'Content-Type',
      'application/x-www-form-urlencoded'
    );

    return this._http.post(this.url + 'contacto', params, { headers: headers });
  }
}
