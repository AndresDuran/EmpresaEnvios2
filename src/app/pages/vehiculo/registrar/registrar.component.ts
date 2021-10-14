import { Component, OnInit, ViewChild } from '@angular/core';
import { Vehiculo } from 'src/app/_model/vehiculo';
import { VehiculoService } from 'src/app/_service/vehiculo.service';
import { FormGroup, FormBuilder, FormControl, Validator, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ErrorInterceptorService } from 'src/app/_share/error-interceptor.service';
import { NgProgress } from 'ngx-progressbar';
import { ProgressBarService } from 'src/app/_service/progress-bar.service';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.css']
})
export class RegistrarComponent implements OnInit {

  public error: string;
  public mensajecorrecto: any;
  public valorseleccionado: string;
  public valorseleccionado2: string;

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  form: FormGroup;

  constructor(private vehiculoservice: VehiculoService,
              private formBuilder: FormBuilder, private _snackBar: MatSnackBar, private router: Router,
              private progress: NgProgress, public progressBar: ProgressBarService,
              public errorInterceptor: ErrorInterceptorService) {
    this.buildForm();
  }
  ngOnInit(): void {

this.progressBar.progressRef = this.progress.ref('progressBar');
this.progressBar.set();

this.progressBar.completeLoading();
  }
  guardarcarro(event: Event): void{
    

    event.preventDefault();

    const car: Vehiculo = new Vehiculo();

    car.placa = this.form.value.placa;
    car.marca = this.form.value.marca;
    car.modelo = this.form.value.modelo;
    car.tipoVehiuclo = this.valorseleccionado;
    car.capacidad = this.form.value.capacidad;

    if (this.form.valid)
    { this.progressBar.set();
     
      this.vehiculoservice.guardar(car).subscribe(success => {
        console.log(success);
      
        this.mensajecorrecto = 'El vehiculo ha sido registrado correctamente';
        this.form.reset();
        this.openSnackBarSuccess();
       
        this.progressBar.completeLoading();
        this.router.navigate(['/vehiculo']);
      }, err => {
        this.progressBar.set();
        console.log(err);
        this.error = 'Placa ya se encuentra registrada';
        this.openSnackBarError();
        this.progressBar.completeLoading();
      });
    }else{
  
      this.form.markAllAsTouched();
     
    }
    
  }

  private buildForm(): void{
    this.form = this.formBuilder.group(
      {
        placa: ['', [Validators.required, Validators.minLength(7), Validators.maxLength(7)]],
        marca: ['', [Validators.required]],
        modelo: ['', [Validators.required, Validators.min(1950), Validators.max(2022)]],
        tipoVehiculo: ['', [Validators.required]],
        capacidad: ['', [Validators.required]],
      });
  }
  openSnackBarSuccess(): void {
    this._snackBar.open(this.mensajecorrecto, 'OK',{
      duration: 10000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition
    });
  }
  openSnackBarError(): void {
    this._snackBar.open(this.error, 'OK',{
      duration: 10000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition
    });
  }
}
