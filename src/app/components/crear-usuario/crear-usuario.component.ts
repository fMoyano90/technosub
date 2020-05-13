import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.component.html',
  styleUrls: ['./crear-usuario.component.scss'],
  providers: [UsuarioService],
})
export class CrearUsuarioComponent implements OnInit {
  public usuario: Usuario;
  public password2: string;

  constructor(private usuarioService: UsuarioService) {
    this.usuario = new Usuario(1, '', '', '', '');
  }

  ngOnInit(): void {}

  crearUsuario(form) {
    if (form.value.password === form.value.passConfirm) {
      this.usuarioService.register(this.usuario).subscribe(
        (response) => {
          if (response.estado === 'success') {
            // USUARIO CREADO EXITOSAMENTE
            Swal.fire({
              icon: 'success',
              title: '¡Buen trabajo!',
              text: 'El usuario se creo exitosamente.',
            });

            form.reset();
          } else {
            // ERROR AL CREAR USUARIO
            Swal.fire({
              icon: 'error',
              title: 'Ocurrío un error',
              text: 'Error al crear usuario, intenta más tarde.',
            });
          }
        },
        (error) => {
          // ERROR AL CREAR USUARIO
          console.log(error as any);
          Swal.fire({
            icon: 'error',
            title: 'Ocurrío un error',
            text: 'El usuario ya existe en nuestros registros.',
          });
        }
      );
    } else {
      // LAS CONTRASEÑAS NO COINCIDEN
      Swal.fire({
        icon: 'error',
        title: 'Ups...',
        text: 'Las contraseñas no coinciden.',
      });
    }
  }
}
