import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiAuthService } from '../services/apiauth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    public apiAuthService: ApiAuthService,
    private router:Router
    ) {
        if(this.apiAuthService.usuarioData){
            this.router.navigate(['/']);
        }
    }

  //email y pass
  public email!:string;
  public password!:string;

  ngOnInit(): void {
  }

  //Login
  login(){
      this.apiAuthService.loginService(this.email,this.password).subscribe(respuesta =>{
        //console.log(respuesta);
        if(respuesta.exito === 1){
          this.router.navigate(['/']);
        }
      });
  }
}
