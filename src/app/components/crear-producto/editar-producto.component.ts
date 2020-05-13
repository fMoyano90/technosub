import { Component, OnInit } from '@angular/core';
import { Producto } from '../../models/producto';
import { ProductoService } from 'src/app/services/producto.service';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-editar-producto',
  templateUrl: './crear-producto.component.html',
  styleUrls: ['./crear-producto.component.scss'],
  providers: [ProductoService, UsuarioService],
})
export class EditarProductoComponent implements OnInit {
  public producto: Producto;
  public titulo: string;
  public subtitulo: string;
  public editar: boolean;

  constructor(
    private productoService: ProductoService,
    private usuarioService: UsuarioService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.producto = new Producto(1, '', '', '', '', '', '');
  }

  ngOnInit(): void {
    this.titulo = 'Editar Producto';
    this.subtitulo = 'Edita un producto existente.';
    this.editar = true;
    this.obtenerProducto();
  }

  // OBTENER PRODUCTO POR ID
  obtenerProducto() {
    this.route.params.subscribe((params) => {
      const token = this.usuarioService.getToken();
      const id = params['id'];
      this.productoService.getProducto(token, id).subscribe(
        (resp) => {
          this.producto = resp['producto'];
        },
        (err) => {
          console.log(err as any);
        }
      );
    });
  }

  // EDITAR PRODUCTO (PROBAR ACTUALIZAR)
  crearProducto(producto) {
    const token = this.usuarioService.getToken();
    this.route.params.subscribe((params) => {
      const id = params['id'];
      this.productoService.update(token, id, this.producto).subscribe(
        (resp) => {
          Swal.fire({
            icon: 'success',
            title: '¡Buen trabajo!',
            text: 'El producto se actualizo exitosamente.',
          });
        },
        (err) => {
          Swal.fire({
            icon: 'error',
            title: 'Ups...',
            text: 'Ocurrio un error, intenta mas tarde.',
          });
        }
      );
    });
  }
}
