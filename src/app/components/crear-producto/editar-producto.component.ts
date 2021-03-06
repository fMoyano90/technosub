import { Component, OnInit, ViewChild } from '@angular/core';
import { Producto } from '../../models/producto';
import { ProductoService } from 'src/app/services/producto.service';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import { AngularFileUploaderComponent } from 'angular-file-uploader';
import { global } from '../../services/global';

@Component({
  selector: 'app-editar-producto',
  templateUrl: './crear-producto.component.html',
  styleUrls: ['./crear-producto.component.scss'],
  providers: [ProductoService, UsuarioService],
})
export class EditarProductoComponent implements OnInit {
  public producto: Producto;
  public titulo: string;
  public subtitulo: string;
  public editar: boolean;
  public resetVar;

  public afuConfig = {
    multiple: true,
    formatsAllowed: '.jpg, .png, .gif, .jpeg',
    maxSize: '50',
    uploadAPI: {
      url: global.url + 'producto/upload',
      headers: {
        Authorization: this.usuarioService.getToken(),
      },
    },
    theme: 'attachPin',
    hideProgressBar: false,
    hideResetBtn: true,
    hideSelectBtn: false,
    replaceTexts: {
      selectFileBtn: 'SELECCIONAR IMAGEN',
      resetBtn: 'REINICIAR',
      uploadBtn: 'SUBIR IMAGEN',
      dragNDropBox: 'SUELTA LAS IMAGENES ACÁ',
      attachPinBtn: 'Escoge una imagen',
      afterUploadMsg_success: 'Imagen subida satisfactoriamente.',
      afterUploadMsg_error: 'Error al subir archivos!',
    },
  };

  @ViewChild('fileUpload1')
  private fileUpload1: AngularFileUploaderComponent;

  constructor(
    private productoService: ProductoService,
    private usuarioService: UsuarioService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.producto = new Producto(1, '', '', '', '', '', '');
  }

  ngOnInit(): void {
    this.titulo = 'Editar Producto';
    this.subtitulo = 'Edita un producto existente.';
    this.editar = true;
    this.obtenerProducto();
  }

  // OBTENER PRODUCTO POR ID
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

  // EDITAR PRODUCTO (PROBAR ACTUALIZAR)
  crearProducto(producto) {
    const token = this.usuarioService.getToken();
    this.route.params.subscribe((params) => {
      const id = params['id'];
      this.productoService.update(token, id, this.producto).subscribe(
        (resp) => {
          Swal.fire({
            icon: 'success',
            title: '¡Buen trabajo!',
            text: 'El producto se actualizo exitosamente.',
          });
          producto.reset();
          this.fileUpload1.resetFileUpload();
        },
        (err) => {
          Swal.fire({
            icon: 'error',
            title: 'Ups...',
            text: 'Ocurrio un error, intenta mas tarde.',
          });
        }
      );
    });
  }

  // Subir imagen
  imageUpload(data) {
    const image_data = JSON.parse(data.response);
    this.producto.imagen = image_data.imagen;
  }
}
