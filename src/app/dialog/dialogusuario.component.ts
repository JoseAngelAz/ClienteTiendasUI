import { Component, Inject } from "@angular/core";
import { MatDialogRef,MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Usuario } from "../models/usuario";
import { ApiusuarioService } from "../services/apiusuario.service";
import {MatButtonToggle} from '@angular/material/button-toggle'

@Component({
    templateUrl:'dialogusuario.component.html'
})
export class DialogUsuarioComponent{
        
    //atributos para los inputs de la vista

    public id!: number;
    public nombre!: string;
    public password!: string;
    public rol!: number;
    public email!: string;

    
    

    constructor(
        public dialogRef:MatDialogRef<DialogUsuarioComponent>,
        public apiUsuario: ApiusuarioService,
        public snackBar: MatSnackBar,
        @Inject(MAT_DIALOG_DATA) public usuario:Usuario
    ){
        if(this.usuario !== null){
            this.nombre = usuario.nombre;
            this.password = usuario.password;
            this.email = usuario.email;
            this.rol = usuario.rol;
        }
    }

    //cerrar el dialog, sera llamado en btn usuario
    closeDialog(){
        this.dialogRef.close();
    }

    //Editar Usuario
    editUsuario(){

        const usuario: Usuario = {
            id:this.usuario.id,
            nombre: this.nombre,
            password:this.password,
            rol:this.rol,
            email:this.email
        };
        this.apiUsuario.EditUsuarioService(usuario).subscribe(response => {
            try{
                if(response.exito === 1){
                    this.dialogRef.close();
                    //mandar mensaje al user
                    this.snackBar.open("Cliente Editado Exitosamente",'',{duration:2000});
                }
            }catch(Exception ){throw Exception}
            });
    }

    //agregar usuario, sera llamado en el boton de dialog
    addUsuario(){
        const usuario: Usuario = {
            id:this.id,
            nombre: this.nombre,
            password:this.password,
            rol:this.rol,
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