import { Component, Input, OnInit } from '@angular/core';
import { LoginService } from 'src/app/_service/login.service';
import { environment } from 'src/environments/environment';
import { JwtHelperService } from "@auth0/angular-jwt";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private loginservice: LoginService) { }

  ngOnInit(): void {
    this.loginservice.login('admin', '123456').subscribe(data => {
      sessionStorage.setItem(environment.TOKEN, data.access_token);
      })
  }

}
