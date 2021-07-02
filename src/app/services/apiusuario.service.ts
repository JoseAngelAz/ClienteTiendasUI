//agreagmos solicitud a nuestro servicio
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Response } from '../models/reponse';
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

}

