import { Component, OnInit } from '@angular/core';
import { ApiusuarioService } from '../services/apiusuario.service';
import { Response } from '../models/reponse';
//componente dialog creado por mi
import { DialogUsuarioComponent } from '../dialog/dialogusuario.component';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss']
})
export class UsuarioComponent implements OnInit {
  //variable para la lista que guarde el request
  public  lista: any []=[];
  //array para las columnas
  public columnas:string []=['id','nombre'];//esto le dira a material que debe mostrar
  constructor(
    //inyectamos el usuario
    private apiUsuario: ApiusuarioService,
    //dialog de angular material
    public dialog: MatDialog
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
  //metodo para el boton modal
  openAdd(){
    const dialogRef = this.dialog.open(DialogUsuarioComponent,{
      //config de estilo
      width:'2000'
    });
    //metodo para refrescar despues de insertar data 
    dialogRef.afterClosed().subscribe(result =>{
      //le mandamos un dato al dialog
      this.GetUsuarios();
    });
  }
}
