import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Usuario } from '../../models/usuario';
import { UsuarioService } from '../../services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [UsuarioService],
})
export class LoginComponent implements OnInit {
  public usuario: Usuario;
  public token: string;
  public identity: Usuario;

  constructor(
    private usuarioService: UsuarioService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.usuario = new Usuario(1, '', '', '', '');
  }

  ngOnInit(): void {
    this.logout();
  }

  // LOGIN DE USUARIO
  onSubmit(form) {
    this.usuarioService.signup(this.usuario).subscribe((response) => {
      if (response.estado !== 'error') {
        this.token = response;
        // USUARIO IDENTIFICADO
        this.usuarioService.signup(this.usuario, true).subscribe(
          (resp) => {
            // RELLENAR LA IDENTIDAD DEL USUARIO
            this.identity = resp;

            // PERSISTIR DATOS USUARIO IDENTIFICADO
            console.log(this.token);
            console.log(this.identity);
            localStorage.setItem('token', this.token);
            localStorage.setItem('identity', JSON.stringify(this.identity));

            // MENSAJE DE EXITO
            Swal.fire({
              icon: 'success',
              title: 'Bienvenido',
              text: '¡Haz ingresado exitosamente!',
            });

            // REDIRECCIÓN A INICIO
            this.router.navigate(['inicio']);
          },
          (error) => {
            // Retornar error
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: error as any,
            });
          }
        );
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Usuario o contraseña incorrecto.',
        });
      }
    });
  }

  // LOGOUT DE USUARIO
  logout() {
    this.route.params.subscribe((params) => {
      // COMPROBAR SI SURE VIENE CON PARAMETROS Y SUMARLO A LOGOUT
      const logout = +params['sure'];
      // SI LOGOUT VALE 1 REMOVER ITEMS DE LOCAL STORAGE Y LIMPIAR SESIÓN
      if (logout == 1) {
        localStorage.removeItem('identity');
        localStorage.removeItem('token');

        this.identity = null;
        this.token = null;

        // REDIGIR A INICIO
        this.router.navigate(['inicio']);
      }
    });
  }
}
