import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Vehiculo } from '../_model/Vehiculo';
import { Paginas } from '../_model/pages';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

export interface Info{
  content: Vehiculo[];
  pageable: {
    sort:{
      sorted: boolean;
      unsorted: boolean;
      empty: boolean;
    };
    pageNumber: number;
    pageSize: number;
    offset: number;
    unpaged: number;
    paged: number;
  };
  totalPages: number;
  totalElements: number;
  last: boolean;
  sort:{
    sorted: boolean;
      unsorted: boolean;
      empty: boolean;
  };
  first: boolean;
  numberOfElements: number;
  size: number;
  number: number;
  empty: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class VehiculoService {

  private url = `${environment.HOST}/vehiculos`;
  
  constructor(private http: HttpClient) { }

  public guardar(vehiculo: Vehiculo){
      return this.http.post(`${this.url}/guardar`, vehiculo);
  }
  public listar(page: number, size: number){
   return this.http.get(`${this.url}/pageable/?page=` + page + `&size?` + size);
  }
  public editar(vehiculo: Vehiculo){
    return this.http.put(`${this.url}/editar`, vehiculo);
  }
  public paginador (page: number, size: number): Observable<Info>{
    let params = new HttpParams();
    params=params.append('page', String(page));
    params=params.append('size', String(size));

    return this.http.get(`${this.url}/pageable/?`,{params}).pipe(
      map((inform: Info)=>inform),
      catchError(err => throwError(err))
    );
  }
  public id (id: number){
    return this.http.get(`${this.url}/listar/` + id);
  }
}
