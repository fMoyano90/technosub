import { Component, OnInit, ViewChild } from '@angular/core';
import { Noticia } from '../../models/noticia';
import { NoticiaService } from 'src/app/services/noticia.service';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { AngularFileUploaderComponent } from 'angular-file-uploader';
import { global } from '../../services/global';

@Component({
  selector: 'app-editar-noticia',
  templateUrl: './crear-noticia.component.html',
  styleUrls: ['./crear-noticia.component.scss'],
  providers: [NoticiaService, UsuarioService],
})
export class EditarNoticiaComponent implements OnInit {
  public noticia: Noticia;
  public tituloPrincipal: string;
  public subtitulo: string;
  public editar: boolean;
  public resetVar: any;

  public editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '280px',
    minHeight: '0',
    maxHeight: 'auto',
    width: 'auto',
    minWidth: '0',
    translate: 'yes',
    enableToolbar: true,
    showToolbar: true,
    placeholder: 'Enter text here...',
    defaultParagraphSeparator: '',
    defaultFontName: '',
    defaultFontSize: '',
    fonts: [
      { class: 'arial', name: 'Arial' },
      { class: 'times-new-roman', name: 'Times New Roman' },
      { class: 'calibri', name: 'Calibri' },
      { class: 'comic-sans-ms', name: 'Comic Sans MS' },
    ],
    customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText',
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],
    uploadUrl: 'v1/image',
    uploadWithCredentials: false,
    sanitize: true,
    toolbarPosition: 'top',
    toolbarHiddenButtons: [['bold', 'italic'], ['fontSize']],
  };

  public afuConfig = {
    multiple: true,
    formatsAllowed: '.jpg, .png, .gif, .jpeg',
    maxSize: '50',
    uploadAPI: {
      url: global.url + 'noticia/upload',
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
    private productoService: NoticiaService,
    private usuarioService: UsuarioService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.noticia = new Noticia(1, '', '', '', '', '', '', '');
  }

  ngOnInit(): void {
    this.tituloPrincipal = 'Editar Noticia';
    this.subtitulo = 'Edita una noticia existente.';
    this.editar = true;
    this.obtenerNoticia();
  }

  // OBTENER NOTICIA POR ID
  obtenerNoticia() {
    this.route.params.subscribe((params) => {
      const token = this.usuarioService.getToken();
      const id = params['id'];
      this.productoService.getNoticia(token, id).subscribe(
        (resp) => {
          this.noticia = resp['noticia'];
          console.log(resp);
        },
        (err) => {
          console.log(err as any);
        }
      );
    });
  }

  // EDITAR PRODUCTO (PROBAR ACTUALIZAR)
  crearNoticia(noticia) {
    const token = this.usuarioService.getToken();
    this.route.params.subscribe((params) => {
      const id = params['id'];
      this.productoService.update(token, id, this.noticia).subscribe(
        (resp) => {
          Swal.fire({
            icon: 'success',
            title: '¡Buen trabajo!',
            text: 'La noticia se actualizo exitosamente.',
          });
          noticia.reset();
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
    this.noticia.imagen = image_data.imagen;
  }
}
