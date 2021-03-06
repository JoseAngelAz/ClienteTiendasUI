import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { UsuarioComponent } from './usuario/usuario.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {MatTableModule} from '@angular/material/table';
import {MatDialogModule} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import { DialogUsuarioComponent } from './dialog/dialogusuario.component';
import { FormsModule } from '@angular/forms';
import { DialogDeleteComponent } from './common/delete/dialogdelete.component';
import { TiendaComponent } from './tienda/tienda.component';
import {MatButtonToggleModule} from '@angular/material/button-toggle'
import { DialogTiendaComponent } from './dialog/dialogtienda.component';
import {MatIconModule} from '@angular/material/icon';
import { LoginComponent } from './login/login.component';
import {MatCardModule} from '@angular/material/card';
import { JwtInterceptor } from './security/jwt.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UsuarioComponent,
    DialogUsuarioComponent,
    DialogDeleteComponent,
    TiendaComponent,
    DialogTiendaComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    HttpClientModule,
    MatTableModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatSnackBarModule,
    FormsModule,
    MatButtonToggleModule,
    MatIconModule,
    MatCardModule
    
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi:true}
  ],
  bootstrap: [AppComponent],
  entryComponents:[
    DialogUsuarioComponent
  ]
})
export class AppModule { }
