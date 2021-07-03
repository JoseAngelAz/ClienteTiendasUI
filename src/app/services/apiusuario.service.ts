//agreagmos solicitud a nuestro servicio
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Response } from '../models/reponse';
import { Usuario } from '../models/usuario';

//config para encabezados y propiedades de http options
const httpOption = {
  headers: new HttpHeaders({
    "Content-Type": "application/json"
  })
}

@Injectable({
  providedIn: 'root'
})
export class ApiusuarioService {

  //url a donde me conectare al servicio
  url:string ='https://localhost:44300/api/usuarios';
  constructor(
    private _http:HttpClient
  ) { }

  //consultar Usuarios
  getUsuarios():Observable<Response>
  {
    return this._http.get<Response>(this.url);
  }

  //Ingresar Usuarios, pasar param usuario de la Interface usuario.ts
  AddUsuarios(usuario: Usuario):Observable<Response>{
    return this._http.post<Response>(this.url, usuario, httpOption);
  }
}

