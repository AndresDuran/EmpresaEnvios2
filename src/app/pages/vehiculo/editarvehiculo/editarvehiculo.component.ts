import { Component, OnInit } from '@angular/core';
import { Vehiculo } from 'src/app/_model/vehiculo';
import { VehiculoService } from 'src/app/_service/vehiculo.service';
import { FormGroup, FormBuilder, FormControl, Validator, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { ErrorInterceptorService } from 'src/app/_share/error-interceptor.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NgProgress } from 'ngx-progressbar';
import { BarraProgresoService } from 'src/app/_service/barra-progreso.service';
import { ProgressBarService } from 'src/app/_service/progress-bar.service';


@Component({
  selector: 'app-editarvehiculo',
  templateUrl: './editarvehiculo.component.html',
  styleUrls: ['./editarvehiculo.component.css']
})


export class EditarvehiculoComponent implements OnInit {
  
  public error: string;
  public mensajecorrecto: any;
  public valorseleccionado: number;
  public valorseleccionado2: number;
  
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  form: FormGroup;
  vehiculo: Vehiculo = new Vehiculo();
  car: any;


  constructor(private vehiculoservice: VehiculoService,
              private formBuilder: FormBuilder, private _snackBar: MatSnackBar,
              public errorInterceptor: ErrorInterceptorService, private router: Router, 
              public progressBar: ProgressBarService,
              private progress: NgProgress, private barraProgresoService: BarraProgresoService,
              private route: ActivatedRoute) {
      this.buildForm();
    }


  ngOnInit(): void {
    this.progressBar.set();


    this.route.params.subscribe((params: Params) => {
      console.log(params);
      let idVehiculo = params.idVehiculo;
      this.loadVehiculo(idVehiculo);
      
    });
  }

  loadVehiculo(idVehiculo: number): void{
    this.vehiculoservice.id(idVehiculo).subscribe(data => {
      console.log(data);

      this.car = data;
this.establecerDatosFormulario(this.car);
      console.log(this.car.placa);
      this.progressBar.completeLoading();
    });
  }
establecerDatosFormulario(data: any){
  this.form.get('placa').setValue(data.placa);
  this.form.get('marca').setValue(data.marca);
  this.form.get('modelo').setValue(data.modelo);
  this.form.get('tipoVehiculo').setValue(data.tipoVehiuclo);
  this.form.get('capacidad').setValue(data.capacidad);
}
  editarVehiculo(event: Event): void{
    event.preventDefault();

    const car: Vehiculo = new Vehiculo();

    car.idVehiculo = this.car.idVehiculo;
    car.placa = this.form.value.placa;
    car.marca = this.form.value.marca;
    car.modelo = this.form.value.modelo;
    car.tipoVehiuclo = this.form.value.tipoVehiculo;
    car.capacidad = this.form.value.capacidad;

    if (this.form.valid)
    {
       this.progressBar.set();
      this.vehiculoservice.editar(car).subscribe(success => {
        console.log(success);
        this.mensajecorrecto = 'El vehiculo se ha editado correctamente.';
        this.openSnackBarSuccess();
        this.progressBar.completeLoading();
        this.router.navigate(['/vehiculo']);
        this.form.reset();
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
        idVehiculo: ['', []],
        placa: ['', [Validators.required, Validators.minLength(7), Validators.maxLength(7)]],
        marca: ['', [Validators.required]],
        modelo: ['', [Validators.required, Validators.min(1950), Validators.max(2022)]],
        tipoVehiculo: ['', [Validators.required]],
        capacidad: ['', [Validators.required]]
      });
  }

  openSnackBar() {
    this._snackBar.open(this.error, 'OK', {
      duration: 10000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition
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
    });}
}
