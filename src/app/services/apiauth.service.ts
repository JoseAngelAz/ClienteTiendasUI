import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { Response } from "../models/reponse";
import { UserToken } from "../models/token";
import {map} from 'rxjs/operators';
// del min 1 al 15 del video
//config para encabezados y propiedades de http options
const httpOption = {
    headers: new HttpHeaders({
      "Content-Type": "application/json"
    })
  }

@Injectable({
    providedIn:'root'
})
export class ApiAuthService{    
    //https://localhost:44378/api/Usuario/login
    //url:string = 'https://localhost:44378/api/Auth/login';
    url:string = 'https://localhost:44378/api/Auth/login';

    //Recibe un elemento desde su cracion cn Behavior
    //representado con el UserToken interface
    private usuarioSubject: BehaviorSubject<UserToken>

    public get usuarioData(): UserToken{//esto era UserToken
    return this.usuarioSubject.value;
    }

    constructor(private _http:HttpClient){
      this.usuarioSubject = new BehaviorSubject<UserToken>(JSON.parse(localStorage.getItem('usuario')!));
    }

    //login 
    loginService(email:string, password:string): Observable<Response>{
        return this._http.post<Response>(this.url,{email,password},httpOption).pipe(
          map(res => {
            if(res.exito === 1){
              const usuario:UserToken = res.data;
              localStorage.setItem('usuario',JSON.stringify(usuario));
              this.usuarioSubject.next(usuario);
            }
            return res //antes era res
          })
        );
    }
    //logout
    logout(){
      localStorage.removeItem('usuario');
      this.usuarioSubject.next(null!);
    }
}