import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';

// Configuración para Chile
import { registerLocaleData } from '@angular/common';
import localeEsCl from '@angular/common/locales/es-CL';
registerLocaleData(localeEsCl, 'es-Cl');

// RUTAS
import { APP_ROUTING } from './app.routes';

// COMPONETES
import { AppComponent } from './app.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { ContactoComponent } from './components/contacto/contacto.component';
import { LoginComponent } from './components/login/login.component';
import { ComponentesComponent } from './components/componentes/componentes.component';
import { SistemasMedicosComponent } from './components/sistemas-medicos/sistemas-medicos.component';
import { SistemasBuceoComponent } from './components/sistemas-buceo/sistemas-buceo.component';
import { NoticiasComponent } from './components/noticias/noticias.component';
import { SociosComponent } from './components/socios/socios.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { CrearNoticiaComponent } from './components/crear-noticia/crear-noticia.component';
import { CrearProductoComponent } from './components/crear-producto/crear-producto.component';
import { EditarProductoComponent } from './components/crear-producto/editar-producto.component';
import { CrearUsuarioComponent } from './components/crear-usuario/crear-usuario.component';
import { NoticiaComponent } from './components/noticia/noticia.component';
import { ProductoComponent } from './components/producto/producto.component';

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    NavbarComponent,
    FooterComponent,
    ContactoComponent,
    LoginComponent,
    ComponentesComponent,
    SistemasMedicosComponent,
    SistemasBuceoComponent,
    NoticiasComponent,
    SociosComponent,
    UsuariosComponent,
    CrearNoticiaComponent,
    CrearProductoComponent,
    EditarProductoComponent,
    CrearUsuarioComponent,
    NoticiaComponent,
    ProductoComponent,
  ],
  imports: [
    BrowserModule,
    APP_ROUTING,
    FormsModule,
    HttpClientModule,
    NgxPaginationModule,
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'es-Cl' }],
  bootstrap: [AppComponent],
})
export class AppModule {}
