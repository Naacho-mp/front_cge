import { inject, Injectable } from '@angular/core';
import { RegistroLectura } from '../models/lectura.interface';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../environments/environment';
import {RegistroCliente} from '../models/registro-cliente.interface';

@Injectable({
  providedIn: 'root',
})
export class ApiServiceLectura {

  private http = inject(HttpClient);
  private readonly apiUrl = environment.apiUrl;

  //metodo para crear una lectura y hacer la peticion al endpoint
  crearLectura(data: Partial<RegistroLectura>): Observable<RegistroLectura> {
    return this.http.post<RegistroLectura>(`${this.apiUrl}/lecturas`, data);
  }

  //metodo para obtener las lecturas creadas y hacer la peticion
  obtenerLecturas(): Observable<any[]> {
    return this.http.get<RegistroLectura[]>(`${this.apiUrl}/lecturas`);
  }

  //metodo para listar las leturas y hacer la peticion
  listarLecturas(id_medidor?: string, anio?: number, mes?: number): Observable<RegistroLectura[]> {
    let params = new HttpParams();

    if (id_medidor) {
      params = params.set('id_medidor', id_medidor);
    }
    if (anio) {
      params = params.set('anio', anio.toString());
    }
    if (mes) {
      params = params.set('mes', mes.toString());
    }

    return this.http.get<RegistroLectura[]>(`${this.apiUrl}/lecturas`, { params });
  }
}
