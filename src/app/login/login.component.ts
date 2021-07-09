import { Component, OnInit } from '@angular/core';
import { ApiAuthService } from '../services/apiauth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(public apiAuthService: ApiAuthService) { }

  //email y pass
  public email!:string;
  public password!:string;

  ngOnInit(): void {
  }

  //Login
  login(){
      this.apiAuthService.loginService(this.email,this.password).subscribe(respuesta =>{
        console.log(respuesta);
      });
  }
}
