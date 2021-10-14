import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BarraProgresoService {

  progressBarReactiva = new Subject<boolean>();
  
  constructor() { }
}
