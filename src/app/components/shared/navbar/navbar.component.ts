import { Component, OnInit, DoCheck } from '@angular/core';
import { UsuarioService } from '../../../services/usuario.service';
import { Router } from '@angular/router';
import { global } from '../../../services/global';
import 'bootstrap/dist/js/bootstrap.bundle';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  providers: [UsuarioService],
})
export class NavbarComponent implements OnInit, DoCheck {
  public identity;
  public token;
  public url;

  constructor(private router: Router, private usuarioService: UsuarioService) {
    this.loadUser();
    this.url = global.url;
  }

  ngOnInit(): void {}

  ngDoCheck() {
    this.loadUser();
  }

  loadUser() {
    this.identity = this.usuarioService.getIdentity();
    this.token = this.usuarioService.getToken();
  }
}
