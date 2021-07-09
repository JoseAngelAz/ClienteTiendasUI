import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { TiendaComponent } from './tienda/tienda.component';
import { AuthGuard } from './security/auth.guard';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {path:'',redirectTo:'/login',pathMatch:'full'},
  {path:'home', component:HomeComponent,canActivate:[AuthGuard]},
  {path:'usuario', component:UsuarioComponent,canActivate:[AuthGuard]},
  {path:'tiendas', component:TiendaComponent,canActivate:[AuthGuard]},
  {path:'login', component:LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
