import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TiendaModel } from '../models/tienda';
import { ApiTiendaService } from '../services/apitienda.service';
import { MatButtonToggle } from '@angular/material/button-toggle';


@Component({
    templateUrl: './dialogtienda.component.html'    
  })
  export class DialogTiendaComponent {
//atributos para los inputs de la vista
    public id!:number;
    public nombre!:string;
    public telefono!:string;
    public direccion!:string;
    public latitud!:string;
    public longitud!:string;

    //mi mensaje generico
  public mi_mensaje!:string;
  //temporizador de snackBar
  public tiempo:number = 2000;

//Inyectamos en el constructor los componentes a usar    
    constructor(
      public dialogRef:MatDialogRef<DialogTiendaComponent>,
      public apiTienda:ApiTiendaService,
      public snackBar: MatSnackBar,
      @Inject(MAT_DIALOG_DATA) public tienda:TiendaModel
    ) {
        if(this.tienda !== null){
          this.nombre = tienda.nombre;
          this.telefono = tienda.telefono;
          this.direccion = tienda.direccion;
          this.longitud = tienda.longitud;
          this.latitud = tienda.latitud;
        }
      }
  
    //cerrar el dialog
    closeDialog(){
      this.dialogRef.close();
    }

    //Editar Tienda
    EditTienda(){

      const tienda : TiendaModel = {
        id: this.tienda.id,
        nombre :this.nombre,
        telefono :this.telefono,
        direccion: this.direccion,
        longitud: this.longitud,
        latitud :this.latitud,
      };

      this.apiTienda.EditTiendaService(tienda).subscribe(response=>{
        try{
          if(response.exito ===1){
            this.dialogRef.close();
            //mensaje al cliente
            this.snackBar.open(this.mi_mensaje=response.mensaje,'',{duration:this.tiempo});
          }
        }catch(Exception){throw Exception}
      });

    }

    //Guardar Tienda
    AddTienda(){

      const tienda : TiendaModel = {
        id: this.id,
        nombre :this.nombre,
        telefono :this.telefono,
        direccion: this.direccion,
        longitud: this.longitud,
        latitud :this.latitud,
      };
      this.apiTienda.AddTiendaService(tienda).subscribe(response=>{
        try{
          if(response.exito ===1){
            this.dialogRef.close();
            //mensaje al cliente
            this.snackBar.open(this.mi_mensaje=response.mensaje,'',{duration:this.tiempo});
          }
        }catch(Exception){throw Exception}
      });
    }
  }
  