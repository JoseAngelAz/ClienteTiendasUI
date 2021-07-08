import { Component, OnInit } from '@angular/core';
import { ApiusuarioService } from '../services/apiusuario.service';
import { Response } from '../models/reponse';
//componente dialog creado por mi
import { DialogUsuarioComponent } from '../dialog/dialogusuario.component';
import { MatDialog } from '@angular/material/dialog';
import { Usuario } from '../models/usuario';
import { DialogDeleteComponent } from '../common/delete/dialogdelete.component';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss']
})
export class UsuarioComponent implements OnInit {
  //variable para la lista que guarde el request
  public  lista: any []=[];
  //array para las columnas
  //esto le dira a material que debe mostrar
  public columnas:string []=['id','nombre','apellido','tipoUsuario','email','acciones'];

  //atributo para el ancho del modal
  readonly width:string = '300px';
  constructor(
    //inyectamos el usuario
    private apiUsuario: ApiusuarioService,
    //dialog de angular material
    public dialog: MatDialog,
    //snackbar para mandar mensajes tipo toast
    public snackBar:MatSnackBar
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
      width:this.width
    });
    //metodo para refrescar despues de insertar data 
    dialogRef.afterClosed().subscribe(result =>{
      //le mandamos un dato al dialog
      this.GetUsuarios();
    });
  }
  //Editar Usuario
  openEdit(usuario: Usuario){
    //ejecutamos el dialog
    const dialogRef = this.dialog.open(DialogUsuarioComponent,{
      //config de estilo
      width:this.width,
      //le mandamos al usuario
      data: usuario
    });
    //metodo para refrescar despues de insertar data 
    dialogRef.afterClosed().subscribe(result =>{
      //le mandamos un dato al dialog
      this.GetUsuarios();
    });
  }
  //borrar usuario
  delete(usuario:Usuario){
    //ejecutamos el dialog
    const dialogRef = this.dialog.open(DialogDeleteComponent,{
      //config de estilo
      width:this.width
      //usuario lo vamos a necesitar en el delte de nuestra api      
    });
    //metodo para refrescar despues de insertar data 
    dialogRef.afterClosed().subscribe(result =>{
      //eliminar cancelar
      if(result){
        this.apiUsuario.DeleteUsuarioService(usuario.id).subscribe(response =>{
          if(response.exito === 1){
            //usamos snackbar del constructor
            this.snackBar.open('Usuario Eliminado Exitosamente','',{
              duration:2000
            });
            //actualizamos la vista jalando los usuarios
            this.GetUsuarios();
          }
        });
      }
    });
  }

}
