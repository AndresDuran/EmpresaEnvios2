import { Component, OnInit, ViewChild } from '@angular/core';
import { Info, VehiculoService } from '../../_service/vehiculo.service';
import { Vehiculo } from 'src/app/_model/vehiculo';
import { ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { tap, map } from 'rxjs/operators';
import { NgProgress } from 'ngx-progressbar';
import { ProgressBarService } from '../../_service/progress-bar.service';
import { BarraProgresoService } from 'src/app/_service/barra-progreso.service';


@Component({
  selector: 'app-vehiculo',
  templateUrl: './vehiculo.component.html',
  styleUrls: ['./vehiculo.component.css']
})
export class VehiculoComponent implements OnInit {
  pageEvent: PageEvent;
  displayedColumns: string[] = ['placa', 'modelo', 'marca', 'tipo', 'capacidad', 'editar'];
  columnsToDisplay: string[] = this.displayedColumns.slice();
  dataSource: Info = null;
  ListaVehiculos= new MatTableDataSource<Vehiculo>([]);
  
  @ViewChild('vehiclePaginator') Paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private vehiculoService: VehiculoService,
    private barraProgresoService: BarraProgresoService,
    public route: ActivatedRoute,
    private progress: NgProgress, public progressBar: ProgressBarService
    ) { }

   ngOnInit(): void {
     
this.progressBar.progressRef = this.progress.ref('progressBar');
    this.listar();
  }


      private listar(){
        this.progressBar.startLoading();
this.vehiculoService.listar(0, 20).pipe(
  tap(data=> console.log(data)),
  map((inform: Info)=>this.dataSource=inform)).subscribe(data=>{
  this.ListaVehiculos = new MatTableDataSource(data.content);
  this.ListaVehiculos.sort = this.sort;
  this.progressBar.completeLoading();
});
}
   public paginador(event: PageEvent): void{
    let page = event.pageIndex;
    let size = event.pageSize;
    //this.progressBar.startLoading();
    this.vehiculoService.paginador(page, size).pipe(
      map((inform: Info)=>this.dataSource=inform)).subscribe(data=>{
       
        console.log("Aqui");
        
        this.ListaVehiculos = new MatTableDataSource(data.content);
        this.ListaVehiculos.sort = this.sort;
        this.progressBar.completeLoading();
      });
  }
  public filtro = async (value: string) => {
    this.barraProgresoService.progressBarReactiva.next(false);
    await new Promise(f => setTimeout(f, 5000));
    this.ListaVehiculos.filter = value.trim().toLocaleLowerCase();
    this.barraProgresoService.progressBarReactiva.next(true);
  }}
