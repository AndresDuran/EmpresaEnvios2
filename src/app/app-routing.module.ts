import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BuscarComponent } from './pages/buscar/buscar.component';
import { EditarComponent } from './pages/editar/editar.component';

import { DepartamentoComponent } from './pages/departamento/departamento.component';
import { CiudadComponent } from './pages/departamento/ciudad/ciudad.component';

import { LoginComponent } from './pages/login/login.component';
import { EditarvehiculoComponent } from './pages/vehiculo/editarvehiculo/editarvehiculo.component'
import { RegistrarComponent } from './pages/vehiculo/registrar/registrar.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { Error500Component } from './pages/error500/error500.component';
import { VehiculoComponent } from './pages/vehiculo/vehiculo.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { NotAllowedComponent } from './pages/not-allowed/not-allowed.component';


const routes: Routes = [
  {path: 'buscar', component: BuscarComponent},
  {path: '', component: LoginComponent},
  {path: 'ingresar', component: RegistroComponent},
  {path: 'editar', component: EditarComponent},
  {path: 'login', component: LoginComponent},
  {path: 'nopermiso', component: NotAllowedComponent},
  {path: 'departamento', component: DepartamentoComponent, children :[
       {path:  'ciudad/:idDep', component: CiudadComponent}
    ]
  },
  {path: 'vehiculo', component: VehiculoComponent, children :[
    {path: 'registrar', component: RegistrarComponent},
    {path: 'editarvehiculo/:idVehiculo', component: EditarvehiculoComponent}
    ]
  },
  {path: '**', component: NotFoundComponent},
  {path: 'error500', component: Error500Component},
  {path: 'buscar', component: BuscarComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
