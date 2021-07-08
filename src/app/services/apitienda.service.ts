import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Response } from '../models/reponse';
import { TiendaModel } from '../models/tienda';

//config para encabezados y propiedades de http options
const httpOption = {
  headers: new HttpHeaders({
    "Content-Type": "application/json"
  })
}
@Injectable({
  providedIn: 'root'
})
export class ApiTiendaService {

  //url de api net core
  url:string='https://localhost:44378/api/Stores';

  constructor(
    private _http:HttpClient
  ) { }

  //CRUD

  //Consultar Tienda
  getTiendasService():Observable<Response>
  {
    return this._http.get<Response>(this.url);
  }
  //Agregar Tienda
  AddTiendaService(tienda:TiendaModel):Observable<Response>
  {
    return this._http.post<Response>(this.url,tienda,httpOption);
  }
  //Editar Tienda (Modelo)
  EditTiendaService(tienda:TiendaModel):Observable<Response>
  {
    return this._http.put<Response>(this.url, tienda,httpOption);
  }
  //Eliminar Tienda (ID)
  DeleteTiendaService(id:number):Observable<Response>{
    return this._http.delete<Response>(`${this.url}/${id}`);
  }
}
