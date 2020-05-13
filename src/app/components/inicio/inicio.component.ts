import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/models/producto';
import { ProductoService } from '../../services/producto.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss'],
  providers: [ProductoService],
})
export class InicioComponent implements OnInit {
  public productos: Producto[];
  public p = 1;

  constructor(private productoService: ProductoService) {}

  ngOnInit(): void {
    this.obtenerProductos();
  }

  obtenerProductos() {
    this.productoService.getProductos().subscribe(
      (resp) => {
        this.productos = resp['productos'];
      },
      (err) => console.log(err as any)
    );
  }
}
