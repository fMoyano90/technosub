import { Component, OnInit, ViewChild } from '@angular/core';
import { Socio } from '../../models/socio';
import { SocioService } from 'src/app/services/socio.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';
import { global } from '../../services/global';
import { AngularFileUploaderComponent } from 'angular-file-uploader';

@Component({
  selector: 'app-crear-socio',
  templateUrl: './crear-socio.component.html',
  styleUrls: ['./crear-socio.component.scss'],
  providers: [SocioService, UsuarioService],
})
export class CrearSocioComponent implements OnInit {
  public socio: Socio;
  public titulo: string;
  public subtitulo: string;
  public editar = false;
  public resetVar;

  public afuConfig = {
    multiple: true,
    formatsAllowed: '.jpg, .png, .gif, .jpeg',
    maxSize: '50',
    uploadAPI: {
      url: global.url + 'socio/upload',
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
    private socioService: SocioService,
    private usuarioService: UsuarioService
  ) {
    this.socio = new Socio(1, '', '', '', '');
  }

  ngOnInit(): void {
    this.titulo = 'Nuevo Socio';
    this.subtitulo = 'Crea un nuevo socio';
  }

  // Crear socio
  crearSocio(socio) {
    const token = this.usuarioService.getToken();
    console.log(this.socio);
    this.socioService.create(token, this.socio).subscribe(
      (resp) => {
        console.log(resp['estado']);
        // PRODUCTO CREADO EXITOSAMENTE
        Swal.fire({
          icon: 'success',
          title: '¡Buen trabajo!',
          text: 'El socio se creo exitosamente.',
        });
        socio.reset();
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
    this.socio.imagen = image_data.imagen;
  }
}
