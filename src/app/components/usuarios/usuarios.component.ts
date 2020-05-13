import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';
import { UsuarioService } from '../../services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss'],
  providers: [UsuarioService],
})
export class UsuariosComponent implements OnInit {
  public usuarios: Usuario[];
  public usuario: Usuario;
  public p = 1;

  constructor(private usuarioService: UsuarioService) {
    this.usuario = new Usuario(1, '', '', '', '');
  }

  ngOnInit(): void {
    this.obtenerUsuarios();
  }

  obtenerUsuarios() {
    this.usuarioService.obtenerUsuarios().subscribe((resp) => {
      this.usuarios = resp['usuarios'];
    });
  }

  editarUsuario(id, usuario) {
    console.log(usuario);
    this.usuarioService.update(id, usuario).subscribe(
      (resp) => {
        console.log(resp);
        if (resp['estado'] === 'success') {
          // USUARIO ACTUALIZADO
          console.log(resp['usuario']);
          Swal.fire({
            icon: 'success',
            title: '¡Buen Trabajo!',
            text: 'El usuario fue actualizado.',
          });
        } else {
          // ERROR
          Swal.fire({
            icon: 'error',
            title: 'Ocurrio un error',
            text: 'El usuario no fue actualizado, intenta más tarde.',
          });
          console.log(resp['mensaje']);
        }
      },
      (err) => {
        // ERROR
        Swal.fire({
          icon: 'error',
          title: 'Ocurrio un error',
          text: 'El usuario no fue actualizado, intenta más tarde.',
        });
        console.log(err as any);
      }
    );
  }

  eliminarUsuario(id) {
    Swal.fire({
      title: '¿Seguro quieres continuar?',
      text: 'El usuario no podrá recuperarse',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminalo',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.value) {
        this.usuarioService.delete(id).subscribe(
          (resp) => {
            if (resp['estado'] === 'success') {
              Swal.fire({
                icon: 'success',
                title: '¡Buen Trabajo!',
                text: 'El usuario fue eliminado.',
              });
              this.obtenerUsuarios();
            } else {
              Swal.fire({
                icon: 'error',
                title: 'Ups...',
                text: 'No existe un usuario con esa id.',
              });
            }
          },
          (err) => {
            Swal.fire({
              icon: 'error',
              title: 'Ups...',
              text: 'No existe un usuario con esa id.',
            });
            console.log(err as any);
          }
        );
      }
    });
  }
}
