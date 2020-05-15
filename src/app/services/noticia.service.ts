import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { global } from './global';
import { Router } from '@angular/router';

@Injectable()
export class NoticiaService {
  public url: string;

  constructor(public _http: HttpClient, public router: Router) {
    this.url = global.url;
  }

  // CREAR NOTICIA
  create(token, noticia) {
    const json = JSON.stringify(noticia);
    const params = 'json=' + json;
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', token);
    return this._http.post(this.url + 'noticia', params, { headers });
  }

  // ACTUALIZAR NOTICIA
  update(token, id, noticia) {
    const json = JSON.stringify(noticia);
    const params = 'json=' + json;
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', token);

    return this._http.put(this.url + 'noticia/' + id, params, { headers });
  }

  // ELIMINAR NOTICIA
  delete(token, id) {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', token);
    return this._http.delete(this.url + 'noticia/' + id, {
      headers,
    });
  }

  // LISTAR TODAS LAS NOTICIAS
  getNoticias() {
    const headers = new HttpHeaders().set(
      'Content-Type',
      'application/x-www-form-urlencoded'
    );
    return this._http.get(this.url + 'noticia', { headers });
  }

  // LISTAR NOTICIAS POR CATEGORIA
  getNoticiasPorCategoria(categoria) {
    const headers = new HttpHeaders().set(
      'Content-Type',
      'application/x-www-form-urlencoded'
    );
    return this._http.get(this.url + 'noticia/categoria/' + categoria, {
      headers,
    });
  }

  // LISTAR NOTICIAS PRINCIPALES
  getNoticiasPrincipales() {
    const headers = new HttpHeaders().set(
      'Content-Type',
      'application/x-www-form-urlencoded'
    );
    return this._http.get(this.url + 'noticia/prioridad/principal', {
      headers,
    });
  }

  // OBTENER NOTICIA POR ID
  getNoticia(token, id) {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', token);
    return this._http.get(this.url + 'noticia/' + id, { headers });
  }

  // TODO: SUBIR IMAGEN
  // TODO: LLAMAR IMAGEN DE NOTICIA
}
