import { Component, OnInit } from '@angular/core';
import { BarraProgresoService } from 'src/app/_service/barra-progreso.service'
import { LoginService } from './_service/login.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  public flagProgressBar: boolean = true;
  public estaLogueado: boolean;
  constructor(private barraProgresoService: BarraProgresoService, 
    private login: LoginService) {

    }
  ngOnInit():void{

this.barraProgresoService.progressBarReactiva.subscribe(data => {
this.flagProgressBar = !this.flagProgressBar;
});
this.estaLogueado = this.login.estaLogueado();
  }
  cerrarsesion():void{
    this.login.cerrarSesion();
  }
}
