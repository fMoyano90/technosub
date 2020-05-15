import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { ProductoService } from '../../services/producto.service';
import { Producto } from 'src/app/models/producto';
import Swal from 'sweetalert2';
import { global } from '../../services/global';
@Component({
  selector: 'app-componentes',
  templateUrl: './componentes.component.html',
  styleUrls: ['./componentes.component.scss'],
  providers: [ProductoService, UsuarioService],
})
export class ComponentesComponent implements OnInit {
  public componentes: Producto[];
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
    this.obtenerComponentes();
    this.identity = this.usuarioService.getIdentity();
  }

  obtenerComponentes() {
    this.productoService.getProductosPorCategoria('COMPONENTE').subscribe(
      (resp) => {
        this.componentes = resp['productos'];
      },
      (err) => {
        console.log(err as any);
      }
    );
  }

  eliminarComponente(id) {
    Swal.fire({
      title: '¿Seguro quieres continuar?',
      text: 'El componente no podrá recuperarse',
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
                text: 'El componente fue eliminado.',
              });
              this.obtenerComponentes();
            } else {
              Swal.fire({
                icon: 'error',
                title: 'Ups...',
                text: 'No existe un componente con esa id.',
              });
            }
          },
          (err) => {
            Swal.fire({
              icon: 'error',
              title: 'Ups...',
              text: 'No existe un componente con esa id.',
            });
            console.log(err as any);
          }
        );
      }
    });
  }
}
