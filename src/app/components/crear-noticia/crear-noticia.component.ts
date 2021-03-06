import { Component, OnInit, ViewChild } from '@angular/core';
import { Noticia } from 'src/app/models/noticia';
import { NoticiaService } from '../../services/noticia.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { global } from '../../services/global';
import { AngularFileUploaderComponent } from 'angular-file-uploader';

@Component({
  selector: 'app-crear-noticia',
  templateUrl: './crear-noticia.component.html',
  styleUrls: ['./crear-noticia.component.scss'],
  providers: [NoticiaService, UsuarioService],
})
export class CrearNoticiaComponent implements OnInit {
  public noticia: Noticia;
  public tituloPrincipal: string;
  public subtitulo: string;
  public editar = false;
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
    private noticiaService: NoticiaService,
    private usuarioService: UsuarioService
  ) {
    this.noticia = new Noticia(1, '', '', '', '', '', '', '');
  }

  ngOnInit(): void {
    this.tituloPrincipal = 'Crear Noticia';
    this.subtitulo = 'Crea una nueva noticia.';
  }

  crearNoticia(noticia) {
    const token = this.usuarioService.getToken();
    console.log(this.noticia);
    this.noticiaService.create(token, this.noticia).subscribe(
      (resp) => {
        console.log(resp['estado']);
        // PRODUCTO CREADO EXITOSAMENTE
        Swal.fire({
          icon: 'success',
          title: '¡Buen trabajo!',
          text: 'La noticia se creo exitosamente.',
        });
        noticia.reset();
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
    this.noticia.imagen = image_data.imagen;
  }
}
