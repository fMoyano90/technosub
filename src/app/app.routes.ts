import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './components/inicio/inicio.component';
import { ContactoComponent } from './components/contacto/contacto.component';
import { LoginComponent } from './components/login/login.component';
import { ComponentesComponent } from './components/componentes/componentes.component';
import { CrearNoticiaComponent } from './components/crear-noticia/crear-noticia.component';
import { CrearProductoComponent } from './components/crear-producto/crear-producto.component';
import { CrearUsuarioComponent } from './components/crear-usuario/crear-usuario.component';
import { SistemasMedicosComponent } from './components/sistemas-medicos/sistemas-medicos.component';
import { SistemasBuceoComponent } from './components/sistemas-buceo/sistemas-buceo.component';
import { SociosComponent } from './components/socios/socios.component';
import { ProductoComponent } from './components/producto/producto.component';
import { NoticiasComponent } from './components/noticias/noticias.component';
import { NoticiaComponent } from './components/noticia/noticia.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { EditarProductoComponent } from './components/crear-producto/editar-producto.component';

const APP_ROUTES: Routes = [
  // PAGINAS PUBLICAS
  { path: 'inicio', component: InicioComponent },
  { path: 'componentes', component: ComponentesComponent },
  {
    path: 'sistemas-hiperbaricos-medicos',
    component: SistemasMedicosComponent,
  },
  { path: 'sistemas-hiperbaricos-buceo', component: SistemasBuceoComponent },
  { path: 'producto/:id', component: ProductoComponent },
  { path: 'noticias', component: NoticiasComponent },
  { path: 'noticia/:id', component: NoticiaComponent },
  { path: 'socios', component: SociosComponent },
  { path: 'contacto', component: ContactoComponent },

  // PAGINAS ADMINISTRATIVAS
  // USUARIOS
  { path: 'login', component: LoginComponent },
  { path: 'logout/:sure', component: LoginComponent },
  { path: 'usuarios', component: UsuariosComponent },
  { path: 'crear-usuario', component: CrearUsuarioComponent },
  // NOTICIAS
  { path: 'crear-noticia', component: CrearNoticiaComponent },
  { path: 'editar-noticia/:id', component: CrearNoticiaComponent },
  // PRODUCTOS
  { path: 'crear-producto', component: CrearProductoComponent },
  { path: 'editar-producto/:id', component: EditarProductoComponent },
  // GLOBAL
  { path: '**', pathMatch: 'full', redirectTo: '/inicio' },
];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES, {
  scrollPositionRestoration: 'enabled',
  useHash: true,
});
