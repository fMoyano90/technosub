import { Component, OnInit } from '@angular/core';
import { Noticia } from 'src/app/models/noticia';
import { UsuarioService } from '../../services/usuario.service';
import { NoticiaService } from 'src/app/services/noticia.service';
import { ActivatedRoute } from '@angular/router';
import { global } from '../../services/global';

@Component({
  selector: 'app-noticia',
  templateUrl: './noticia.component.html',
  styleUrls: ['./noticia.component.scss'],
  providers: [UsuarioService, NoticiaService],
})
export class NoticiaComponent implements OnInit {
  public noticia: Noticia;
  public noticiasPrincipales: Noticia[];
  public url: string;

  constructor(
    private usuarioService: UsuarioService,
    private noticiaService: NoticiaService,
    private activatedRoute: ActivatedRoute
  ) {
    this.url = global.url;
  }

  ngOnInit(): void {
    this.obtenerNoticia();
    this.obtenerNoticiasPrincipales();
  }

  // OBTENER NOTICIA
  obtenerNoticia() {
    this.activatedRoute.params.subscribe((resp) => {
      const token = this.usuarioService.getToken();
      const id = resp['id'];
      this.noticiaService.getNoticia(token, id).subscribe(
        (resp) => {
          this.noticia = resp['noticia'];
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
}
