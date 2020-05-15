import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/models/producto';
import { ProductoService } from '../../services/producto.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.scss'],
  providers: [ProductoService],
})
export class ProductoComponent implements OnInit {
  public producto: Producto;

  constructor(
    private productoService: ProductoService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.obtenerProducto();
  }

  // OBTENER PRODUCTO
  obtenerProducto() {
    this.route.params.subscribe((params) => {
      const id = params['id'];
      this.productoService.getProducto(id).subscribe(
        (resp) => {
          this.producto = resp['producto'];
        },
        (err) => {
          console.log(err as any);
        }
      );
    });
  }
}
