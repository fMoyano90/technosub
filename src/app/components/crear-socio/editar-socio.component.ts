import { Component, OnInit, ViewChild } from '@angular/core';
import { Socio } from '../../models/socio';
import { SocioService } from 'src/app/services/socio.service';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import { AngularFileUploaderComponent } from 'angular-file-uploader';
import { global } from '../../services/global';

@Component({
  selector: 'app-editar-socio',
  templateUrl: './crear-socio.component.html',
  styleUrls: ['./crear-socio.component.scss'],
  providers: [SocioService, UsuarioService],
})
export class EditarSocioComponent implements OnInit {
  public socio: Socio;
  public titulo: string;
  public subtitulo: string;
  public editar: boolean;
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
    private usuarioService: UsuarioService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.socio = new Socio(1, '', '', '', '');
  }

  ngOnInit(): void {
    this.titulo = 'Editar Socio';
    this.subtitulo = 'Edita un socio existente.';
    this.editar = true;
    this.obtenerSocio();
  }

  // OBTENER PRODUCTO POR ID
  obtenerSocio() {
    this.route.params.subscribe((params) => {
      const token = this.usuarioService.getToken();
      const id = params['id'];
      this.socioService.getSocio(token, id).subscribe(
        (resp) => {
          this.socio = resp['socio'];
        },
        (err) => {
          console.log(err as any);
        }
      );
    });
  }

  // EDITAR PRODUCTO (PROBAR ACTUALIZAR)
  crearSocio(socio) {
    const token = this.usuarioService.getToken();
    this.route.params.subscribe((params) => {
      const id = params['id'];
      this.socioService.update(token, id, this.socio).subscribe(
        (resp) => {
          Swal.fire({
            icon: 'success',
            title: '¡Buen trabajo!',
            text: 'El socio se actualizo exitosamente.',
          });
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
    this.socio.imagen = image_data.imagen;
  }
}
