import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { global } from './global';
import { Router } from '@angular/router';

@Injectable()
export class SocioService {
  public url: string;

  constructor(public _http: HttpClient, public router: Router) {
    this.url = global.url;
  }

  // CREAR SOCIO
  create(token, socio) {
    const json = JSON.stringify(socio);
    const params = 'json=' + json;
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', token);
    return this._http.post(this.url + 'socio', params, { headers });
  }

  // ACTUALIZAR SOCO
  update(token, id, socio) {
    const json = JSON.stringify(socio);
    const params = 'json=' + json;
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', token);

    return this._http.put(this.url + 'socio/' + id, params, { headers });
  }

  // ELIMINAR SOCIO
  delete(token, id) {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', token);
    return this._http.delete(this.url + 'socio/' + id, {
      headers,
    });
  }

  // LISTAR TODAS LAS NOTICIAS
  getSocios() {
    const headers = new HttpHeaders().set(
      'Content-Type',
      'application/x-www-form-urlencoded'
    );
    return this._http.get(this.url + 'socio', { headers });
  }

  // OBTENER SOCIO POR ID
  getSocio(token, id) {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', token);
    return this._http.get(this.url + 'socio/' + id, { headers });
  }
}
