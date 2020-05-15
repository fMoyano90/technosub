import { Component, OnInit } from '@angular/core';
import { Correo } from 'src/app/models/correo';
import { CorreoService } from '../../services/correo.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.scss'],
  providers: [CorreoService],
})
export class ContactoComponent implements OnInit {
  public correo: Correo;
  public cargando: boolean;

  constructor(private correoService: CorreoService) {
    this.correo = new Correo('', '', '', '', '');
    this.cargando = false;
  }

  ngOnInit(): void {}

  enviarCorreo(correo) {
    this.cargando = true;
    this.correoService.contactanos(this.correo).subscribe(
      (resp) => {
        // correo enviado exitosamente
        this.cargando = false;
        console.log(resp);
        Swal.fire({
          icon: 'success',
          title: '¡Hemos recibido tus solicitud!',
          text: 'Pronto nos pondremos en contacto.',
        });
        correo.reset();
      },
      (err) => {
        // devolver error
        this.cargando = false;
        Swal.fire({
          icon: 'error',
          title: 'Ups...',
          text: 'Ocurrio un problema, faltan datos o intenta más tarde.',
        });
        console.log(err as any);
      }
    );
  }
}
