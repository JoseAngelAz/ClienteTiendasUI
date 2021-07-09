import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ApiAuthService } from "../services/apiauth.service";

@Injectable()
export class JwtInterceptor implements HttpInterceptor{

    constructor(private apiAuthService:ApiAuthService){}

    intercept(request:HttpRequest<any>, next:HttpHandler):
    Observable<HttpEvent<any>> {
        const usuario = this.apiAuthService.usuarioData;
        //verificamos si existe el usuario, debe tener una sesion
        //y le mandamos el token
        if(usuario){
            request = request.clone({
                setHeaders:{
                    Authorization: `Bearer ${usuario.token}`
                }
            })
        }
        return next.handle(request);
    }
}