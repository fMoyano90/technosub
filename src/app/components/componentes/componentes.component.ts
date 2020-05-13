import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { ProductoService } from '../../services/producto.service';
import { Producto } from 'src/app/models/producto';

@Component({
  selector: 'app-componentes',
  templateUrl: './componentes.component.html',
  styleUrls: ['./componentes.component.scss'],
  providers: [ProductoService],
})
export class ComponentesComponent implements OnInit {
  public componentes: Producto[];
  constructor(private productoService: ProductoService) {}

  ngOnInit(): void {
    this.obtenerComponentes();
  }

  obtenerComponentes() {
    this.productoService.getProductosPorCategoria('COMPONENTE').subscribe(
      (resp) => {
        this.componentes = resp['productos'];
      },
      (err) => {
        console.log(err as any);
      }
    );
  }
}
