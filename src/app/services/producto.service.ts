import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Producto } from '../models/producto';
import { global } from './global';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Injectable()
export class ProductoService {
  public url: string;

  constructor(public _http: HttpClient, public router: Router) {
    this.url = global.url;
  }

  // CREAR PRODUCTO
  create(token, producto) {
    const json = JSON.stringify(producto);
    const params = 'json=' + json;
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', token);
    return this._http.post(this.url + 'producto', params, { headers });
  }

  // ACTUALIZAR PRODUCTO
  update(token, id, producto) {
    const json = JSON.stringify(producto);
    const params = 'json=' + json;
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', token);

    return this._http.put(this.url + 'producto/' + id, params, { headers });
  }

  // ELIMINAR PRODUCTO
  delete(token, id) {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', token);
    return this._http.delete(this.url + 'producto/' + id, {
      headers,
    });
  }

  // LISTAR TODOS LOS PRODUCTOS
  getProductos() {
    const headers = new HttpHeaders().set(
      'Content-Type',
      'application/x-www-form-urlencoded'
    );
    return this._http.get(this.url + 'producto', { headers });
  }

  // LISTAR PRODUCTOS POR CATEGORIA
  getProductosPorCategoria(categoria) {
    const headers = new HttpHeaders().set(
      'Content-Type',
      'application/x-www-form-urlencoded'
    );
    return this._http.get(this.url + 'producto/categoria/' + categoria, {
      headers,
    });
  }

  // OBTENER PRODDUCTO POR ID
  getProducto(token, id) {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', token);
    return this._http.get(this.url + 'producto/' + id, { headers });
  }

  // TODO: SUBIR IMAGEN DE PRODUCTO
  // TODO: LLAMAR IMAGEN DE PRODUCTO
}
