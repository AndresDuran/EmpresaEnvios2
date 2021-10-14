import { Component, OnInit } from '@angular/core';
import { BarraProgresoService } from 'src/app/_service/barra-progreso.service'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  public flagProgressBar: boolean = true;

  constructor(private barraProgresoService: BarraProgresoService ){}

  ngOnInit():void{

this.barraProgresoService.progressBarReactiva.subscribe(data => {
this.flagProgressBar = !this.flagProgressBar;
});

  }
}
