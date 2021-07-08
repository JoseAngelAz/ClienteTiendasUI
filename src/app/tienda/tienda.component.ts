import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiTiendaService } from '../services/apitienda.service';
import { MatDialog } from '@angular/material/dialog';
import { TiendaModel } from '../models/tienda';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DialogTiendaComponent } from '../dialog/dialogtienda.component';
import { DialogDeleteComponent } from '../common/delete/dialogdelete.component';
//PENDIENTE!!!! DELETE COMPONENT

@Component({
  selector: 'app-tienda',
  templateUrl: './tienda.component.html',
  styleUrls: ['./tienda.component.scss']
})
export class TiendaComponent implements OnInit {

  //lista de tiendas
  public lista_tiendas:any []=[];
  //columnas de la tabla del componente
  public columnas:string []=['id','nombre','telefono','direccion','latitud','longitud','acciones'];
  //variable que servira de tributo de estilo para dialog
  readonly width:string = '400px';
  //mi mensaje generico
  public mi_mensaje!:string;
  //temporizador de snackBar
  public tiempo:number = 2000;

  //data para paginacion
  //mipaginacion = new MatTableDataSource<>;


  constructor(
//Inyectamos nuestro servicio API para tienda
    private apiTienda: ApiTiendaService,
//'' componente dialog    
    public dialog:MatDialog,
//'' componente snachBar para los mensajes    
    public snackBar:MatSnackBar,
    //public paginator:MatPaginator
  ) { }

  ngOnInit(): void {
    this.GetTiendasComponent();
  }

// CRUD
//Consultar Tiendas
  GetTiendasComponent(){
    this.apiTienda.getTiendasService().subscribe(response =>{
      this.lista_tiendas = response.data;
    });
  }

  //Abrir Dialog, Cerrar Dialog y Consultar Usuarios
  OpenAddInDialog(){
//crear y abrir dialog y parsarle el DialogTiendaCompoenent y el width
    const dialogRef = this.dialog.open(DialogTiendaComponent,{width:this.width});
//cerrar el dialog y actualizar la vista con getTiendas
    dialogRef.afterClosed().subscribe(result =>{
      this.GetTiendasComponent();
    });
  }
//Abrir Dialog, Editar Tiendas  Cerrar Dialog y Consultar Usuarios 
  OpenEditInDialog(tienda:TiendaModel){
//creamos dialog con el componente importado y le pasamos el width
    const dialogRef = this.dialog.open(DialogTiendaComponent,{
      width:this. width,
      //le mandamos la tienda a modificar
      data:tienda    
    });
//cerramos dialog y pedimos las tiendas
    dialogRef.afterClosed().subscribe(result =>{
      this.GetTiendasComponent();
    });    
  }
//Abrir Dialog, ELIMINAR Tiendas  Cerrar Dialog y Consultar Usuarios 
  OpenDeleteInDialog(tienda:TiendaModel){
//creamos y abrimos dialog de eliminar y le pasamos el width
  const dialogRef = this.dialog.open(DialogDeleteComponent,{width:this.width});
//mandar mensaje despues de eliminar y pedir las tiendas
    dialogRef.afterClosed().subscribe(result =>{
      //
      if(result){
        this.apiTienda.DeleteTiendaService(tienda.id).subscribe(response=>{
          //validar el mensaje de exito
        if(response.exito===1){
          this.snackBar.open(this.mi_mensaje=response.mensaje,'',{duration:this.tiempo});
          //pedimos las tiendas
          this.GetTiendasComponent();
        }
        });
      }
    });
  }

}
