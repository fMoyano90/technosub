import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario';
import { global } from './global';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Injectable()
export class UsuarioService {
  public url: string;
  public identity;
  public token;

  constructor(public _http: HttpClient, public router: Router) {
    this.url = global.url;
  }

  register(usuario: Usuario): Observable<any> {
    const json = JSON.stringify(usuario);
    const params = 'json=' + json;
    const headers = new HttpHeaders().set(
      'Content-Type',
      'application/x-www-form-urlencoded'
    );
    return this._http.post(this.url + 'register', params, { headers });
  }

  signup(user, gettoken = null): Observable<any> {
    if (gettoken != null) {
      user.gettoken = 'true';
    }

    const json = JSON.stringify(user);
    const params = 'json=' + json;
    const headers = new HttpHeaders().set(
      'content-type',
      'application/x-www-form-urlencoded'
    );

    return this._http.post(this.url + 'login', params, { headers });
  }

  update(id: number, usuario: Usuario) {
    // OBTENER TOKEN
    const token = this.getToken();
    // VALIDAR SI ESTA VACIO
    if (!token) {
      // ERROR TOKEN EXPIRADO
      Swal.fire({
        icon: 'error',
        title: 'Sesión Expirada',
        text: '¡Vuelve a logearte!',
      });
      this.router.navigate(['/login']);
    }

    // SI EL USUARIO ESTA IDENTIFICADO
    // PREPARAR HEADERS
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', token);

    // PREPARAR ENVIO DE DATA
    const json = JSON.stringify(usuario);
    const params = 'json=' + json;

    // ENVIAR DATOS PARA ACTUALIZAR A SERVIDOR
    return this._http.put(this.url + 'usuario/update/' + id, params, {
      headers,
    });
  }

  delete(id: number) {
    // OBTENER TOKEN
    const token = this.getToken();
    // VALIDAR SI ESTA VACIO
    if (!token) {
      // ERROR TOKEN EXPIRADO
      Swal.fire({
        icon: 'error',
        title: 'Sesión Expirada',
        text: '¡Vuelve a logearte!',
      });
      this.router.navigate(['/login']);
    }
    // SI EL USUARIO ESTA IDENTIFICADO
    // PREPARAR HEADERS
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', token);

    return this._http.delete(this.url + 'usuario/delete/' + id, { headers });
  }

  getIdentity() {
    let identity = JSON.parse(localStorage.getItem('identity'));

    if (identity && identity != 'undefined') {
      this.identity = identity;
    } else {
      this.identity = null;
    }
    return this.identity;
  }

  getToken() {
    let token = localStorage.getItem('token');

    if (token && token != 'undefined') {
      this.token = token;
    } else {
      this.token = null;
    }

    return this.token;
  }

  obtenerUsuarios() {
    let token = this.getToken();

    if (!token) {
      Swal.fire({
        icon: 'error',
        title: 'Sesión Expirada',
        text: '¡Vuelve a logearte!',
      });
      this.router.navigate(['/login']);
    }

    let headers = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', token);

    return this._http.get(this.url + 'usuario', { headers });
  }
}
