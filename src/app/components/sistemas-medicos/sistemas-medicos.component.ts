import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../../services/producto.service';
import { Producto } from 'src/app/models/producto';

@Component({
  selector: 'app-sistemas-medicos',
  templateUrl: './sistemas-medicos.component.html',
  styleUrls: ['./sistemas-medicos.component.scss'],
  providers: [ProductoService],
})
export class SistemasMedicosComponent implements OnInit {
  public productos: Producto[];
  public p = 1;

  constructor(private productoService: ProductoService) {}

  ngOnInit(): void {
    this.obtenerProductos();
  }

  obtenerProductos() {
    this.productoService.getProductosPorCategoria('MEDICO').subscribe(
      (resp) => {
        this.productos = resp['productos'];
      },
      (err) => {
        console.log(err as any);
      }
    );
  }
}
