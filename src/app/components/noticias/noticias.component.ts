import { Component, OnInit } from '@angular/core';
import { Noticia } from 'src/app/models/noticia';
import { NoticiaService } from '../../services/noticia.service';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.component.html',
  styleUrls: ['./noticias.component.scss'],
  providers: [UsuarioService, NoticiaService],
})
export class NoticiasComponent implements OnInit {
  public noticias: Noticia[];
  public noticiasPrincipales: Noticia[];
  public p = 1;

  constructor(
    private noticiaService: NoticiaService,
    private usuarioService: UsuarioService
  ) {}

  ngOnInit(): void {
    this.obtenerNoticias();
    this.obtenerNoticiasPrincipales();
  }

  // OBTENER NOTICIAS
  obtenerNoticias() {
    this.noticiaService.getNoticias().subscribe(
      (resp) => {
        this.noticias = resp['noticias'];
        console.log(this.noticias);
      },
      (err) => {
        console.log(err as any);
      }
    );
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
