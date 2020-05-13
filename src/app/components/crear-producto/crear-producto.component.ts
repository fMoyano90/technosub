import { Component, OnInit } from '@angular/core';
import { Producto } from '../../models/producto';
import { ProductoService } from 'src/app/services/producto.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-producto',
  templateUrl: './crear-producto.component.html',
  styleUrls: ['./crear-producto.component.scss'],
  providers: [ProductoService, UsuarioService],
})
export class CrearProductoComponent implements OnInit {
  public producto: Producto;
  public titulo: string;
  public subtitulo: string;
  public editar = false;

  constructor(
    private productoService: ProductoService,
    private usuarioService: UsuarioService
  ) {
    this.producto = new Producto(1, '', '', '', '', '', '');
  }

  ngOnInit(): void {
    this.titulo = 'Nuevo Producto';
    this.subtitulo = 'Crea un nuevo producto';
  }

  crearProducto(producto) {
    const token = this.usuarioService.getToken();
    console.log(this.producto);
    this.productoService.create(token, this.producto).subscribe(
      (resp) => {
        console.log(resp['estado']);
        // PRODUCTO CREADO EXITOSAMENTE
        Swal.fire({
          icon: 'success',
          title: '¡Buen trabajo!',
          text: 'El usuario se creo exitosamente.',
        });
        producto.reset();
      },
      (error) => {
        // ERROR
        Swal.fire({
          icon: 'error',
          title: 'Ups...',
          text: 'Ocurrio un problema, intenta más tarde.',
        });
        console.log(error as any);
      }
    );
  }
}
