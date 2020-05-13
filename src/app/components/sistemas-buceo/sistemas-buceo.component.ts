import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/models/producto';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-sistemas-buceo',
  templateUrl: './sistemas-buceo.component.html',
  styleUrls: ['./sistemas-buceo.component.scss'],
  providers: [ProductoService],
})
export class SistemasBuceoComponent implements OnInit {
  public productos: Producto[];
  public p = 1;

  constructor(private productoService: ProductoService) {}

  ngOnInit(): void {
    this.obtenerProductos();
  }

  obtenerProductos() {
    this.productoService.getProductosPorCategoria('BUCEO').subscribe(
      (resp) => {
        this.productos = resp['productos'];
      },
      (err) => {
        console.log(err as any);
      }
    );
  }
}
