import { Component, OnInit } from '@angular/core';
import { ApiusuarioService } from '../services/apiusuario.service';
import { Response } from '../models/reponse';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss']
})
export class UsuarioComponent implements OnInit {
  //variable para la lista que guarde el request
  public  lista: any []=[];

  constructor(
    //inyectamos el usuario
    private apiUsuario: ApiusuarioService
  ) { 
    
  }

  //aqui se deben llamar los metodos una vez inicialize
  //todo nuestro componente.
  ngOnInit(): void {
    this.GetUsuarios();
  }

  //metodo para conseguir usuarios
  GetUsuarios(){
    this.apiUsuario.getUsuarios().subscribe(response =>{
      this.lista = response.data;
    });
  }
}
