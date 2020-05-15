import { Component, OnInit } from '@angular/core';
import { Noticia } from 'src/app/models/noticia';
import { NoticiaService } from '../../services/noticia.service';
import { UsuarioService } from '../../services/usuario.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { global } from '../../services/global';

@Component({
  selector: 'app-categoria-noticias',
  templateUrl: './categoria-noticias.component.html',
  styleUrls: ['./categoria-noticias.component.scss'],
  providers: [UsuarioService, NoticiaService],
})
export class CategoriaNoticiasComponent implements OnInit {
  public noticias: Noticia[];
  public noticiasPrincipales: Noticia[];
  public categoria: string;
  public identity: any;
  public url: string;
  public p = 1;

  constructor(
    private noticiaService: NoticiaService,
    private usuarioService: UsuarioService,
    private activatedRoute: ActivatedRoute
  ) {
    this.url = global.url;
  }

  ngOnInit(): void {
    this.obtenerNoticiasPorCategoria();
    this.obtenerNoticiasPrincipales();
    this.identity = this.usuarioService.getIdentity();
  }

  // OBTENER NOTICIAS
  obtenerNoticiasPorCategoria() {
    this.activatedRoute.params.subscribe((resp) => {
      const params = resp['categoria'];
      this.categoria = params.toUpperCase();

      this.noticiaService.getNoticiasPorCategoria(this.categoria).subscribe(
        (resp) => {
          this.noticias = resp['noticias'];
          console.log(this.noticias);
        },
        (err) => {
          console.log(err as any);
        }
      );
    });
  }

  // OBTENER NOTICIAS PRINCIPALES
  obtenerNoticiasPrincipales() {
    this.noticiaService.getNoticiasPrincipales().subscribe(
      (resp) => {
        this.noticiasPrincipales = resp['noticias'];
        console.log(this.noticiasPrincipales);
      },
      (err) => {
        console.log(err as any);
      }
    );
  }

  eliminarNoticia(id) {
    Swal.fire({
      title: '¿Seguro quieres continuar?',
      text: 'La noticia no podrá recuperarse',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminalo',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      const token = this.usuarioService.getToken();
      if (result.value) {
        this.noticiaService.delete(token, id).subscribe(
          (resp) => {
            if (resp['estado'] === 'success') {
              Swal.fire({
                icon: 'success',
                title: '¡Buen Trabajo!',
                text: 'La noticia fue eliminada.',
              });
              this.obtenerNoticiasPorCategoria();
              this.obtenerNoticiasPrincipales();
            } else {
              Swal.fire({
                icon: 'error',
                title: 'Ups...',
                text: 'No existe una noticia con ese id.',
              });
            }
          },
          (err) => {
            Swal.fire({
              icon: 'error',
              title: 'Ups...',
              text: 'No existe una noticia con ese id.',
            });
            console.log(err as any);
          }
        );
      }
    });
  }
}
