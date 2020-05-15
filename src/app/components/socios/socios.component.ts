import { Component, OnInit } from '@angular/core';
import { Socio } from 'src/app/models/socio';
import { SocioService } from '../../services/socio.service';
import Swal from 'sweetalert2';
import { UsuarioService } from '../../services/usuario.service';
import { global } from '../../services/global';

@Component({
  selector: 'app-socios',
  templateUrl: './socios.component.html',
  styleUrls: ['./socios.component.scss'],
  providers: [SocioService, UsuarioService],
})
export class SociosComponent implements OnInit {
  public socios: Socio[];
  public identity: any;
  public url: string;
  public p = 1;

  constructor(
    private socioService: SocioService,
    private usuarioService: UsuarioService
  ) {
    this.url = global.url;
  }

  ngOnInit(): void {
    this.obtenerSocios();
    this.identity = this.usuarioService.getIdentity();
  }

  obtenerSocios() {
    this.socioService.getSocios().subscribe(
      (resp) => {
        this.socios = resp['socios'];
      },
      (err) => {
        console.log(err as any);
      }
    );
  }

  eliminarSocio(id) {
    Swal.fire({
      title: '¿Seguro quieres continuar?',
      text: 'El socio no podrá recuperarse',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminalo',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      const token = this.usuarioService.getToken();
      if (result.value) {
        this.socioService.delete(token, id).subscribe(
          (resp) => {
            if (resp['estado'] === 'success') {
              Swal.fire({
                icon: 'success',
                title: '¡Buen Trabajo!',
                text: 'El socio fue eliminado.',
              });
              this.obtenerSocios();
            } else {
              Swal.fire({
                icon: 'error',
                title: 'Ups...',
                text: 'No existe un socio con ese id.',
              });
            }
          },
          (err) => {
            Swal.fire({
              icon: 'error',
              title: 'Ups...',
              text: 'No existe un socio con esa id.',
            });
            console.log(err as any);
          }
        );
      }
    });
  }
}
