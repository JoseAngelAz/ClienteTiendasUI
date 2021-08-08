import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { catchError } from "rxjs/operators";
import { ApiAuthService } from "../services/apiauth.service";

@Injectable({
    providedIn:'root'
})
export class JwtInterceptor implements HttpInterceptor{

    constructor(private apiAuthService:ApiAuthService){}

    intercept(request:HttpRequest<any>, next:HttpHandler):
    Observable<HttpEvent<any>> {
        const usuario = this.apiAuthService.usuarioData;
        //verificamos si existe el usuario, debe tener una sesion
        //y le mandamos el token
        try{
            if(usuario){//era usuario
                //mapear token del user
                var tokensio = usuario.token;
                
                request = request.clone({
    
                    headers:request.headers.set("Authorization", "Bearer " + tokensio)
                   /*  setHeaders:{    //se esta saltando setear el header
                        Authorization: `Bearer ${usuario.token}`
                    } */
                })
            }
        } catch(error){console.log(error)}
        return next.handle(request);
    }
}