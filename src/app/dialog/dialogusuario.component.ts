import { Component } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Usuario } from "../models/usuario";
import { ApiusuarioService } from "../services/apiusuario.service";

@Component({
    templateUrl:'dialogusuario.component.html'
})
export class DialogUsuarioComponent{
        
    //atributos para los inputs de la vista
    public nombre!: string;
    public apellido!: string;
    public tipoUsuario!: number;
    public email!: string;

    constructor(
        public dialogRef:MatDialogRef<DialogUsuarioComponent>,
        public apiUsuario: ApiusuarioService,
        public snackBar: MatSnackBar
    ){}

    //cerrar el dialog, sera llamado en btn usuario
    closeDialog(){
        this.dialogRef.close();
    }
    //agregar usuario, sera llamado en el boton de dialog
    addUsuario(){
        const usuario: Usuario = {
            nombre: this.nombre,
            apellido:this.apellido,
            tipoUsuario:this.tipoUsuario,
            email:this.email
        };
        this.apiUsuario.AddUsuarios(usuario).subscribe(response => {
        try{
            if(response.exito === 1){
                this.dialogRef.close();
                //mandar mensaje al user
                this.snackBar.open("Cliente Insertado Exitosamente",'',{duration:2000});
            }
        }catch(Exception ){throw Exception}
        });
    }
}