import { Component, OnInit, ViewChild } from '@angular/core';
import { Producto } from '../../models/producto';
import { ProductoService } from 'src/app/services/producto.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';
import { global } from '../../services/global';
import { AngularFileUploaderComponent } from 'angular-file-uploader';

@Component({
  selector: 'app-crear-producto',
  templateUrl: './crear-producto.component.html',
  styleUrls: ['./crear-producto.component.scss'],
  providers: [ProductoService, UsuarioService],
})
export class CrearProductoComponent implements OnInit {
  public producto: Producto;
  public titulo: string;
  public subtitulo: string;
  public editar = false;
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
    private usuarioService: UsuarioService
  ) {
    this.producto = new Producto(1, '', '', '', '', '', '');
  }

  ngOnInit(): void {
    this.titulo = 'Nuevo Producto';
    this.subtitulo = 'Crea un nuevo producto';
  }

  crearProducto(producto) {
    const token = this.usuarioService.getToken();
    console.log(this.producto);
    this.productoService.create(token, this.producto).subscribe(
      (resp) => {
        console.log(resp['estado']);
        // PRODUCTO CREADO EXITOSAMENTE
        Swal.fire({
          icon: 'success',
          title: '¡Buen trabajo!',
          text: 'El usuario se creo exitosamente.',
        });
        producto.reset();
        this.fileUpload1.resetFileUpload();
      },
      (error) => {
        // ERROR
        Swal.fire({
          icon: 'error',
          title: 'Ups...',
          text: 'Ocurrio un problema, intenta más tarde.',
        });
        console.log(error as any);
      }
    );
  }

  // Subir imagen
  imageUpload(data) {
    const image_data = JSON.parse(data.response);
    this.producto.imagen = image_data.imagen;
  }
}
