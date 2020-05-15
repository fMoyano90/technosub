import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/models/producto';
import { ProductoService } from 'src/app/services/producto.service';
import Swal from 'sweetalert2';
import { UsuarioService } from '../../services/usuario.service';
import { global } from '../../services/global';
import { getLocaleNumberSymbol } from '@angular/common';

@Component({
  selector: 'app-sistemas-buceo',
  templateUrl: './sistemas-buceo.component.html',
  styleUrls: ['./sistemas-buceo.component.scss'],
  providers: [ProductoService, UsuarioService],
})
export class SistemasBuceoComponent implements OnInit {
  public productos: Producto[];
  public identity: any;
  public url: string;
  public p = 1;

  constructor(
    private productoService: ProductoService,
    private usuarioService: UsuarioService
  ) {
    this.url = global.url;
  }

  ngOnInit(): void {
    this.obtenerProductos();
    this.identity = this.usuarioService.getIdentity();
  }

  obtenerProductos() {
    this.productoService.getProductosPorCategoria('BUCEO').subscribe(
      (resp) => {
        this.productos = resp['productos'];
      },
      (err) => {
        console.log(err as any);
      }
    );
  }

  eliminarProducto(id) {
    Swal.fire({
      title: '¿Seguro quieres continuar?',
      text: 'El producto no podrá recuperarse',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminalo',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      const token = this.usuarioService.getToken();
      if (result.value) {
        this.productoService.delete(token, id).subscribe(
          (resp) => {
            if (resp['estado'] === 'success') {
              Swal.fire({
                icon: 'success',
                title: '¡Buen Trabajo!',
                text: 'El producto fue eliminado.',
              });
              this.obtenerProductos();
            } else {
              Swal.fire({
                icon: 'error',
                title: 'Ups...',
                text: 'No existe un producto con esa id.',
              });
            }
          },
          (err) => {
            Swal.fire({
              icon: 'error',
              title: 'Ups...',
              text: 'No existe un producto con esa id.',
            });
            console.log(err as any);
          }
        );
      }
    });
  }
}
