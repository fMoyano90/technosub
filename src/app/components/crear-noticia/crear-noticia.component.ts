import { Component, OnInit } from '@angular/core';
import { Noticia } from 'src/app/models/noticia';
import { NoticiaService } from '../../services/noticia.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-noticia',
  templateUrl: './crear-noticia.component.html',
  styleUrls: ['./crear-noticia.component.scss'],
})
export class CrearNoticiaComponent implements OnInit {
  public noticia: Noticia;
  public editar = false;

  constructor(
    private noticiaService: NoticiaService,
    private usuarioService: UsuarioService
  ) {
    this.noticia = new Noticia(1, '', '', '', '', '', '');
  }

  ngOnInit(): void {}

  crearNoticia(noticia) {
    const token = this.usuarioService.getToken();
    console.log(this.noticia);
    this.noticiaService.create(token, this.noticia).subscribe(
      (resp) => {
        console.log(resp['estado']);
        // PRODUCTO CREADO EXITOSAMENTE
        Swal.fire({
          icon: 'success',
          title: '¡Buen trabajo!',
          text: 'El usuario se creo exitosamente.',
        });
        noticia.reset();
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
