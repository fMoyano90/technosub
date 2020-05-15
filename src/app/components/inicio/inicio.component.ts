import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/models/producto';
import { Noticia } from 'src/app/models/noticia';
import { ProductoService } from '../../services/producto.service';
import { NoticiaService } from 'src/app/services/noticia.service';
import { global } from '../../services/global';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss'],
  providers: [ProductoService, NoticiaService],
})
export class InicioComponent implements OnInit {
  public productos: Producto[];
  public noticias: Noticia[];
  public url: string;
  public p = 1;

  constructor(
    private productoService: ProductoService,
    private noticiaService: NoticiaService
  ) {
    this.url = global.url;
  }

  ngOnInit(): void {
    this.obtenerProductos();
    this.obtenerNoticias();
  }

  obtenerProductos() {
    this.productoService.getProductos().subscribe(
      (resp) => {
        this.productos = resp['productos'];
      },
      (err) => console.log(err as any)
    );
  }

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
}
